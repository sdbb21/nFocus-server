const express = require("express");
const { Router } = express;
const router = new Router();
const User = require("../models").user;
const ScoreList = require("../models").scorelist;

// GET the 10 highest Scores with User names
router.get("/", async (req, res, next) => {
  try {
    const get10Scores = await ScoreList.findAll({
      limit: 10,
      //   include: [User],
      // order: "score DESC",
    });

    res.json(get10Scores);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
