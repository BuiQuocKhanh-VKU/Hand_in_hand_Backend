import db from "../models/index.js";
import bcrypt from "bcryptjs";
let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user exist
                let user = await db.User.findOne({
                    attributes: ["id", "email", "role", "password", "name", "phone", "address","createdAt"],
                    where: { email: email },
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    );
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.dataValues.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User's not found";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage =
                    "Your email isn't exist in system. Please try again!";
            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(data.email);
            if (isExist === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your email is already in used. Please try another email!",
                });
            } else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
                    phone: data.phone,
                    address: data.address,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Create a new user successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: "The user isn't exist!",
                });
            }
            await db.User.destroy({
                where: { id: userId },
            });
            resolve({
                errCode: 0,
                errMessage: "The user is deleted!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!",
                });
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                });
                if (!user) {
                    resolve({
                        errCode: 1,
                        errMessage: "The user isn't exist!",
                    });
                }
                user.name = data.name;
                user.email = data.email;
                user.phone = data.phone;
                user.address = data.address;
                user.role = data.role;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "The user is updated!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};
