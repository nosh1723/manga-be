const express = require("express");
const cors = require("cors");
let bodyParser = require("body-parser");
const route = require("./routes");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(route);

app.listen(6000, () => {
  console.log(`App listening on port 6000`);
});
