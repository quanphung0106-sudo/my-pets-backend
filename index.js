const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const route = require('./src/routes/index');
const morgan = require('morgan');

dotenv.config();

const port = process.env.PORT || 8801;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to the MongoDB!');
  })
  .catch((error) => {
    console.log(`Can not connect to database, ${error}`);
  });

//midleware
app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('short'));

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

route(app);

app.listen(port, () => {
  console.log(`Connected to server with port: ${port}`);
});
