module.exports.getToilets = async (client) => {
  return await client.query(`
  SELECT
    t.id id,
    t.is_reduced_mobility is_reduced_mobility,
    t.is_paid is_paid,
    l.latitude latitude,
    l.longitude longitude
  FROM toilet t
  INNER JOIN location_toilet l
    ON t.id = l.id
  WHERE t.id = 1;
    `);
};

module.exports.getToilet = async (client, id) => {
  return await client.query(
    "SELECT id, is_reduced_mobility, is_paid FROM toilet WHERE id = $1 LIMIT 1",
    [id]
  );
};

module.exports.postToilet = async (client, is_reduced_mobility, is_paid) => {
  return await client.query(
    "INSERT INTO toilet(is_reduced_mobility, is_paid) VALUES ($1,$2) RETURNING id",
    [is_reduced_mobility, is_paid]
  );
};

module.exports.deleteToilet = async (client, id) => {
  return await client.query("DELETE FROM person WHERE id = $1", [id]);
};

module.exports.updateToilet = async (client, id, isPaid, isReducedMobility) => {
  return await client.query(
    "UPDATE toilet SET is_paid=$1, is_reduced_mobility=$2 WHERE id=$3",
    [isPaid, isReducedMobility, id]
  );
};
