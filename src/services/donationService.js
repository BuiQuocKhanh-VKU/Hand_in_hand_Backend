import db from "../models/index.js";
import emailService from "./emailService.js";
const { Op } = require('sequelize');

let getAllDonations = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let donations = "";
         if (id === "ALL") {
            donations = await db.Donation.findAll({
               include: [
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["name"],
                  },
               ],
            });
         } else if (id) {
            donations = await db.Donation.findOne({
               where: { id },
               include: [
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["name"],
                  },
               ],
            });
         }
         resolve(donations);
      } catch (error) {
         reject(error);
      }
   });
};
let createDonation = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: data.user_id },
         });
         await db.Donation.create({
            user_id: data.user_id,
            total_amount: data.total_amount,
         });
         let dataEmail = {
            email: user.email,
            name: user.name,
            total_amount: data.total_amount,
         };
         try {
            await emailService.sendThankYouEmail(dataEmail);
         } catch (error) {
            console.error("Failed to send thank you email:", error.message);
         }
         resolve({
            errCode: 0,
            errMessage: "Create a new donation successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};
let deleteDonation = (donationId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let donation = await db.Donation.findOne({
            where: { id: donationId },
         });
         if (!donation) {
            resolve({
               errCode: 1,
               errMessage: "The donation isn't exist!",
            });
         }
         await db.Donation.destroy({
            where: { id: donationId },
         });
         resolve({
            errCode: 0,
            errMessage: "The donation is deleted!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let updateDonation = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let donation = await db.Donation.findOne({
            where: { id: data.id },
         });

         if (!donation) {
            resolve({
               errCode: 1,
               errMessage: "The donation isn't exist!",
            });
         }

         // Cập nhật Donation với thông tin mới
         await donation.update({
            user_id: data.user_id,
            total_amount: data.total_amount, // Cập nhật tổng số tiền (cộng thêm 10%)
         });

         resolve({
            errCode: 0,
            errMessage: "Update donation successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let getAllDonationsByUser = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let donations = await db.Donation.findAll({
            where: { user_id: userId },
            attributes: ["id", "quantity", "product_id", "user_id", "total_amount"],
            include: [
               {
                  model: db.CartItem,
                  as: "cartItem",
                  attributes: ["quantity", "total"],
               },
            ],
         });
         resolve(donations);
      } catch (error) {
         reject(error);
      }
   });
};

let getDonationsCountForCurrentWeek = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let startOfWeek = new Date();
         startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
         startOfWeek.setHours(0, 0, 0, 0);

         let endOfWeek = new Date(startOfWeek);
         endOfWeek.setDate(endOfWeek.getDate() + 7);

         let donations = await db.Donation.findAll({
            where: {
               createdAt: {
                  [Op.between]: [startOfWeek, endOfWeek],
               },
            },
            attributes: [
               [db.sequelize.fn("DAYOFWEEK", db.sequelize.col("createdAt")), "day"],
               [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
            ],
            group: ["day"],
         });

         let donationCounts = Array(7).fill(0);
         donations.forEach((donation) => {
            donationCounts[donation.dataValues.day - 1] = donation.dataValues.count;
         });

         resolve(donationCounts);
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllDonations: getAllDonations,
   createDonation: createDonation,
   deleteDonation: deleteDonation,
   updateDonation: updateDonation,
   getAllDonationsByUser: getAllDonationsByUser,
   getDonationsCountForCurrentWeek: getDonationsCountForCurrentWeek,
};
