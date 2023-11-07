const { Driver, Team } = require("../db");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

const createDriver = async (
  name,
  lastname,
  description,
  nationality,
  birthday,
  teamsString
) => {
  try {
    const teamsArray = teamsString.split(",").map((team) => team.trim());
    // Verifica si el conductor ya existe en la base de datos
    const existingDriver = await Driver.findOne({
      where: {
        name,
        lastname,
        description,
        nationality,
        birthday,
      },
    });

    if (existingDriver) {
      throw new Error("Driver already exists");
    }

    // Crea un nuevo conductor
    const newDriver = await Driver.create({
      name,
      lastname,
      description,
      image: "https://example.com/driver-image.jpg",
      nationality,
      birthday,
    });

    // Busca equipos existentes en la base de datos
    const existingTeams = await Team.findAll({
      where: {
        teamname: {
          [Sequelize.Op.in]: teamsArray,
        },
      },
    });

    // Asocia los equipos con el nuevo conductor
    if (existingTeams.length > 0) {
      await newDriver.addTeams(existingTeams);
    }

    // Obtiene la relación del conductor con los equipos
    const driverRelation = await Driver.findOne({
      where: {
        id: newDriver.id,
      },
      include: [
        {
          model: Team,
          attributes: ["teamname"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return driverRelation;
  } catch (error) {
    throw error;
  }
};

module.exports = { createDriver };
