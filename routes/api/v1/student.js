const express = require('express');

const routes = express.Router();

const StudentController = require('../../../controller/api/v1/StudentController');

routes.post("/register", StudentController.register);

module.exports = routes;