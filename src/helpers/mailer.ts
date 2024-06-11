import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //*r configure mailer for usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "REPLACE EMAIL",
        pass: "REPLACE PASSWORD",
      },
    });

    const mailOptions = {
      from: "veerljain1234@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset Your Password", // Subject line
      html: "<b>Hello world?</b>", // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
