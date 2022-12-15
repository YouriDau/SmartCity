require("dotenv").config();
const process = require("process");
const jwt = require("jsonwebtoken");

module.exports.identification = async (req, res, next) => {
  const headerAuth = req.get("authorization");
  if (headerAuth !== undefined && headerAuth.includes("Bearer")) {
    const jwtToken = headerAuth.split(" ")[1]; // Permet de récupérer le token [0] = "Bearer", [1] = le token
    try {
      const decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_TOKEN); // Vérifier si le token n'a pas changé
      req.session = decodedJwtToken.value;
      req.session.authLevel = decodedJwtToken.status;
      next();
    } catch (error) {
      console.error("IdentificationError", error);
      res.status(400).json("login needed!");
    }
  } else {
    res.sendStatus(401);
  }
};
