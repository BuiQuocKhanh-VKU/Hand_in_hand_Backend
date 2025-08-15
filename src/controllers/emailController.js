import emailService from "../services/emailService";

let handleSendOTP = async (req, res) => {
    try {
        let { data } = req.body;
        if (!data) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!",
            });
        }
        await emailService.sendOTP(data);
        return res.status(200).json({
            errCode: 0,
            message: "OTP sent successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: "Error from server",
            console: error
        });
    }
};


module.exports = {
    handleSendOTP,
};
