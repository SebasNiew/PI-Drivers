const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

// Función para buscar en la API
const findDriversAPI = async (name) => {
  const lowercaseName = name.toLowerCase();
  const imageUrl = "https://acortar.link/7kVOdJ"; // Imagen predeterminada

  try {
    const response = await axios.get(
      `http://localhost:5000/drivers?search=${lowercaseName}`
    );

    const apiDrivers = response.data.results.filter((driver) =>
      driver.name.forename.toLowerCase().includes(lowercaseName)
    );

    return apiDrivers.map((driver) => ({
      driverId: driver.id,
      firstName: driver.name.forename,
      lastName: driver.name.surname,
      description: driver.description,
      image: driver.image && driver.image.url ? driver.image.url : imageUrl,
      nationality: driver.nationality,
      birthdate: driver.dob,
      teams: driver.teams,
    }));
  } catch (error) {
    throw error;
  }
};

// Función para buscar en la base de datos
const findDriversBDD = async (name) => {
  try {
    return await Driver.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Team,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

// Función para combinar resultados
const findDrivers = async (name) => {
  const bdd = await findDriversBDD(name);
  const api = await findDriversAPI(name);

  return [...bdd, ...api].slice(0, 15);
};

module.exports = { findDrivers };
