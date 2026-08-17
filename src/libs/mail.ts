import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(
  email: string,
  token: string
) {
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not configured");
  }

  const resetUrl =
    `${baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;

  await resend.emails.send({
    from: "Color Atlas <onboarding@resend.dev>",
    to: email,
    subject: "パスワード再設定",
    html: `
      <h2>パスワード再設定</h2>

      <p>
        以下のボタンから30分以内にパスワードを変更してください。
      </p>

      <p>
        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#c65300;
            color:white;
            text-decoration:none;
            border-radius:3px;
          "
        >
          パスワードを再設定
        </a>
      </p>

      <p>ボタンが押せない場合はこちら</p>

      <p>
        <a href="${resetUrl}">
          ${resetUrl}
        </a>
      </p>
    `,
  });
}