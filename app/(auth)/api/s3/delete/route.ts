import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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

export async function DELETE(request: Request) {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    try {
       const decision = await aj.protect(request, {
         fingerprint: session?.user.id as string,
       });
         if(decision.isDenied()){
           return NextResponse.json(
             { error: "dude not good" },
             { status: 429 }
           );
         }
      const body = await request.json();
      const key = body.key;
      if (!key) {
        return NextResponse.json(
          { error: "Missing or invalid key" },
          { status: 500 }
        );
      }
      const command = new DeleteObjectCommand({
        Bucket: env.NEXT_PUBLIC_S3_BUCKER_NAME_IMAGES,
        Key: key,
      });
      await S3.send(command);
      return NextResponse.json(
        { message: "File Deleted...." },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { error: "Internal server errror...." },
        { status: 500 }
      );
    }
}
