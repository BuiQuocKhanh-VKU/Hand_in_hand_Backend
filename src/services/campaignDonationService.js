import db from "../models/index";

let getAllCampaignDonations = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaignDonations = "";
         if (id === "ALL") {
            campaignDonations = await db.CampaignDonation.findAll({
               include: [
                  {
                     model: db.Campaign,
                     as: "campaign",
                     attributes: ["title"],
                  },
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["email"],
                  },
               ],
            });
         } else if (id) {
            campaignDonations = await db.CampaignDonation.findOne({
               where: { id },
               include: [
                  {
                     model: db.Campaign,
                     as: "campaign",
                     attributes: ["title"],
                  },
                  {
                     model: db.User,
                     as: "user",
                     attributes: ["email"],
                  },
               ],
            });
         }
         resolve(campaignDonations);
      } catch (error) {
         reject(error);
      }
   });
};
let getCampaignDonationsByUser = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaignDonations = await db.CampaignDonation.findAll({
            where: { user_id: userId },
            include: [
               {
                  model: db.Campaign,
                  as: "campaign",
                  attributes: ["title"],
               },
            ],
         });
         resolve(campaignDonations);
      } catch (error) {
         reject(error);
      }
   });
};
let createCampaignDonation = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         await db.CampaignDonation.create({
            user_id: data.user_id,
            campaign_id: data.campaign_id,
            amount: data.amount,
         });

         resolve({
            errCode: 0,
            message: "Create campaign donation successful",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let updateCampaignDonation = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaignDonation = await db.CampaignDonation.findOne({
            where: { id: data.id },
         });
         if (!campaignDonation) {
            resolve({
               errCode: 1,
               message: "Campaign donation not found!",
            });
         }
         await campaignDonation.update({
            user_id: data.user_id,
            campaign_id: data.campaign_id,
            amount: data.amount,
         });
         resolve({
            errCode: 0,
            message: "Campaign donation updated successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let deleteCampaignDonation = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaignDonation = await db.CampaignDonation.findOne({
            where: { id },
         });
         if (!campaignDonation) {
            resolve({
               errCode: 1,
               message: "Campaign donation not found!",
            });
         }
         await db.CampaignDonation.destroy({ where: { id } });
         resolve({
            errCode: 0,
            message: "Campaign donation deleted successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let getCampaignDonationsByCampaign = async (campaignId) => {
   return db.CampaignDonation.findAll({
      where: { campaign_id: campaignId }, // hoặc campaignId nếu cột camelCase
      include: [
         { model: db.Campaign, as: "campaign", attributes: ["title"] },
         { model: db.User, as: "user", attributes: ["id", "email", "name"] },
      ],
      order: [["createdAt", "DESC"]],
   });
};

const getCampaignStatusCounts = async () => {
   // ví dụ cột status có các giá trị: 'running', 'completed', 'paused'
   const rows = await db.Campaign.findAll({
      attributes: ["status", [db.Sequelize.fn("COUNT", db.Sequelize.col("status")), "cnt"]],
      group: ["status"],
      raw: true,
   });

   // Map sang [{name, value}]
   return rows.map((r) => ({ name: r.status, value: Number(r.cnt) }));
};

module.exports = {
   getAllCampaignDonations,
   createCampaignDonation,
   updateCampaignDonation,
   deleteCampaignDonation,
   getCampaignDonationsByUser,
   getCampaignDonationsByCampaign,
   getCampaignStatusCounts,
};
