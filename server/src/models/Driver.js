const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Driver",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      apellido: {
        type: DataTypes.STRING, // Agregar campo Apellido
      },
      descripcion: {
        type: DataTypes.TEXT, // Agregar campo Descripción
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true, // Agregar campo Imagen
      },
      nacionalidad: {
        type: DataTypes.STRING, // Agregar campo Nacionalidad
      },
      dob: {
        type: DataTypes.STRING, // Agregar campo Fecha de Nacimiento
      },
    },
    { timestamps: false }
  );
};
