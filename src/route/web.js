import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  // Route for the home page
  router.post("/post-crud", homeController.postCRUD);
  router.get("/signin", homeController.getSignInPage);
  router.get("/signup", homeController.getSignUpPage);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  
  return app.use("/", router);
};

module.exports = initWebRoutes;
