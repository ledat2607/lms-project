import { NextResponse } from "next/server";
import { updateAdminProfile } from "../../../../../data/admin/update-info";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const user = await updateAdminProfile(data);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
