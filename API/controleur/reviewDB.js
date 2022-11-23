const pool = require("../modele/database");
const ReviewModele = require("../modele/reviewDB");

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
  const { note, comment, toilet_id, user_id } = req.body;
  const client = await pool.connect();
  try {
    const { rows: rowReview } = await ReviewModele.postReview(
      note,
      comment,
      toilet_id,
      user_id,
      client
    );
    const review = rowReview[0];

    res.json(review);
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
