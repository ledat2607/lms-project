import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { env } from "process";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fileUploadShema = z.object({
  fileName: z.string().min(1, { message: "Flename is required" }),
  contentType: z.string().min(1, { message: "Content is required" }),
  size: z.number().min(1),
  image: z.boolean(),
});

const aj = arcject
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json({ error: "dude not good" }, { status: 429 });
    }

    const body = await request.json();

    const validation = fileUploadShema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const { fileName, contentType, size } = validation.data;
    const unique = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKER_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: unique,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });

    const response = {
      presignedUrl,
      key: unique,
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to generarte" }, { status: 500 });
  }
}
