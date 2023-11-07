const axios = require("axios");
const { Driver, Team } = require("../db");

const getAllDrivers = async () => {
  try {
    // Obtener datos de la API externa
    const apiResponse = await axios.get(`http://localhost:5000/drivers`);
    const externalData = apiResponse.data;

    const apiDrivers = externalData.map((Elem) => {
      const imageUrl =
        Elem.image && Elem.image.url
          ? Elem.image.url
          : "https://acortar.link/7kVOdJ";
      return {
        driverId: Elem.id,
        firstName: Elem.name && Elem.name.forename ? Elem.name.forename : 'Nombre no disponible',
        lastName: Elem.name && Elem.name.surname ? Elem.name.surname : 'Apellido no disponible',
        description: Elem.description || 'Descripción no disponible',
        image: imageUrl,
        nationality: Elem.nationality || 'Nacionalidad no disponible',
        birthdate: Elem.dob || 'Fecha de nacimiento no disponible',
        teams: Elem.teams || ['Equipos no disponibles'],
        created: false,
      };
    });

    // Consultar datos de la base de datos local
    const localData = await Driver.findAll({
      include: [
        {
          model: Team,
          attributes: ["teamname"], // Cambiar "name" por "teamname"
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
      teams: dbDriver.Teams.map((team) => team.teamname), // Cambiar "name" por "teamname"
    }));

    // Combinar datos de la API y la base de datos local
    return [...apiDrivers, ...localDrivers];
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllDrivers };
