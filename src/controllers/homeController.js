import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";

let getHomePage = async (reg, res) => {
  try {
    let data = await CRUDService.getAllUser(); //truy vấn tất cả dữ liệu trong bảng Users
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), //chuyển dữ liệu từ dạng object sang dạng string
    });
    //return res.render("homepage.ejs");
  } catch (error) {
    console.log(error);
  }
};

let getSignInPage = (req, res) => {
  return res.render("signin.ejs");
};

let getSignUpPage = (req, res) => {
  return res.render("signup.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User id is not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let allUsers = await CRUDService.deleteUserById(userId);
    return res.render("displayCRUD.ejs", {
      dataTable: allUsers,
    });
  } else {
    return res.send("User id is not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getSignInPage: getSignInPage,
  getSignUpPage: getSignUpPage,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
