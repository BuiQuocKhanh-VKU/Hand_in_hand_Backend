"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Campaign extends Model {
        static associate(models) {
            // Một chiến dịch thuộc một tỉnh
            Campaign.belongsTo(models.Province, {
                foreignKey: "province_id",
                as: "province",
            });

            // Một chiến dịch có nhiều đối tác
            Campaign.hasMany(models.Partner, {
                foreignKey: "campaign_id",
                as: "partners",
            });

            // Một chiến dịch có nhiều khoản quyên góp
            Campaign.hasMany(models.CampaignDonation, {
                foreignKey: "campaign_id",
                as: "donations",
            });
        }
    }
    Campaign.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            title: DataTypes.STRING,
            province_id: DataTypes.STRING,
            position: DataTypes.STRING,
            position_map: DataTypes.STRING,
            image: DataTypes.STRING,
            description: DataTypes.TEXT,
            status: DataTypes.ENUM("ongoing", "ended", "upcoming"),
            target_amount: DataTypes.DECIMAL(15, 2),
            current_amount: DataTypes.DECIMAL(15, 2),
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Campaign",
            tableName: "Campaigns",
        }
    );
    return Campaign;
};
