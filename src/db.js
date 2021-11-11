require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  timezone: "UTC",
  logging: false,
  native: false,
  dialect: "postgres",
  protocol: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false
  },
});


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Request, User } = sequelize.models;

Request.belongsTo(User);
User.hasMany(Request);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
