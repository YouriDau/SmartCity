module.exports.getReview = async (id, client) => {
    return await client.query("SELECT * FROM review WHERE id = $1", [id]);
}

module.exports.postReview = async(note, comment, user_pseudo, toilet_id, client) => {
    return await client.query("INSERT INTO review(note, comment, user_pseudo, toilet_id) VALUES ($1,$2,$3,$4) RETURNING id", [note, comment, user_pseudo, toilet_id]);
}

module.exports.deleteReview = async(id, client) => {
    return await client.query("DELETE FROM review WHERE id = $1", [id]);
}