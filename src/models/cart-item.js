"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            // Mối quan hệ với bảng Users, quan hệ 1-n
            CartItem.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });

            // Mối quan hệ với bảng Products
            CartItem.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product",
            });

        }
    }
    CartItem.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            product_id: DataTypes.BIGINT,
            quantity: DataTypes.INTEGER,
            status: DataTypes.ENUM("pending", "purchased"),
            total: DataTypes.DECIMAL(20, 2),
        },
        {
            sequelize,
            modelName: "CartItem",
            tableName: "CartItems",
        }
    );
    return CartItem;
};
