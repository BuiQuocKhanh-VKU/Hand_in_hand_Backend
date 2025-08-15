import campaignDonationService from "../services/campaignDonationService";

let handleGetAllCampaignDonations = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            campaignDonations: [],
         });
      }
      let campaignDonations = await campaignDonationService.getAllCampaignDonations(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         campaignDonations,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};
let handleGetCampaignDonationsByUser = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            campaignDonations: [],
         });
      }
      let campaignDonations = await campaignDonationService.getCampaignDonationsByUser(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         campaignDonations,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};
let handleCreateCampaignDonation = async (req, res) => {
   try {
      let message = await campaignDonationService.createCampaignDonation(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
      });
   }
};

let handleUpdateCampaignDonation = async (req, res) => {
   try {
      let message = await campaignDonationService.updateCampaignDonation(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeleteCampaignDonation = async (req, res) => {
   try {
      let id = req.body.id;
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
         });
      }
      let message = await campaignDonationService.deleteCampaignDonation(id);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
      });
   }
};

module.exports = {
   handleGetAllCampaignDonations,
   handleCreateCampaignDonation,
   handleUpdateCampaignDonation,
   handleDeleteCampaignDonation,
   handleGetCampaignDonationsByUser,
};
