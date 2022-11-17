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
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    console.log(id);
    await ReviewModele.deleteReview(id, client);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
