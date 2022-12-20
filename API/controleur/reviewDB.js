const pool = require("../modele/database");
const ReviewModele = require("../modele/reviewDB");

module.exports.getReviewsByToiletId = async (req, res) => {
  const toiletIdText = req.params.toiletId;
  const toiletId = parseInt(toiletIdText);

  const client = await pool.connect();
  try {
    if (!isNaN(toiletId)) {
      const { rows: reviewRows } = await ReviewModele.getReviewsByToiletId(
        client,
        toiletId
      );
      if (reviewRows !== undefined) {
        const reviews = reviewRows.map((review) => {
          return {
            id: review.id,
            note: review.note,
            comment: review.comment,
            userId: review.user_id,
            date: review.date.toLocaleDateString("fr", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }),
          };
        });
        res.json(reviews);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400).json("toilet id is not a number!");
    }
  } catch (error) {
    console.error("getReviewError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getReview = async (req, res) => {
  const idText = req.params.id;
  const id = parseInt(idText);

  const client = await pool.connect();
  try {
    if (!isNaN(id)) {
      const { rows } = await ReviewModele.getReview(client, id);
      const review = rows[0];
      if (review !== undefined) {
        //TODO: devrait générer un warning. La méthode sendStatus() envoie une réponse et la méthode json() idem
        //Tu devrais utiliser une autre méthode pour changer le status code sans envoyer la réponse
        res.status(200).json(review);
      }
    } else {
      res.status(400).json("review id is not a number!");
    }
  } catch (error) {
    console.error("mustBeAdminError", error);
  } finally {
    client.release();
  }
};

module.exports.postReview = async (req, res) => {
  const { note, comment, toiletId } = req.body;

  if (!isNaN(note) && !isNaN(toiletId)) {
    if (note !== undefined && comment !== undefined && toiletId !== undefined) {
      const client = await pool.connect();
      try {
        const { rows: reviews } = await ReviewModele.postReview(
          client,
          note,
          comment,
          req.session.id,
          toiletId
        );
        const review = reviews[0];
        res.status(201).json(review.id);
      } catch (error) {
        console.error("PostReviewError", error);
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      res.status(400).json("note or comment or toiletId is undefined!");
    }
  } else {
    res.status(400).json("note or toiletId is not a nubmer!");
  }
};

module.exports.updateReview = async (req, res) => {
  const { id, note, comment } = req.body;
  if (id !== undefined && !isNaN(id)) {
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
  } else {
    res.sendStatus(400);
  }
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.body;
  if (!isNaN(id)) {
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
  } else {
    res.sendStatus(400);
  }
};

