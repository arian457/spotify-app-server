const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    favorites_artist: {
      type: DataTypes.JSON,
    },
  });
};
