import { name } from "ejs";
import db from "../models/index.js";

let getAllProducts = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let products = "";
         if (id === "ALL") {
            products = await db.Product.findAll({});
         } else if (id) {
            products = await db.Product.findOne({
               where: { id },
            });
         }
         resolve(products);
      } catch (error) {
         reject(error);
      }
   });
};

let createProduct = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         await db.Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
         });
         resolve({
            errCode: 0,
            errMessage: "Create a new product successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let updateProduct = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let product = await db.Product.findOne({
            where: { id: data.id },
         });
         if (!product) {
            //nếu không tìm thấy product
            resolve({
               errCode: 1,
               errMessage: "The product isn't exist!",
            });
         }
         await product.update({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
         });
         resolve({
            errCode: 0,
            errMessage: "Update product successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let deleteProduct = async (productId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let product = await db.Product.findOne({
            where: { id: productId },
         });
         if (!product) {
            resolve({
               errCode: 1,
               errMessage: "The user isn't exist!",
            });
         }
         await db.Product.destroy({
            where: { id: productId },
         });
         resolve({
            errCode: 0,
            errMessage: "The product is deleted!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllProducts: getAllProducts,
   createProduct: createProduct,
   updateProduct: updateProduct,
   deleteProduct: deleteProduct,
};
