module.exports.getToilet = async (id, client) => {
    return await client.query("SELECT * FROM toilet WHERE id = $1", [id]);
}

module.exports.postToilet = async(is_reduced_mobility, is_paid, client) => {
    return await client.query("INSERT INTO toilet(is_reduced_mobility, is_paid) VALUES ($1,$2) RETURNING id", [is_reduced_mobility, is_paid]);
}

module.exports.deleteToilet = async(id, client) => {
    return await client.query("DELETE FROM person WHERE id = $1", [id]);
}