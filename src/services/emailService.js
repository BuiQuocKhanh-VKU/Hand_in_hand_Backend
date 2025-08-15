const nodemailer = require("nodemailer");

// Cấu hình kết nối tới SMTP server
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // false vì Gmail không hỗ trợ port 465 với các yêu cầu bảo mật cao
   auth: {
      user: "khanhbq.23itb@vku.udn.vn",
      pass: "Kh1b2q3k.", // Mật khẩu ứng dụng (hoặc mật khẩu của tài khoản Gmail)
   },
});

// Hàm gửi email cảm ơn
function sendThankYouEmail(dataEmail) {
   return new Promise((resolve, reject) => {
      transporter.sendMail(
         {
            from: '"Tổ chức Hand in Hand 🐾"<khanhbq.23itb@vku.udn.vn>', // Người gửi
            to: dataEmail.email, // Địa chỉ email người nhận
            subject: "Cảm ơn vì sự đóng góp của bạn 🐾", // Tiêu đề email
            html: `
            <h1>Xin chào ${dataEmail.name},</h1>
            <h2>Cảm ơn bạn đã ủng hộ tổ chức chúng tôi</h2>
            <h3>Số tiền đóng góp: ${dataEmail.total_amount} VND</h3>
            <p>Chúng tôi rất biết ơn sự đóng góp của bạn. Những đóng góp của bạn sẽ giúp bảo vệ môi trường và cộng đồng.</p>
            <p>Trân trọng,</p>
            <p>Tổ chức Hand in Hand 🐾</p>
            `, // Nội dung email bằng HTML
         },
         (err, info) => {
            if (err) {
               console.error("Gửi email thất bại:", err.message);
               reject(err); // Trả về lỗi nếu gửi thất bại
            } else {
               resolve(info); // Trả về thông tin nếu gửi thành công
            }
         }
      );
   });
}

module.exports = {
   sendThankYouEmail: sendThankYouEmail, // Xuất hàm gửi email
};
