const sgMail = require('@sendgrid/mail');

const EmailSendgrid = async ( email, subject, text, html ) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    config = {
        to: email,
        from: process.env.EMAIL_SENDGRID,
        subject: subject,
        text: text,
        html: html,
    }

    return await sgMail.send(config);
}
module.exports = {
    EmailSendgrid
};
