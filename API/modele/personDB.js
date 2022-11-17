module.exports.getAllPersons = async (client) => {
  return await client.query("SELECT * FROM person");
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
    `INSERT INTO person(pseudo, last_name, first_name, email, is_admin)
     VALUES ($1,$2,$3,$4,$5)`,
    [pseudo, last_name, first_name, email, is_admin]
  );
};

module.exports.updatePerson = async (
  id,
  pseudo,
  last_name,
  first_name,
  email,
  is_admin,
  password,
  client
) => {
  return await client.query(
    `UPDATE person 
     SET pseudo=$1, last_name=$2, first_name=$3, email=$4, is_admin=$5, password=$6 
     WHERE id=$7`,
    [pseudo, last_name, first_name, email, is_admin, password, id]
  );
};

module.exports.deletePerson = async (id, client) => {
  return await client.query("DELETE FROM person WHERE id = $1", [id]);
};
