"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Mối quan hệ với bảng CartItems
            Product.hasMany(models.CartItem, {
                foreignKey: "product_id",
                as: "cartItems",
            });
        }
    }
    Product.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.DECIMAL(10, 2),
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "Products",
        }
    );
    return Product;
};
