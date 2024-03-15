const express = require("express");
const cors = require("cors");
let bodyParser = require("body-parser");
const route = require("./routes");
const morgan = require("morgan");
const db = require("./config");

const app = express();

const port = 6060;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
db.connect();
app.use(route);
app.get("/", (req, res) => {
  res.status(200).json({
    title: "heeloo",
  });
});

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port 6060`);
  });
});
