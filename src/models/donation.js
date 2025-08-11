"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Donation extends Model {
        static associate(models) {
            // Mối quan hệ với bảng Users
            Donation.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });
            
        }
    }
    Donation.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.BIGINT,
            total_amount: DataTypes.DECIMAL(20, 2) // Tổng số tiền của CartItem
        },
        {
            sequelize,
            modelName: "Donation",
            tableName: "Donations",
        }
    );

    return Donation;
};
