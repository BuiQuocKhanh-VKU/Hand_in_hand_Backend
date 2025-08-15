import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import campaignController from "../controllers/campaignController";
import provinceController from "../controllers/provinceController";
import partnerController from "../controllers/partnerController";
import campaignDonationController from "../controllers/campaignDonationController";
import productController from "../controllers/productController";
import cartController from "../controllers/cartController";
import donationController from "../controllers/donationController";

let router = express.Router();

let initWebRoutes = (app) => {
   router.get("/", homeController.getHomePage);
   router.post("/post-crud", homeController.postCRUD);
   router.get("/signin", homeController.getSignInPage);
   router.get("/signup", homeController.getSignUpPage);
   router.post("/post-crud", homeController.postCRUD);
   router.get("/get-crud", homeController.displayGetCRUD);
   router.get("/edit-crud", homeController.getEditCRUD);
   router.post("/put-crud", homeController.putCRUD);
   router.get("/delete-crud", homeController.deleteCRUD);

   //api user
   router.post("/api/login", userController.handleLogin);
   router.get("/api/get-all-users", userController.handleGetAllUsers);
   router.post("/api/create-new-user", userController.handleCreateNewUser);
   router.put("/api/edit-user", userController.handleEditUser);
   router.delete("/api/delete-user", userController.handleDeleteUser);

   //api campaign
   router.get("/api/get-all-campaigns", campaignController.handleGetAllCampaigns);
   router.post("/api/create-campaign", campaignController.handleCreateCampaign);
   router.put("/api/update-campaign", campaignController.handleUpdateCampaign);
   router.delete("/api/delete-campaign", campaignController.handleDeleteCampaign);
   router.get("/api/get-campaigns-by-province", campaignController.handleGetCampaignsByProvince);

   //api province
   router.get("/api/get-all-provinces", provinceController.handleGetAllProvinces);
   router.get("/api/get-province-overview", provinceController.handleGetProvinceOverview);

   //api partner
   router.get("/api/get-all-partners", partnerController.handleGetAllPartners);
   router.post("/api/create-partner", partnerController.handleCreatePartner);
   router.put("/api/update-partner", partnerController.handleUpdatePartner);
   router.delete("/api/delete-partner", partnerController.handleDeletePartner);

   //api campaign-donation
   router.get("/api/get-all-campaign-donations", campaignDonationController.handleGetAllCampaignDonations);
   router.post("/api/create-campaign-donation", campaignDonationController.handleCreateCampaignDonation);
   router.put("/api/update-campaign-donation", campaignDonationController.handleUpdateCampaignDonation);
   router.delete("/api/delete-campaign-donation", campaignDonationController.handleDeleteCampaignDonation);
   router.get("/api/get-campaign-donations-by-user", campaignDonationController.handleGetCampaignDonationsByUser);

   //api product
   router.get("/api/get-all-products", productController.handleGetAllProducts);
   router.post("/api/create-product", productController.handleCreateProduct);
   router.put("/api/update-product", productController.handleUpdateProduct);
   router.delete("/api/delete-product", productController.handleDeleteProduct);

   //api cart-item
   router.get("/api/get-all-carts", cartController.handleGetAllCarts);
   router.post("/api/create-cart", cartController.handleCreateCart);
   router.put("/api/update-cart", cartController.handleUpdateCart);
   router.delete("/api/delete-cart", cartController.handleDeleteCart);
   router.get("/api/get-cart-by-user", cartController.handleGetCartByUser);

   //api donation
   router.get("/api/get-all-donations", donationController.handleGetAllDonations);
   router.post("/api/create-donation", donationController.handleCreateDonation);
   router.put("/api/update-donation", donationController.handleUpdateDonation);
   router.delete("/api/delete-donation", donationController.handleDeleteDonation);
   router.get("/api/get-donation-by-user", donationController.handleGetDonationByUser);
   return app.use("/", router);
};

module.exports = initWebRoutes;
