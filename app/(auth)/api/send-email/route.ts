import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Gửi email cảm ơn cho khách hàng
    await resend.emails.send({
      from: "LMS Support <support@lmsdomain.com>", // phải đúng domain đã verify
      to: [email],
      subject: "📩 Cảm ơn bạn đã liên hệ với LMS",
      react: EmailTemplate({
        title: "Cảm ơn bạn đã liên hệ!",
        content: `Xin chào ${name}, chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.`,
      }),
    });

    // 2️⃣ Gửi thông báo cho admin
    await resend.emails.send({
      from: "LMS Support <support@lmsdomain.com>",
      to: ["admin@lmsdomain.com"], // email admin bạn muốn nhận báo cáo
      subject: "📌 Có khách hàng mới liên hệ",
      react: EmailTemplate({
        title: "Khách hàng mới gửi tin nhắn",
        content: `Tên: ${name} <br/> Email: ${email} <br/> Tin nhắn: ${message}`,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
