import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Your LMS <onboarding@resend.dev>",
      to: "datle.dev@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 👇 quan trọng: trả về status 200
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Send mail error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
