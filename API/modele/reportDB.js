module.exports.getReport = async (id, client) => {
  return await client.query("SELECT * FROM report WHERE id = $1", [id]);
};

module.exports.postReport = async (
  reason,
  date,
  is_done,
  user_pseudo,
  client
) => {
  return await client.query(
    "INSERT INTO report(reason, date, is_done, user_pseudo) VALUES ($1,$2,$3,$4) RETURNING id",
    [reason, date, is_done, user_pseudo]
  );
};

module.exports.deleteReport = async (id, client) => {
  return await client.query("DELETE FROM report WHERE id = $1", [id]);
};

module.exports.updateReport = async (id, reason, isDone, client) => {
  return await client.query(
    "UPDATE report SET reason=$1, is_done=$2 WHERE id=$3",
    [reason, isDone, id]
  );
};
