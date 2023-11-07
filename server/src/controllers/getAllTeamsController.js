const axios = require("axios");
const URL = "http://localhost:5000/drivers";
const { Team } = require("../db");

const getAllTeams = async () => {
  // Verificar si la base de datos está vacía
  const teamsCount = await Team.count();

  if (teamsCount === 0) {
    // Obtener conductores de la API
    const response = await axios.get(URL);
    const drivers = response.data; // Considera la respuesta como una lista de conductores

    if (Array.isArray(drivers) && drivers.length > 0) {
      // Itera sobre los conductores
      for (const driver of drivers) {
        // Verifica si el campo "teams" está presente
        if (driver.teams) {
          // Separa los nombres de los equipos y guarda en la base de datos
          const teamNames = driver.teams.split(",").map((name) => name.trim());
          for (const teamname of teamNames) {
            await Team.findOrCreate({ where: { teamname } }); // Cambia "name" a "teamname"
          }
        } else if (driver.team) {
          // En el caso de un solo equipo, guarda ese equipo en la base de datos
          await Team.findOrCreate({ where: { teamname: driver.team.trim() } }); // Cambia "name" a "teamname"
        }
      }
    }
  }

  // Retornar todos los equipos de la base de datos
  const teamsDB = await Team.findAll();
  return teamsDB;
};

module.exports = { getAllTeams };
