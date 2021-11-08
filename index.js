const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync().then(() => {
  server.listen(3005, () => {
    console.log('Abierto en puerto 3005');
  });
});
