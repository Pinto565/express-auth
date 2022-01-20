import nodemailer from 'nodemailer';
import config from '../config';

const sendMail = (receiver: string, token: string): void => {
    let link = `${config.baseUrl}/auth/verify/${token}`;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "infantvalan02@gmail.com",
            pass: config.mailPassword,
        },
    });

    var mailOptions = {
        from: "Opencloud",
        to: receiver,
        subject: "Sending Email using Node.js",
        html: `<h1>Hello User</h1></br><p>We have verified account registration for your email, Click the Link to<a href = '${link}'>Activate Now</ a ></p>`
    };

    transporter.sendMail(mailOptions);
}

export default sendMail;