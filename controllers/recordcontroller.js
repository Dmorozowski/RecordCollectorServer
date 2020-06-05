let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Records = sequelize.import("../models/records");

router.get("/mine", (req, res) => {
  Records.findAll({
    where: {
      userId: req.user.id,
    },
  })
    .then((records) => res.status(200).json(records))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/create", (req, res) => {
  Records.create({
    artist: req.body.artist,
    album: req.body.album,
    userId: req.user.id,
  })
    .then((records) =>
      res.status(200).json({
        records: records,
        message: "Record information stored",
      })
    )
    .catch((err) => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Records.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: "user",
  })
    .then((records) =>
      res.status(200).json({
        records: records,
        message: "Record found",
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  Records.update(req.body, {
    where: { id: req.params.id, userId: req.user.id },
  })
    .then(
      (updateSuccess = (records) => {
        res.json({
          records: records,
          message: "Updated record info",
        });
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  Records.destroy({
    where: { id: req.params.id, userId: req.user.id },
  })
    .then(
      (deleteSuccess = (records) => {
        res.send("Record information has been removed");
      })
    )
    .catch(
      (deleteError = (err) => {
        res.send(500, err.message);
      })
    );
});

module.exports = router;
