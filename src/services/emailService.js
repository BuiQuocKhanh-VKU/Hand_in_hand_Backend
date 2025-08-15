const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   auth: {
      user: "khanhbq.23itb@vku.udn.vn",
      pass: "Kh1b2q3k.",
   },
});

function sendThankYouEmail(dataEmail) {
   return new Promise((resolve, reject) => {
      transporter.sendMail(
         {
            from: '"Tổ chức Hand in Hand 🐾"<khanhbq.23itb@vku.udn.vn>',
            to: dataEmail.email,
            subject: "Cam ơn vì sự đóng gió của bạn🐾",
            html: `
            <h1>Xin chào ${dataEmail.name},</h1>
            <h2>Thank you for your donation</h2>
            <h1>Total Amount: ${dataEmail.total_amount}</h1>
            <p>Thanks</p>
            `,
         },
         (err, info) => {
            if (err) {
               console.error("Failed to send email:", err.message);
               reject(err);
            } else {
               resolve(info);
            }
         }
      );
   });
}


module.exports = {
   sendThankYouEmail: sendThankYouEmail,
};
