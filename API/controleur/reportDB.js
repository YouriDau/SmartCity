const pool = require("../modele/database");
const ReportModele = require("../modele/reportDB");

module.exports.getAllReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: reports } = await ReportModele.getAllReports(client);
    const allReports = reports;
    if (allReports !== undefined) {
      allReports.forEach((report) => {
        report.isDone = report.is_done;
        report.toiletId = report.toilet_id;
        report.userId = report.userId;
        report.date = report.date.toLocaleDateString("fr", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        delete report.is_done;
        delete report.toilet_id;
        delete report.user_id;
      });
      res.json(allReports);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getAllReportsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
}

module.exports.getNotDoneReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: reports } = await ReportModele.getNotDoneReports(client);
    const allReports = reports;
    if (allReports !== undefined) {
      allReports.forEach((report) => {
        report.isDone = report.is_done;
        report.toiletId = report.toilet_id;
        report.userId = report.userId;
        report.date = report.date.toLocaleDateString("fr", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        delete report.is_done;
        delete report.toilet_id;
        delete report.user_id;
      });
      res.json(allReports);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getNotDoneReportsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
}

module.exports.getReport = async (req, res) => {
  const client = await pool.connect();
  const idTexte = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idTexte);
  try {
    if (isNaN(id)) {
      res.sendStatus(400);
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

module.exports.postReport = async (req, res) => {
  const { reason, toiletId } = req.body;
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
};

module.exports.deleteReport = async (req, res) => {
  const { id } = req.body;
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
};

/*
module.exports.updateReport = async (req, res) => {
  const { id, reason, isDone } = req.body;
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
};
*/
