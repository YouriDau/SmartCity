module.exports.getAllPersons = async (client) => {
  return await client.query("SELECT * FROM person",);
};

module.exports.getPerson = async (id, client) => {
  return await client.query("SELECT * FROM person WHERE id = $1", [id]);
};

module.exports.postPerson = async (
  pseudo,
  last_name,
  first_name,
  email,
  is_admin,
  client
  ) => {
  return await client.query(
    "INSERT INTO person(pseudo, last_name, first_name, email, is_admin) VALUES ($1,$2,$3,$4,$5)",
    [pseudo, last_name, first_name, email, is_admin]
  );
};

module.exports.deletePerson = async (id, client) => {
  return await client.query("DELETE FROM person WHERE id = $1", [id]);
};
