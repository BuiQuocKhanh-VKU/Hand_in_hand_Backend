"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CampaignDonation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết với bảng Users
      CampaignDonation.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Liên kết với bảng Campaigns
      CampaignDonation.belongsTo(models.Campaign, {
        foreignKey: "campaign_id",
        as: "campaign",
      });
    }
  }
  CampaignDonation.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0.01, // Đảm bảo số tiền quyên góp lớn hơn 0
        },
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      campaign_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CampaignDonation",
      tableName: "CampaignDonations",
    }
  );
  return CampaignDonation;
};
