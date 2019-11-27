
const express = require('express')
const courses = require("../routes/courses");
const coustomer = require("../routes/customers");
const movies = require("../routes/movies");
const rental = require("../routes/rental");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require('../middleware/errorHandling')
module.exports = function(app) {
app.use(express.json());
  app.use("/api/genres", courses);
  app.use("/api/coustomer", coustomer);
  app.use("/api/movies", movies);
  app.use("/api/rental", rental);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
