module.exports = (sequelize, DataTypes) => {
  const Records = sequelize.define("records", {
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  let User = sequelize.import("./users");
  Records.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Records);

  return Records;
};
