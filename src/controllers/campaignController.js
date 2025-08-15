import campaignService from "../services/campaignService";

let handleGetAllCampaigns = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            campaigns: [],
         });
      }
      let campaigns = await campaignService.getAllCampaigns(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         campaigns,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleCreateCampaign = async (req, res) => {
   try {
      let message = await campaignService.createCampaign(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
      });
   }
};

let handleUpdateCampaign = async (req, res) => {
   try {
      let message = await campaignService.updateCampaign(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeleteCampaign = async (req, res) => {
   try {
      let id = req.body.id;
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
         });
      }
      let message = await campaignService.deleteCampaign(id);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
      });
   }
};

let handleGetCampaignsByProvince = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            campaigns: [],
         });
      }
      let campaigns = await campaignService.getCampaignByProvinceId(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         campaigns,
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
   handleGetAllCampaigns,
   handleCreateCampaign,
   handleUpdateCampaign,
   handleDeleteCampaign,
   handleGetCampaignsByProvince,
};
