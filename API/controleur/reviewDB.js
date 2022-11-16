const pool = require("../modele/database");
const ReviewModele = require("../modele/reviewDB");

module.exports.getReviews = async (req, res) => {
  const client = await pool.connect();
  const idToiletText = req.params.toiletId; //attention ! Il s'agit de texte !
  const idToilet = parseInt(idToiletText);
  try {
    if (isNaN(idToilet)) {
      res.sendStatus(400);
    } else {
      const { rows: reviewRows } = await ReviewModele.getReviews(
        idToilet,
        client
      );
      const reviews = reviewRows[0];
      if (reviews !== undefined) {
        res.json(reviews);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.postReport = async (req, res) => {
  const body = req.body;
  const { reason, date, is_done, user_pseudo } = body;
  const client = await pool.connect();
  try {
    const { rows } = await ReportModele.postReport(
      reason,
      date,
      is_done,
      user_pseudo,
      client
    );
    res.status(201).send(rows[0].id);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deleteReport = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    await ReportModele.deleteReport(id, client);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
