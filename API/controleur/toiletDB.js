const pool = require("../modele/database");
const ToiletModele = require("../modele/toiletDB");
const LocationModele = require("../modele/toiletLocationDB");

module.exports.getToiletsAndLocation = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: toiletRows } = await ToiletModele.getToilets(client);
    if (toiletRows !== undefined) {
      const toilets = toiletRows.map((toilet) => {
        return {
          id: toilet.id,
          isPaid: toilet.is_paid,
          isReducedMobility: toilet.is_reduced_mobility,
          location: {
            latitude: toilet.latitude,
            longitude: toilet.longitude,
          },
        };
      });
      console.log(toilets);
      res.json(toilets);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getToiletsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getToilet = async (req, res) => {
  const client = await pool.connect();
  const idText = req.params.id;
  const id = parseInt(idText);
  try {
    if (!isNaN(id)) {
      const { rows } = await ToiletModele.getToilet(client, id);
      const toilet = rows[0];
      if (toilet !== undefined) {
        res.json(toilet);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(203);
    }
  } catch (error) {
    console.error("getToiletError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.postToilet = async (req, res) => {
  const { latitude, longitude, isReducedMobility, isPaid } = req.body;
  const client = await pool.connect();
  try {
    await client.query("START TRANSACTION");
    const { rows: toilets } = await ToiletModele.postToilet(
      client,
      isReducedMobility,
      isPaid
    );
    const toiletId = toilets[0].id;

    await LocationModele.postLocation(client, latitude, longitude, toiletId);

    await client.query("COMMIT TRANSACTION");

    res.status(201).json(toiletId);
  } catch (error) {
    await client.query("ROLLBACK TRANSACTION");
    console.error("postToiletError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deleteToilet = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    await ToiletModele.deleteToilet(client, id);
    res.sendStatus(204);
  } catch (error) {
    console.error("deleteToiletError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

/*module.exports.updateToilet = async (req, res) => {
  const { id, isPaid, isReducedMobility } = req.body;
  const client = await pool.connect();
  try {
    if (!isNaN(id)) {
      await ToiletModele.updateToilet(client, id, isPaid, isReducedMobility);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("updateToiletError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};*/
