const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "genshinpromise@gmail.com",
        pass: "dvvigwjodyetiijm",
    },
});

async function sendPasswordReset(email, token) {
    const resetLink = `$http://techstore-react.gamer.gd/set-new-password?token=${token}`;
    const html = `templates/reset_password_email.html`;
    await transporter.sendMail({
        from: "TechStore",
        to: email,
        subject: "Reset Password",
        html,
    });
}

async function sendEmailVerification(email, token) {
    const verifyLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;
    const html = `templates/email_verify.html`;
    await transporter.sendMail({
        from: "TechStore",
        to: email,
        subject: "Account Creation",
        html,
    });
}

async function sendApplicantStatus(email, approved = true) {
    const html = approved
        ? `<YOUR_ACCOUNT_VERIFIED_HTML_TEMPLATE_HERE>`
        : `<YOUR_ACCOUNT_TERMINATED_HTML_TEMPLATE_HERE>`;
    const subject = approved ? "Application Approved" : "Application Rejection";
    await transporter.sendMail({
        from: "TechStore",
        to: email,
        subject,
        html,
    });
}

module.exports = { sendPasswordReset, sendEmailVerification, sendApplicantStatus };
