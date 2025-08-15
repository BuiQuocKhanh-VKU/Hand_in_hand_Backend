import partnerService from "../services/partnerService";

let handleGetAllPartners = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            partners: [],
         });
      }
      let partners = await partnerService.getAllPartners(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         partners,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleCreatePartner = async (req, res) => {
   try {
      let message = await partnerService.createPartner(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleUpdatePartner = async (req, res) => {
   try {
      let message = await partnerService.updatePartner(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeletePartner = async (req, res) => {
   try {
      let id = req.body.id;
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
         });
      }
      let message = await partnerService.deletePartner(id);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

module.exports = {
   handleGetAllPartners,
   handleCreatePartner,
   handleUpdatePartner,
   handleDeletePartner,
};
