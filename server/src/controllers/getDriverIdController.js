const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const getDriverById = async (id, source) => {
  try {
    if (source === "bdd") {
      const searchById = await Driver.findByPk(id, {
        include: {
          model: Team,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      return searchById;
    } else if (source === "api") {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      const data = response.data;

      const driverDetail = {
        id: data.id,
        name: data.name.forename,
        lastname: data.name.surname,
        description: data.description,
        image:
          data.image.url ||
          "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/140576-tv-news-feature-how-to-watch-f1-in-4k-ultra-hd-image1-mlmba7ehtv.jpg",
        nationality: data.nationality,
        birthdate: data.dob,
        teams: data.teams,
      };

      return driverDetail;
    } else {
      // Handle invalid source value
      throw new Error("Invalid source");
    }
  } catch (error) {
    // Handle any errors that may occur during the process
    throw error;
  }
};

module.exports = { getDriverById };
