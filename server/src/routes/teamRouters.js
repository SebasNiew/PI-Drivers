const { Router } = require("express");
const teamRouters = Router();
const { getTeamsHandler } = require("../handlers/teamHandlers");

teamRouters.get("/", getTeamsHandler);
module.exports = teamRouters;
