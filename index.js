const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config();

conn.sync().then(() => {
 
  server.listen(process.env.PORT || 5000 , () => {
    console.log(`Everything on port ${process.env.PORT || 5000}!`);
  });
});
