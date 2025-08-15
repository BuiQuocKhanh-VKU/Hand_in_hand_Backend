import cartService from "../services/cartService";

let handleGetAllCarts = async (req, res) => {
   try {
      let id = req.query.id; // Lấy id từ query params
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            carts: [],
         });
      }
      let carts = await cartService.getAllCarts(id);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         carts,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};
let handleGetCartByUser = async (req, res) => {
   try {
      let id = req.query.id;
      let status = req.query.status;
      if (!id && !status) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
            carts: [],
         });
      }
      let carts = await cartService.getAllCartsByUser(id, status);
      return res.status(200).json({
         errCode: 0,
         message: "OK",
         carts,
      });
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleCreateCart = async (req, res) => {
   try {
      let message = await cartService.createCart(req.body);
      return res.status(200).json(message);
   } catch (error) {
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleUpdateCart = async (req, res) => {
   try {
      let message = await cartService.updateCart(req.body);
      return res.status(200).json(message);
   } catch (error) {
      console.error("Error updating cart:", error);
      return res.status(500).json({
         errCode: 1,
         message: "Error from server",
         console: error,
      });
   }
};

let handleDeleteCart = async (req, res) => {
   try {
      let id = req.body.id;
      if (!id) {
         return res.status(400).json({
            errCode: 1,
            message: "Missing required parameter!",
         });
      }
      let message = await cartService.deleteCart(id);
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
   handleGetAllCarts,
   handleCreateCart,
   handleUpdateCart,
   handleDeleteCart,
   handleGetCartByUser,
};
