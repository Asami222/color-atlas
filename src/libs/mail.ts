// src/libs/mail.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(
  email: string,
  token: string
) {
  const resetUrl =
    `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Color Atlas <onboarding@resend.dev>",
    //to: email,
    to: 'asa2_pokecho@icloud.com',
    subject: "パスワード再設定",
    html: `
      <h2>パスワード再設定</h2>

      <p>以下のボタンから30分以内にパスワードを変更してください。</p>

      <p>
        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#3b82f6;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          パスワードを再設定
        </a>
      </p>

      <p>ボタンが押せない場合はこちら</p>

      <p>${resetUrl}</p>
    `,
  });
}