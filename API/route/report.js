const ReportControleur = require("../controleur/reportDB");
const JWTMiddleware = require("../middleware/Identification");

const Router = require("express-promise-router");
const router = new Router();

router.get("/notDone", ReportControleur.getNotDoneReports);
router.get("/all", ReportControleur.getAllReports);

/**
* @swagger
* /report/{id}:
*  get:
*   tags:
*       - Report
*   parameters:
*       - name: id
*         description: ID d'un report
*         in: path
*         required: true
*         schema:
*           type: integer
*   responses:
*       200:
*           $ref: '#/components/responses/ReportFound'
*       400:
*           description : L'id du report n'est pas un nombre
*       404:
*           description: Report non trouvé
*       500:
*           description: Erreur serveur     
 */
router.get("/:id", ReportControleur.getReport);

/**
 * @swagger
 * /report:
 *  post:
 *      tags:
 *          - Report
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ReportAAjoute'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ReportAjoute'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Le reportId est undefined
 *          500:
 *              description: Erreur serveur
 */
router.post("/", JWTMiddleware.identification, ReportControleur.postReport);

/**
 * @swagger
 * /report:
 *  put:
 *      tags:
 *          - Report
 *      requestBody:
 *          $ref: '#/components/requestBodies/ReportAUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ReportUpdated'
 *          400:
 *              description: Le reportId ou isDone ou reason est undefined
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Erreur serveur
 */
router.put("/", ReportControleur.updateReport);

 /**
 * @swagger
 * /report:
 *  delete:
 *      tags:
 *          - Report
 *      responses:
 *          204: 
 *              $ref: '#/components/responses/ReportDeleted'
 *          400:
 *              description: ReportId est undefined
 *          500:
 *              description: Erreur serveur
 */
router.delete("/", ReportControleur.deleteReport);

module.exports = router;
