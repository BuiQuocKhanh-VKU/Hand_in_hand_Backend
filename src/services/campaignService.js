import db from "../models/index";

let getAllCampaigns = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaigns = "";
         if (id === "ALL") {
            //nếu id = "ALL" thì lấy tất cả các chiến dịch
            campaigns = await db.Campaign.findAll({
               include: [
                  {
                     model: db.Province,
                     as: "province",
                     attributes: ["name"],
                  },
                  { model: db.CampaignDonation, as: "donations" },
                  { model: db.Partner, as: "partners" },
               ],
            });
            //Tính tổng số tiền quyên góp và cập nhật vào mỗi chiến dịch
            await Promise.all(
               campaigns.map(async (campaign) => {
                  let totalAmount = campaign.donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);

                  // Cập nhật `current_amount` vào database
                  await campaign.update({ current_amount: totalAmount });

                  return { ...campaign.toJSON(), current_amount: totalAmount };
               })
            );
         } else if (id) {
            //nếu id có giá trị thì lấy chiến dịch theo id
            campaigns = await db.Campaign.findOne({
               where: { id },
               include: [
                  {
                     model: db.Province,
                     as: "province",
                     attributes: ["name"],
                  },
                  { model: db.CampaignDonation, as: "donations" },
                  { model: db.Partner, as: "partners" },
               ],
            });
            if (campaigns) {
               let totalAmount = campaigns.donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);

               // Cập nhật `current_amount` vào database
               await campaigns.update({ current_amount: totalAmount });
            }
         }
         resolve(campaigns);
      } catch (error) {
         reject(error);
      }
   });
};

let getCampaignByProvinceId = (provinceId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaigns = "";
         if (provinceId) {
            //nếu id có giá trị thì lấy chiến dịch theo id
            campaigns = await db.Campaign.findAll({
               where: { province_id: provinceId },
               attributes: ["id", "title", "description", "image", "status"],
            });
         }
         resolve(campaigns);
      } catch (error) {
         reject(error);
      }
   });
};

let createCampaign = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let newCampaign = await db.Campaign.create({
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status,
            target_amount: data.target_amount,
            province_id: data.province_id,
            position: data.position,
            position_map: data.position_map,
            image: data.image,
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
         });

         if (data.donations) {
            //nếu có dữ liệu về khoản quyên góp thì thêm vào bảng CampaignDonation
            await Promise.all(
               data.donations.map((donation) =>
                  db.CampaignDonation.create({
                     ...donation,
                     campaign_id: newCampaign.id,
                  })
               )
            );
         }

         if (data.partners) {
            //nếu có dữ liệu về đối tác thì thêm vào bảng Partner
            await Promise.all(
               data.partners.map((partner) =>
                  db.Partner.create({
                     ...partner,
                     campaign_id: newCampaign.id,
                  })
               )
            );
         }

         resolve({
            errCode: 0,
            message: "Campaign created successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let updateCampaign = (data) => {
   //cập nhật thông tin chiến dịch
   return new Promise(async (resolve, reject) => {
      try {
         let campaign = await db.Campaign.findOne({
            where: { id: data.id },
         });
         if (!campaign) {
            //nếu không tìm thấy chiến dịch thì trả về thông báo lỗi
            resolve({
               errCode: 1,
               message: "Campaign not found!",
            });
         }

         await campaign.update({
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status,
            target_amount: data.target_amount,
            province_id: data.province_id,
            position: data.position,
            position_map: data.position_map,
            image: data.image,
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
         });

         resolve({
            errCode: 0,
            message: "Campaign updated successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

let deleteCampaign = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let campaign = await db.Campaign.findOne({ where: { id } });
         if (!campaign) {
            resolve({
               errCode: 1,
               message: "Campaign not found!",
            });
         }

         await db.Campaign.destroy({ where: { id } });

         resolve({
            errCode: 0,
            message: "Campaign deleted successfully!",
         });
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   getAllCampaigns,
   getCampaignByProvinceId,
   createCampaign,
   updateCampaign,
   deleteCampaign,
};
