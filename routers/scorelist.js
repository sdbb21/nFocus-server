const express = require("express");
const { Router } = express;
const router = new Router();
const User = require("../models").user;
const ScoreList = require("../models").scoreList;

// GET the 10 highest Scores with User names
router.get("/", async (req, res, next) => {
  try {
    const get10Scores = await ScoreList.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["score", "DESC"]],
      limit: 2,
    });

    res.json(get10Scores);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
