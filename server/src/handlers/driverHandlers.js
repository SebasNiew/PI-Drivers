const { createDriver } = require("../controllers/postDriverController");
const { getDriverById } = require("../controllers/getDriverIdController");
const { findDrivers } = require("../controllers/getDriversNameController");
const { getAllDrivers } = require("../controllers/getAllDriversController");
const axios = require("axios");

//-----------TRAIGO LOS JUEGOS POR NOMBRE SINO TRAIGO TODOS------------
const getDriverHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const driversByName = await findDrivers(name);
      res.status(200).json(driversByName);
    } else {
      const allDrivers = await getAllDrivers();
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const driverDetail = await getDriverById(id, source);
    if (driverDetail.length === 0) throw new Error("No se encontró el driver");
    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDriverHandler = async (req, res) => {
  try {
    const { name, lastname, description, image, nationality, birthday, teams } =
      req.body;
   
      const newDriver = await createDriver(
      name,
      lastname,
      description,
      nationality,
      birthday,
      teams
    );
   
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getDriverHandler,
  getDetailHandler,
  postDriverHandler,
};
