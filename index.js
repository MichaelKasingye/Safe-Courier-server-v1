const express = require("express");
const app = express();
const parcel = require("./routes/parcel");

const port = process.env.PORT || 4000;


app.use(express.json());

app.use('/api/v1/',parcel);


app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
