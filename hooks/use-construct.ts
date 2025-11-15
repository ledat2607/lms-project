import { env } from "@/lib/env";

export function ConstrucUrl(key: string): string {
  return `https://${env.NEXT_PUBLIC_S3_BUCKER_NAME_IMAGES}.t3.storage.dev/${key}`;
}
