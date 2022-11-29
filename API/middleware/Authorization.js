const ReviewModele = require("../modele/reviewDB");
const PersonModel = require("../modele/personDB");
const pool = require("../modele/database");

const jwt = require("jsonwebtoken");
const process = require("process");

module.exports.mustBeAdmin = (req, res, next) => {
  if (req.session !== undefined && req.session.authLevel === "admin") {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports.mustBeAdminOrOwner = async (req, res, next) => {
  if (req.session !== undefined && req.session.authLevel === "admin") {
    next();
  } else {
    const headerAuth = req.get("authorization");
    if (headerAuth !== undefined && headerAuth.includes("Bearer")) {
      const jwtToken = headerAuth.split(" ")[1];
      const decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_TOKEN);
      const userId = decodedJwtToken.value.id;

      if (req.session.authLevel === "user") {
        const client = await pool.connect();

        try {
          const { rows } = await ReviewModele.getReview(req.body.id, client);
          const review = rows[0];
          if (review !== undefined) {
            if (userId === review.user_id) {
              next();
            } else {
              res.sendStatus(403);
            }
          } else {
            res.sendStatus(404);
          }
        } catch (error) {
          console.error("adminOwnerError", error);
        } finally {
          client.release();
        }
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
};
