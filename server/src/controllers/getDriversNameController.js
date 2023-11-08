const { getAllDrivers } = require("./getAllDriversController");

// La parte de formato de datos que tenías en apiDriverscrowd
const formatDriverData = (Elem) => {
  const imageUrl = Elem.image && Elem.image.url ? Elem.image.url : "https://acortar.link/7kVOdJ";
  const firstName = Elem.name && Elem.name.forename ? Elem.name.forename : 'Nombre no disponible';
  const lastName = Elem.name && Elem.name.surname ? Elem.name.surname : 'Apellido no disponible';

  const firstNameLower = firstName ? firstName.toLowerCase() : '';
  const lastNameLower = lastName ? lastName.toLowerCase() : '';

  return {
    driverId: Elem.id,
    firstName: firstName,
    lastName: lastName,
    description: Elem.description || 'Descripción no disponible',
    image: imageUrl,
    nationality: Elem.nationality || 'Nacionalidad no disponible',
    birthdate: Elem.dob || 'Fecha de nacimiento no disponible',
    teams: Elem.teams || ['Equipos no disponibles'],
    created: false,
    // Agrega las propiedades firstNameLower y lastNameLower aquí si las necesitas
  };
};

const findDrivers = async (name) => {
  try {
    const allDrivers = await getAllDrivers();
    const nameToLower = name.toLowerCase();

    if (!allDrivers || !Array.isArray(allDrivers)) {
      throw new Error("Driver data is missing or not an array.");
    }

    const filteredDrivers = allDrivers.filter((Elem) => {
      const driverName = (Elem.firstName && Elem.lastName && Elem.firstName.toLowerCase() + " " + Elem.lastName.toLowerCase()) || '';
      return driverName.includes(nameToLower);
    });

    if (filteredDrivers.length > 0) {
      return filteredDrivers.slice(0, 15);
    } else {
      throw new Error(`Driver not found: ${name}`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { findDrivers };
