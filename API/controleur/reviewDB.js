const pool = require("../modele/database");
const ReviewModele = require("../modele/reviewDB");
const jwt = require("jsonwebtoken");

module.exports.getReviews = async (req, res) => {
  const toiletIdText = req.params.toiletId;
  const toiletId = parseInt(toiletIdText);
  const client = await pool.connect();
  try {
    if (!isNaN(toiletId)) {
      const { rows: reviewRows } = await ReviewModele.getReviews(
        toiletId,
        client
      );
      const reviews = reviewRows;
      if (reviews !== undefined) {
        reviews.forEach((review) => {
          console.log(review.date);
          review.toiletId = review.toilet_id;
          review.userId = review.userId;
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

module.exports.postReview = async (req, res) => {
  const { note, comment, toiletId, userId } = req.body;
  const client = await pool.connect();
  try {
    const { rows: reviews } = await ReviewModele.postReview(
      note,
      comment,
      toiletId,
      userId,
      client
    );
    res.sendStatus(201).send(reviews[0].id);
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
    await ReviewModele.deleteReview(id, client);
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
    await ReviewModele.updateReview(id, note, comment, client);
    res.sendStatus(204);
  } catch (error) {
    console.error("updateReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
