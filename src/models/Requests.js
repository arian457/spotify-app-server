const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Request",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    }
  );
};
