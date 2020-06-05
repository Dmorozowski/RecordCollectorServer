const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  operatorsAliases: false,
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to RecordCollector postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
