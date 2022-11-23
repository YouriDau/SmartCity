module.exports.getToilets = async (client) => {
  return await client.query("SELECT * FROM toilet");
};

module.exports.getToilet = async (id, client) => {
  return await client.query(
    "SELECT id, is_reduced_mobility, is_paid FROM toilet WHERE id = $1 LIMIT 1",
    [id]
  );
};

module.exports.postToilet = async (is_reduced_mobility, is_paid, client) => {
  return await client.query(
    "INSERT INTO toilet(is_reduced_mobility, is_paid) VALUES ($1,$2) RETURNING id",
    [is_reduced_mobility, is_paid]
  );
};

module.exports.deleteToilet = async (id, client) => {
  return await client.query("DELETE FROM person WHERE id = $1", [id]);
};

module.exports.updateToilet = async (id, isPaid, isReducedMobility, client) => {
  return await client.query(
    "UPDATE toilet SET is_paid=$1, is_reduced_mobility=$2 WHERE id=$3",
    [isPaid, isReducedMobility, id]
  );
};
