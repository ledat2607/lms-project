import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 1️⃣ Email cảm ơn KH
    await transporter.sendMail({
      from: `"LMS Support" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "📩 Cảm ơn bạn đã liên hệ với LMS",
      html: EmailTemplate({
        title: "Cảm ơn bạn đã liên hệ!",
        content: `Xin chào <b>${name}</b>, chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất.`,
      }),
    });

    // 2️⃣ Email thông báo Admin
    await transporter.sendMail({
      from: `"LMS Support" <${process.env.SMTP_MAIL}>`,
      to: "tando2432003@gmail.com",
      subject: "📌 Có khách hàng mới liên hệ",
      html: EmailTemplate({
        title: "Khách hàng mới gửi tin nhắn",
        content: `
          <b>Tên:</b> ${name} <br/>
          <b>Email:</b> ${email} <br/>
          <b>Tin nhắn:</b> ${message}
        `,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
