import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "aviv1049@gmail.com",
    subject: "Reset your password",
    html: `<p>לחץ <a href="${resetLink}">כאן</a> לאיפוס סיסמא.<p>`,
  });
};
