const express = require("express");
const { Router } = express;
const router = new Router();
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");

// GET user profile
router.get("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.userId);
    const getUser = await User.findByPk(id);
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

module.exports = router;
