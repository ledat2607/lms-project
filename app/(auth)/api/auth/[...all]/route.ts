import arcject from "@/lib/arcject";
import { auth } from "@/lib/auth";
import {
  ArcjetDecision,
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import ip from "@arcjet/ip"; 

const emailOpstions = {
  mode: "LIVE",
  block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const botOPtions = {
  mode: "LIVE",
  allow: [],
} satisfies BotOptions;

const rateLimitOptions = {
  mode: "LIVE",
  interval: "2m",
  max: 5,
} satisfies SlidingWindowRateLimitOptions<[]>;

const signUpOPtions = {
  email: emailOpstions,
  bots: botOPtions,
  rateLimit: rateLimitOptions,
};

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  let userId: string;
  if (session?.user.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "120.0.0.1";
  }
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-up")) {
    const body = await req.clone().json();

    if (typeof body.email === "string") {
      return arcject
        .withRule(protectSignup(signUpOPtions))
        .protect(req, { email: body.email, fingerprint: userId });
    } else {
      return arcject
        .withRule(detectBot(botOPtions))
        .withRule(slidingWindow(rateLimitOptions))
        .protect(req, { fingerprint: userId });
    }
  } else {
    return arcject
      .withRule(detectBot(botOPtions))
      .protect(req, { fingerprint: userId });
  }
}

const authHandler = toNextJsHandler(auth.handler);

export const { GET } = authHandler;

export const POST = async (req: NextRequest) => {
  const decision = await protect(req);

  console.log(`Arject Decision`);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 });
    } else if (decision.reason.isEmail()) {
      let message: string;
      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Invalid email address";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "We do not allow disposable email addresses";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email address does not have valid MX records";
      } else {
        message = "Email address is blocked";
      }
      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, { status: 403 });
    }
  }
  return authHandler.POST(req);
};

