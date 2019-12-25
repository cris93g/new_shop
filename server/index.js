require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
const routes = require("./routes/routes");

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

massive(process.env.CONNECTION_STRING).then(dbinstance => {
  app.set("db", dbinstance);
});

routes(app);
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
