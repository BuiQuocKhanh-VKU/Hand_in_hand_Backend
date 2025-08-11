"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Partner extends Model {
        static associate(models) {
            // Một đối tác thuộc về một chiến dịch
            Partner.belongsTo(models.Campaign, {
                foreignKey: "campaign_id",
                as: "campaign",
            });
        }
    }
    Partner.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            campaign_id: DataTypes.BIGINT,
            name: DataTypes.STRING,
            logo: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Partner",
            tableName: "Partners",
        }
    );
    return Partner;
};
