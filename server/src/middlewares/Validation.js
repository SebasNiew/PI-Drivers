const validate = (req, res, next) => {
  const { name, lastname, description, nationality, birthday, teams } = req.body;
  const errors = [];

  if (!name) errors.push("missing name");
  if (!lastname) errors.push("missing lastname");
  if (!description) errors.push("missing description");
  if (!nationality) errors.push("missing nationality");
  if (!birthday) errors.push("missing birthday");
  if (!teams) errors.push("missing teams");

  if (errors.length > 0) {
    // Si hay errores, envía una respuesta de error con todos los errores acumulados
    return res.status(400).json({ errors });
  }
console.log(validate);
  // Si no hay errores, continúa con el siguiente middleware
  next();
};

module.exports = { validate };