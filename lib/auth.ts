import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { admin, emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { faker } from "@faker-js/faker";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET || "",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          let user = await prisma.user.findUnique({ where: { email } });
          console.log(user);

          if (!user) {
            // Nếu là đăng nhập mà chưa có user thì tạo mới
            user = await prisma.user.create({
              data: {
                email: email,
                name: `user-${faker.string.alphanumeric(6)}`,
                image: faker.image.avatar(),
                emailVerified: true, // hoặc false tùy theo flow của cậu
              },
            });
          }

          // Gửi OTP qua email
          await resend.emails.send({
            from: "LMS'Support <onboarding@resend.dev>",
            to: [email],
            subject: "LMS Store - Email Verification",
            html: `<p>Your verification code is <strong>${otp}</strong>.</p>`,
          });
        } catch (err) {
          console.error("Error sending OTP or creating user:", err);
        }
      },
    }),

    admin(),
  ],
});
