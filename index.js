const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config();

conn.sync().then(() => {
  console.log($PORT || process.env.PORT)
  server.listen(process.env.PORT || $PORT, () => {
    console.log('Everything Ready!');
  });
});
