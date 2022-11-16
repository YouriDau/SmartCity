const pool = require("../modele/database");
const ToiletModele = require("../modele/toiletDB");

module.exports.getToilet = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows: toilets} = await ToiletModele.getToilet(id, client);
            const toilet = toilets[0];
            if(toilet !== undefined){
                res.json(toilet);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postToilet = async (req, res) => {
    const body = req.body;
    const {is_reduced_mobility, is_paid} = body;
    const client = await pool.connect();
    try {
        const {rows} = await ToiletModele.postToilet(is_reduced_mobility, is_paid, client);
        res.status(201).send(rows[0].id);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteToilet = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try {
        await ToiletModele.deleteToilet(id, client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}