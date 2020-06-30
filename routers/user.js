const express = require("express");
const { Router } = express;
const router = new Router();
const User = require("../models").user;
const ScoreList = require("../models").scoreList;
const authMiddleware = require("../auth/middleware");

// GET user profile
router.get("/:userId", async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId);
    const getUser = await User.findByPk(id, {
      include: [ScoreList],
      order: [[ScoreList, "score", "DESC"]],
    });
    if (!getUser) {
      res.status(404).send("User not found");
    } else {
      res.json(getUser);
    }
  } catch (e) {
    next(e);
  }
});

// Update an existing User
router.patch("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId);
    const toUpdate = await User.findByPk(id);
    if (!toUpdate) {
      res.status(404).send("User not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

// DELETE a user
router.delete("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId);
    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      res.status(404).send("User not found");
    } else {
      const deleted = userToDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// Add SCORE to User
router.post("/:userId/score", authMiddleware, async (req, res) => {
  const { score, userId } = req.body;
  console.log({ score, userId });
  if (!userId) {
    return res.status(400).send("Missing an name or a userId");
  }

  try {
    const newScore = await ScoreList.create({
      score,
      userId,
    });

    res.status(201).json({
      newScore,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
