const pool = require("../modele/database");
const ReviewModele = require("../modele/reviewDB");
const jwt = require("jsonwebtoken");

module.exports.getReviewsByToiletId = async (req, res) => {
  const client = await pool.connect();
  const toiletIdText = req.params.toiletId;
  const toiletId = parseInt(toiletIdText);
  try {
    if (!isNaN(toiletId)) {
      const { rows: reviewRows } = await ReviewModele.getReviewsByToiletId(
        client,
        toiletId
      );
      const reviews = reviewRows;
      if (reviews !== undefined) {
        reviews.forEach((review) => {
          review.toiletId = review.toilet_id;
          review.userId = review.userId;
          review.date = review.date.toLocaleDateString("fr", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
          delete review.toilet_id;
          delete review.user_id;
        });
        res.json(reviews);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error("getReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getReview = async (req, res) => {
  const client = await pool.connect();
  const idText = req.params.id;
  const id = parseInt(idText);
  try {
    const { rows } = await ReviewModele.getReview(client, id);
    const review = rows[0];
    if (review !== undefined) {
      res.sendStatus(200).json(review);
    }
  } catch (error) {
    console.error("mustBeAdminError", error);
  } finally {
    client.release();
  }
};

module.exports.postReview = async (req, res) => {
  const { note, comment, toiletId } = req.body;

  const client = await pool.connect();
  try {
    const { rows: reviews } = await ReviewModele.postReview(
      client,
      note,
      comment,
      req.session.id,
      toiletId
    );
    res.status(201).json(reviews[0].id);
  } catch (error) {
    console.error("PostReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    await ReviewModele.deleteReview(client, id);
    res.sendStatus(204);
  } catch (error) {
    console.error("deleteReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.updateReview = async (req, res) => {
  const { id, note, comment } = req.body;
  const client = await pool.connect();
  try {
    await ReviewModele.updateReview(client, id, note, comment);
    res.sendStatus(204);
  } catch (error) {
    console.error("updateReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
