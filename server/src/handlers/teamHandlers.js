const { getAllTeams } = require("../controllers/getAllTeamsController"); // Asegúrate de usar el nombre correcto del controlador

// Manejador para obtener todos los equipos
const getTeamsHandler = async (req, res) => {
  try {
    const teams = await getAllTeams(); // Llama a la función getAllTeams del controlador
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener equipos" });
  }
};

module.exports = { getTeamsHandler };
