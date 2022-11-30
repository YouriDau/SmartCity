module.exports.getReport = async (client, id) => {
  return await client.query("SELECT * FROM report WHERE id = $1", [id]);
};

module.exports.postReport = async (client, reason, userId, toiletId) => {
  return await client.query(
    "INSERT INTO report(reason, user_id, toilet_id) VALUES ($1,$2,$3) RETURNING id",
    [reason, userId, toiletId]
  );
};

module.exports.deleteReport = async (client, id) => {
  return await client.query("DELETE FROM report WHERE id = $1", [id]);
};

module.exports.updateReport = async (client, id, reason, isDone) => {
  return await client.query(
    "UPDATE report SET reason=$1, is_done=$2 WHERE id=$3",
    [reason, isDone, id]
  );
};
