module.exports.getReport = async (client, id) => {
  return await client.query("SELECT * FROM report WHERE id = $1", [id]);
};

module.exports.postReport = async (
  client,
  reason,
  date,
  is_done,
  user_pseudo
) => {
  return await client.query(
    "INSERT INTO report(reason, date, is_done, user_pseudo) VALUES ($1,$2,$3,$4) RETURNING id",
    [reason, date, is_done, user_pseudo]
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
