import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"LMS Support Team" <${process.env.SMTP_MAIL}>`, // Ẩn email cá nhân
      to: email, // gửi đến email khách hàng nhập
      subject: `Cảm ơn bạn đã liên hệ với LMS`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="background-color: #0ea5e9; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1>LMS Support Team</h1>
          </div>
          <div style="padding: 20px;">
            <p>Xin chào <strong>${name}</strong>,</p>
            <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã nhận được tin nhắn của bạn:</p>
            <blockquote style="background: #f1f1f1; padding: 10px; border-left: 4px solid #0ea5e9;">
              ${message}
            </blockquote>
            <p>Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.</p>
            <p>Trân trọng,<br/>LMS Support Team</p>
          </div>
          <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px;">
            © 2025 LMS. All rights reserved.
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
