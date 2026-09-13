const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Workaround: on this machine Node's built-in DNS resolver (c-ares) falls back
// to 127.0.0.1 instead of picking up the real DNS servers, which breaks the
// SRV/TXT lookups that mongodb+srv:// connection strings depend on.
dns.setServers(['8.8.8.8', '1.1.1.1']);

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env', debug: true });
const app = require('./app');
// console.log(process.env); // Access node.js enviroments

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//Always use these settings
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
