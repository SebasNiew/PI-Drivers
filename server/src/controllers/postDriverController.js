const { Driver, Team } = require("../db");
const Sequelize = require("sequelize");
const axios = require("axios");
const Op = Sequelize.Op;

const createDriver = async (
  name,
  lastname,
  description,
  nationality,
  birthday,
  teams
) => {
  try {
    // Crear un nuevo conductor
    const newDriver = await Driver.create({
      name,
      lastname,
      description,
      nationality,
      birthday,
    });

    // Buscar equipos existentes en la base de datos
    const existTeams = await Team.findAll({
      where: {
        name: {
          [Sequelize.Op.in]: teams,
        },
      },
    });

    // Asociar los equipos con el nuevo conductor
    await newDriver.addTeams(existTeams);

    // Obtener la relación del conductor con los equipos
    const driverRelation = await Driver.findOne({
      where: {
        id: newDriver.id,
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

    return driverRelation;
  } catch (error) {
    throw error;
  }
};

module.exports = { createDriver };
