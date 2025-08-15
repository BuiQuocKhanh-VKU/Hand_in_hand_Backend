const nodemailer = require("nodemailer");
import db from "../models/index.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nghianb.23itb@vku.udn.vn",
        pass: "kjjqfqmvcxbsxezb",
    },
});

function sendThankYouEmail(dataEmail){
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: '"GreenPaws Organization 🐾"<nghianb.23itb@vku.udn.vn>',
            to: dataEmail.email,
            subject: "Thank you for your donation",
            html: `
            <h1>Dear ${dataEmail.name},</h1>
            <h2>Thank you for your donation</h2>
            <h1>Total Amount: ${dataEmail.total_amount}</h1>
            <p>Thanks</p>
            `,
        }, (err, info) => {
            if (err) {
                console.error("Failed to send email:", err.message);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

function sendOTP(dataEmail) {
    return new Promise((resolve, reject) => {
        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        transporter.sendMail({
            from: '"GreenPaws Organization 🐾"<nghianb.23itb@vku.udn.vn>',
            to: dataEmail.email,
            subject: "OTP change your email",
            html: `
            <h1>Dear ${dataEmail.name},</h1>
            <h2>${otp}</h2>
            <p>Thanks</p>
            `,
        }, (err, info) => {
            if (err) {
                
                reject(err); // Nếu xảy ra lỗi, trả về reject
            } else {
                resolve(otp); // Nếu thành công, trả về resolve với OTP
            }
        });
    });
}

let updateOTP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!",
                });
                return;
            }
            let dataEmail = {
                email: user.email,
                name: user.name,
            };
            let otp = await sendOTP(dataEmail); // Gửi OTP và nhận giá trị trả về
            await user.update({
                OTP: otp, // Cập nhật OTP vào database
            });
            resolve({
                errCode: 0,
                errMessage: "Update OTP successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    sendOTP: sendOTP,
    updateOTP: updateOTP,
    sendThankYouEmail: sendThankYouEmail,
};