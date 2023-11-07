const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  //funcion que recibe la instancia de sequelize que define el modelo
  sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        // Agregar campo Apellido
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        // Agregar campo Descripción
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true, // Agregar campo Imagen
      },
      nationality: {
        type: DataTypes.STRING,

        // Agregar campo Nacionalidad
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
        // Agregar campo Fecha de Nacimiento
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
