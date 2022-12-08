module.exports.getLocation = async (client, toiletId) => {
  return await client.query(
    `SELECT latitude, longitude, toilet_id FROM location_toilet
     WHERE toilet_id = $1`,
    [toiletId]
  );
};

module.exports.postLocation = async (client, latitude, longitude, toiletId) => {
  return await client.query(
    `
    INSERT INTO location_toilet(latitude, longitude, toilet_id)
    VALUES($1, $2, $3)`,
    [latitude, longitude, toiletId]
  );
};

module.exports.deleteLocation = async (client, id) => {
  return await client.query("DELETE FROM location_toilet WHERE id=$1", [id]);
};
