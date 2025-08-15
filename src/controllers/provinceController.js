import provinceService from "../services/provinceService";

let handleGetAllProvinces = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            Provinces: [],
         });
      }
      let Provinces = await provinceService.getAllProvinces(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         Provinces,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleGetProvinceOverview = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            province: {},
         });
      }
      let province = await provinceService.getProvinceOverview(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         province,
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
   handleGetAllProvinces,
   handleGetProvinceOverview,
};
