import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //@r configure mailer for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 360000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 360000,
        },
      });
    }

    // ----------------ERROR--------------------
    //======ENV VARIABLE NOT LOAD PROPERLY======
    // ----------------ERROR--------------------

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: process.env.NODEMAILER_USER,
    //     pass: process.env.NODEMAILER_PASS,
    //   },
    // });

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c1dc8b4a6097c2",
        pass: "6ff1c45242480a",
      },
    });

    const mailOptions = {
      from: "veerljain1234@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset Your Password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
        </p>`,
      // @r RESET EMAIL Assignment
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
