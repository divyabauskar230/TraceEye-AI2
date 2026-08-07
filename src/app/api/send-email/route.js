import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { to, title, message, buttonText, buttonUrl } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 🌟 एकच प्रोफेशनल आणि भारी HTML टेम्पलेट
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #030508; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 500px; margin: auto; background-color: #0b0e17; border: 1px solid #1e293b; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <h2 style="color: #a3e635; margin-bottom: 15px; font-size: 22px;">${title}</h2>
          
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            ${message}
          </p>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${buttonUrl}" style="background-color: #a3e635; color: #000000; padding: 12px 28px; border-radius: 12px; font-weight: bold; text-decoration: none; font-size: 14px; display: inline-block;">${buttonText}</a>
          </div>
          
          <p style="color: #64748b; font-size: 11px; margin-top: 35px; text-align: center; border-top: 1px solid #1e293b; pt: 20px;">
            &copy; 2026 Footpryx. All rights reserved.
          </p>
          
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Footpryx Support" <${process.env.SMTP_EMAIL}>`,
      to,
      subject: title,
      html: htmlTemplate,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}