import db from "../models/index.js";

let getAllCarts = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let carts = "";
         if (id === "ALL") {
            carts = await db.CartItem.findAll({
               include: [
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["name"],
                  },
                  {
                     model: db.Product,
                     as: "product",
                     attributes: ["name", "image"],
                  },
               ],
            });
         } else if (id) {
            carts = await db.CartItem.findOne({
               where: { id },
               include: [
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["name"],
                  },
                  {
                     model: db.Product,
                     as: "product",
                     attributes: ["name"],
                  },
               ],
            });
         }
         resolve(carts);
      } catch (error) {
         reject(error);
      }
   });
};

let getAllCartsByUser = (userId, status) => {
   return new Promise(async (resolve, reject) => {
      try {
         let carts = await db.CartItem.findAll({
            where: { user_id: userId, status: status },
            attributes: ["id", "quantity", "product_id", "user_id", "total"],
            include: [
               {
                  model: db.Product,
                  as: "product",
                  attributes: ["name", "image"],
               },
            ],
         });
         resolve(carts);
      } catch (error) {
         reject(error);
      }
   });
};

let createCart = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         // Lấy thông tin giá sản phẩm từ bảng Product
         let product = await db.Product.findOne({
            where: { id: data.product_id },
         });

         if (!product) {
            return resolve({
               errCode: 1,
               errMessage: "Product not found!",
            });
         }

         // Tính toán tổng tiền
         let total = product.price * data.quantity;

         await db.CartItem.create({
            user_id: data.user_id,
            product_id: data.product_id,
            quantity: data.quantity,
            total: total,
         });
         resolve({
            errCode: 0,
            errMessage: "Create a new cart successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let deleteCart = (cartId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let cart = await db.CartItem.findOne({
            where: { id: cartId },
         });
         if (!cart) {
            resolve({
               errCode: 1,
               errMessage: "The cart isn't exist!",
            });
         }
         await db.CartItem.destroy({
            where: { id: cartId },
         });
         resolve({
            errCode: 0,
            errMessage: "The cart is deleted!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let updateCart = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let cart = await db.CartItem.findOne({
            where: { id: data.id },
         });
         if (!cart) {
            //nếu không tìm thấy cart
            resolve({
               errCode: 1,
               errMessage: "The cart isn't exist!",
            });
         }

         // Lấy lại giá sản phẩm sau khi cập nhật
         let product = await db.Product.findOne({
            where: { id: data.product_id },
         });
         if (!product) {
            return resolve({
               errCode: 1,
               errMessage: "Product not found!",
            });
         }

         // Tính toán tổng tiền mới
         let total = product.price * data.quantity;
         await cart.update({
            product_id: data.product_id,
            user_id: data.user_id,
            quantity: data.quantity,
            total: total,
            status: data.status,
         });
         resolve({
            errCode: 0,
            errMessage: "Update cart successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllCarts: getAllCarts,
   createCart: createCart,
   deleteCart: deleteCart,
   updateCart: updateCart,
   getAllCartsByUser: getAllCartsByUser,
};
