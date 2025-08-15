import db from "../models/index";

let getAllProvinces = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let Provinces = "";
         if (id === "ALL") {
            //nếu id = "ALL" thì lấy tất cả các Province
            Provinces = await db.Province.findAll();
         } else if (id) {
            //nếu id có giá trị thì lấy Province theo id
            Provinces = await db.Province.findOne({
               where: { id },
            });
         }
         resolve(Provinces);
      } catch (error) {
         reject(error);
      }
   });
};

let getProvinceOverview = (provinceId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let province = await db.Province.findOne({
            where: { id: provinceId },
            attributes: ["id", "name", "image"],
         });
         if (!province) {
            resolve({
               errCode: 1,
               message: "Province not found!",
            });
         }
         let campaigns = await db.Campaign.findAll({
            where: { province_id: provinceId },
            include: [
               {
                  model: db.CampaignDonation,
                  as: "donations",
               },
            ],
         });
         let totalCampaigns = campaigns.length;
         let endedCampaigns = campaigns.filter((campaign) => campaign.status === "ended").length;
         let ongoingCampaigns = campaigns.filter((campaign) => campaign.status === "ongoing").length;
         let upcomingCampaigns = campaigns.filter((campaign) => campaign.status === "upcoming").length;
         //sử dụng reduce để tính tổng số tiền quyên góp cho tất cả các chiến dịch
         let totalDonationAmount = campaigns.reduce((sum, campaign) => {
            let campaignTotal = campaign.donations.reduce((donationSum, donation) => {
               return donationSum + parseFloat(donation.amount); // Tổng tiền quyên góp cho từng chiến dịch
            }, 0);
            return sum + campaignTotal; // Tổng tiền quyên góp cho tất cả các chiến dịch
         }, 0);
         // Kết quả trả về
         let overview = {
            province,
            totalCampaigns,
            endedCampaigns,
            ongoingCampaigns,
            upcomingCampaigns,
            totalDonationAmount,
         };
         resolve(overview);
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllProvinces,
   getProvinceOverview,
};
