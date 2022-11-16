const pool = require("../modele/database");
const ReportModele = require("../modele/reportDB");

module.exports.getReport = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows: reports} = await ReportModele.getReport(id, client);
            const report = reports[0];
            if(report !== undefined){
                res.json(report);
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

module.exports.postReport = async (req, res) => {
    const body = req.body;
    const {reason, date, is_done, user_pseudo} = body;
    const client = await pool.connect();
    try {
        const {rows} = await ReportModele.postReport(reason, date, is_done, user_pseudo, client);
        res.status(201).send(rows[0].id);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteReport = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try {
        await ReportModele.deleteReport(id, client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}