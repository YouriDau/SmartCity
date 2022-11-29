module.exports.getReviews = async (client, toiletId) => {
  return await client.query("SELECT * FROM review WHERE toilet_id=$1", [
    toiletId,
  ]);
};

module.exports.getReview = async (client, id) => {
  return await client.query("SELECT * FROM review WHERE id=$1 LIMIT 1", [id]);
};

module.exports.postReview = async (client, note, comment, toiletId, userId) => {
  return await client.query(
    "INSERT INTO review(note, comment, user_id, toilet_id) VALUES ($1,$2,$3,$4) RETURNING id",
    [note, comment, userId, toiletId]
  );
};

module.exports.deleteReview = async (client, id) => {
  return await client.query("DELETE FROM review WHERE id=$1", [id]);
};

module.exports.updateReview = async (client, id, note, comment) => {
  return await client.query(
    "UPDATE client SET note=$1, comment=$2 WHERE id=$3"[(note, comment, id)]
  );
};

module.exports.isReviewCreatedByUser = async (client, reviewId, userId) => {
  const { rows } = await client.query(
    `SELECT Count(*) AS nbr FROM review 
     WHERE id=$1 AND user_id=$2`,
    [reviewId, userId]
  );
  return rows[0].nbr > 0;
};
