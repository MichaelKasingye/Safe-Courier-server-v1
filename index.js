const express = require("express");
const app = express();
const mongoose = require("mongoose");
const parcel = require("./routes/parcel");
const admin = require("./routes/admin");
const user = require("./routes/user");
const login = require("./routes/login");


const dotenv = require("dotenv").config();
let MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;

//mongoo connect
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.log("failed Server to connect.." + err));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method"
  );
  next();
});

app.use('/api/v1/',parcel);
app.use('/api/v1/',user);
app.use('/api/v1/',admin);
app.use('/api/v1/',login);


app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
