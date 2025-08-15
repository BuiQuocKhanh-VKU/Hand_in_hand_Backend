import db from "../models/index.js";

let getAllPartners = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let partners = "";
         if (id === "ALL") {
            partners = await db.Partner.findAll({
               include: [
                  {
                     model: db.Campaign,
                     as: "campaign",
                     attributes: ["title"],
                  },
               ],
            });
         } else if (id) {
            partners = await db.Partner.findOne({
               where: { id },
               include: [
                  {
                     model: db.Campaign,
                     as: "campaign",
                     attributes: ["title"],
                  },
               ],
            });
         }
         resolve(partners);
      } catch (error) {
         reject(error);
      }
   });
};
let createPartner = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         await db.Partner.create({
            campaign_id: data.campaign_id,
            name: data.name,
            logo: data.logo,
         });
         resolve({
            errCode: 0,
            errMessage: "Create a new partner successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};
let deletePartner = (partnerId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let partner = await db.Partner.findOne({
            where: { id: partnerId },
         });
         if (!partner) {
            resolve({
               errCode: 1,
               errMessage: "The partner isn't exist!",
            });
         }
         await db.Partner.destroy({
            where: { id: partnerId },
         });
         resolve({
            errCode: 0,
            errMessage: "The partner is deleted!",
         });
      } catch (error) {
         reject(error);
      }
   });
};
let updatePartner = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let partner = await db.Partner.findOne({
            where: { id: data.id },
         });
         if (!partner) {
            //nếu không tìm thấy partner
            resolve({
               errCode: 1,
               errMessage: "The partner isn't exist!",
            });
         }
         await partner.update({
            campaign_id: data.campaign_id,
            name: data.name,
            logo: data.logo,
         });
         resolve({
            errCode: 0,
            errMessage: "Update partner successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllPartners: getAllPartners,
   createPartner: createPartner,
   deletePartner: deletePartner,
   updatePartner: updatePartner,
};
