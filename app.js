require("dotenv").config();
let express = require("express");
let app = express();
let user = require("./controllers/usercontroller");
let record = require("./controllers/recordcontroller");
let sequelize = require("./db");

sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/auth", user);

app.use(require("./middleware/validateSession"));
app.use("/records", record);

app.listen(3000, function () {
  console.log("App is listening on 3000");
});
