const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Driver } = require("../db");
const axios = require("axios");
const imageUrl = "https://acortar.link/7kVOdJ";

const findDrivers = async (name) => {
  const { data } = await axios.get(
    `http://localhost:5000/drivers/?name.forename=${name}`
  );
  const nameToLower = name.toLowerCase(); //*convierte el nombre de busqueda Name en minuscula
  const filteredDrivers = data.filter(
    (
      driver //*Filtra los conductores de la respuesta de la API en función de una coincidencia insensible a mayúsculas y minúsculas en la propiedad driverRef:
    ) => driver.driverRef.toLowerCase().includes(nameToLower)
  );

  const filteredDB = await Driver.findAll({
    where: { lastname: { [Op.iLike]: `%${nameToLower}%` } },
  });

  //*Si no se encuentran conductores ni en la API ni en la base de datos, se lanza un error
  if (filteredDrivers.length === 0 && filteredDB.length === 0) {
    throw Error(`No se encontraron conductores con el nombre: ${name}`);
  }

  const challengedFilters = addImage(filteredDrivers); //verifica que contengan img

  return [...challengedFilters.slice(0, 15), ...filteredDB.slice(0, 15)]; //tira los primeros 15 tanto de BD como API
};


module.exports = { findDrivers };
