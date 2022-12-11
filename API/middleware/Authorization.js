const ReviewModele = require("../modele/reviewDB");
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

module.exports.mustBeAdminOrOwnerReview = async (req, res, next) => {
  if (req.session !== undefined && req.session.authLevel === "admin") {
    next();
  } else {
    const headerAuth = req.get("authorization");
    if (headerAuth !== undefined && headerAuth.includes("Bearer")) {
      const userId = req.session.id;
      const reviewId = req.body.id;

      if (req.session.authLevel === "user") {
        const client = await pool.connect();

        try {
          const isCreatedByUser = await ReviewModele.isReviewCreatedByUser(
            client,
            reviewId,
            userId
          );
          if (isCreatedByUser) {
            next();
          } else {
            res.sendStatus(403);
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
