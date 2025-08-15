import donationService from "../services/donationService";

let handleGetAllDonations = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            Donations: [],
         });
      }
      let donations = await donationService.getAllDonations(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         donations,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleCreateDonation = async (req, res) => {
   try {
      let message = await donationService.createDonation(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleUpdateDonation = async (req, res) => {
   try {
      let message = await donationService.updateDonation(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeleteDonation = async (req, res) => {
   try {
      let id = req.body.id;
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
         });
      }
      let message = await donationService.deleteDonation(id);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleGetDonationByUser = async (req, res) => {
   try {
      let id = req.query.id; // Lấy userId từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            donations: [],
         });
      }
      let donations = await donationService.getAllDonationsByUser(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         donations,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

module.exports = {
   handleGetAllDonations,
   handleCreateDonation,
   handleUpdateDonation,
   handleDeleteDonation,
   handleGetDonationByUser,
};
