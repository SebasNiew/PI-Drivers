const axios = require("axios");
const { Driver, Team } = require("../db");

const getAllDrivers = async () => {
  try {
    // Obtener datos de la API externa
    const apiResponse = await axios.get(`http://localhost:5000/drivers`);
    const externalData = apiResponse.data;

    // Mapear los datos de la API externa
    const apiDrivers = externalData.map((Elem) => {
      const imageUrl =
        Elem.image && Elem.image.url
          ? Elem.image.url
          : "https://acortar.link/7kVOdJ";
      return {
        driverId: Elem.id,
        firstName: Elem.name.forename,
        lastName: Elem.name.surname,
        description: Elem.description,
        image: imageUrl,
        nationality: Elem.nationality,
        birthdate: Elem.dob,
        teams: Elem.teams,
        created: false,
      };
    });

    // Consultar datos de la base de datos local
    const localData = await Driver.findAll({
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

    // Mapear los datos de la base de datos local
    const localDrivers = localData.map((dbDriver) => ({
      driverId: dbDriver.id,
      firstName: dbDriver.name,
      lastName: dbDriver.lastname,
      description: dbDriver.description,
      image: dbDriver.image,
      nationality: dbDriver.nationality,
      birthdate: dbDriver.birthdate,
      teams: dbDriver.Teams.map((team) => team.name),
    }));

    // Combinar datos de la API y la base de datos local
    return [...apiDrivers, ...localDrivers];
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllDrivers };
