import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            products: [],
         });
      }
      let products = await productService.getAllProducts(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         products,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleCreateProduct = async (req, res) => {
   try {
      let message = await productService.createProduct(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleUpdateProduct = async (req, res) => {
   try {
      let message = await productService.updateProduct(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeleteProduct = async (req, res) => {
   if (!req.body.id) {
      return res.status(200).json({
         errCode: 1,
         message: "Missing required parameter!",
      });
   }
   let message = await productService.deleteProduct(req.body.id);
   return res.status(200).json(message);
};

module.exports = {
   handleGetAllProducts,
   handleUpdateProduct,
   handleCreateProduct,
   handleDeleteProduct,
};
