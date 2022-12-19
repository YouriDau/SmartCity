const pool = require("../modele/database");
const ReportModele = require("../modele/reportDB");

/**
 * @swagger
 * components:
 *  schemas:
 *    Report:
 *      type: object
 *      properties:
 *        id: 
 *          type: integer
 *        reason:
 *          type: string
 *        date:
 *          type: object
 *        isDone:
 *          type: boolean
 *        userId:
 *          type: integer
 *        toiletId: 
 *          type: integer
 */

/**
 * @swagger
 *  components:
 *  responses:
 *    ReportFound:
 *      description: renvoie un report
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Report'
 */
module.exports.getReport = async (req, res) => {
  const client = await pool.connect();
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.status(400).json("report id is not a number");
    } else {
      const { rows: reports } = await ReportModele.getReport(client, id);
      const report = reports[0];
      if (report !== undefined) {
        res.json(report);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getNotDoneReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: allReports } = await ReportModele.getNotDoneReports(client);
    if (allReports !== undefined) {
      const reports = allReports.map((report) => {
        return {
          id: report.id,
          isDone: report.is_done,
          toiletId: report.toilet_id,
          date: report.date.toLocaleDateString("fr", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        };
      });
      res.json(reports);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getNotDoneReportsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getAllReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: allReports } = await ReportModele.getAllReports(client);
    if (allReports !== undefined) {
      const reports = allReports.map((report) => {
        return {
          id: report.id,
          isDone: report.is_done,
          toiletId: report.toilet_id,
          date: report.date.toLocaleDateString("fr", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        };
      });
      res.json(reports);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getAllReportsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

 /**
 * @swagger
 * components:
 *  responses:
 *    ReportAjoute:
 *      description: le report a été ajouté
 *  requestBodies:
 *    ReportAAjoute:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              reason:
 *                type: string
 *              toiletId:
 *                type: integer
 */
module.exports.postReport = async (req, res) => {
  const { reason, toiletId } = req.body;
  if (reason === undefined || toiletId === undefined) {
    res.status(400).json("reason or toiletId is undefined");
  } else {
    const userId = req.session.id;
    const client = await pool.connect();
    try {
      const { rows: reports } = await ReportModele.postReport(
        client,
        reason,
        userId,
        toiletId
      );
      const reportId = reports[0];
      if (reportId !== undefined) {
        res.status(201).json(reports[0].id);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("PostReportError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

 /**
 *@swagger
 *components:
 *  responses:
 *    ReportUpdated:
 *      description: le report a été mis à jour
 *  requestBodies:
 *    ReportAUpdate:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              reason:
 *                type: string
 *              isDone: 
 *                type: boolean
 */
module.exports.updateReport = async (req, res) => {
  const { id, reason, isDone } = req.body;
  if (id === undefined || isDone === undefined || reason === undefined) {
    res.status(400).json("report id or isDone or reason is undefined!");
  } else {
    const client = await pool.connect();
    try {
      await ReportModele.updateReport(client, id, reason, isDone);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

 /**
 * @swagger
 * components:
 *  responses:
 *    ReportDeleted:
 *      description: le report a été supprimé 
 */
module.exports.deleteReport = async (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    res.status(400).json("report id is undefined!");
  } else {
    const client = await pool.connect();
    try {
      await ReportModele.deleteReport(client, id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};
