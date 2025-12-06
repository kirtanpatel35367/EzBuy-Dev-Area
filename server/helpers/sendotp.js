const nodemailer = require("nodemailer");

async function sendOTPEmail(email, otp) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // your gmail
        pass: process.env.ADMIN_EMAIL_PASSWORD, // your app password
      },
    });

    await transporter.sendMail({
      from: `"EzBuy Support" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      text: `
        Thanks for registering on EzBuy.
        Your OTP is ${otp}. It is valid for 5 minutes.
      `,
    });

    console.log("OTP email sent to:", email);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err; // so frontend sees the error
  }
}

module.exports = sendOTPEmail;
