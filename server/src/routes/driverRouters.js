const { Router } = require("express");
const driverRouters = Router();
const {
  getDriverHandler,
  getDetailHandler,
  postDriverHandler,
} = require("../handlers/driverHandlers");

driverRouters.get("/", getDriverHandler); //trae todos los drivers

driverRouters.get("/:id", getDetailHandler); //trae los drivers por id

driverRouters.post("/", postDriverHandler); // crea un nuevo driver, aca puede ir un validate

module.exports = driverRouters;
