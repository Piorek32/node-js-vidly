const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const authToken = require("../middleware/token");

router.get("/me", authToken, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({
      error: error.details[0].message
    });

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ error: "user already exist" });
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  user.password = pass;

  user = await user.save();
  const token = user.userToken();
  console.log(token)
  res
    .header("x-auth-token", token)
    .send({ user: _.pick(user, ["name", "email"]),
            token : token
  });
});

module.exports = router;
