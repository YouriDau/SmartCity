module.exports.getLocations = async (client) => {
  return await client.query(
    "SELECT latitude, longitude, toilet_id FROM location_toilet"
  );
};

module.exports.postLocation = async (latitude, longitude, toiletId, client) => {
  return await client.query(
    `INSERT INTO location_toilet(latitude, longitude, toilet_id)
       VALUES($1, $2, $3) RETURNING id`,
    [latitude, longitude, toiletId]
  );
};
