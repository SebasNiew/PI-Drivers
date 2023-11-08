const apiDriverscrowd = externalData.map((Elem) => {
    const imageUrl =
      Elem.image && Elem.image.url
        ? Elem.image.url
        : "https://acortar.link/7kVOdJ";
    const firstName = Elem.name && Elem.name.forename ? Elem.name.forename : 'Nombre no disponible';
    const lastName = Elem.name && Elem.name.surname ? Elem.name.surname : 'Apellido no disponible';
  
    // Comprobar si firstName y lastName son definidos antes de llamar a toLowerCase()
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
    };
  });

  module.exports = apiDriverscrowd;