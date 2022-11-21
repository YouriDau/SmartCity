const pool = require("../modele/database");
const ToiletModele = require("../modele/toiletDB");
const LocationModele = require("../modele/toiletLocationDB");

module.exports.getToilets = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: toilets } = await ToiletModele.getToilets(client);
    const { rows: locations } = await LocationModele.getLocations(client);

    if (toilets !== undefined && locations !== undefined) {
      toilets.forEach((toilet) => {
        toilet.location = locations.filter(
          (location) => location.toilet_id === toilet.id
        )[0];
        delete toilet.location.toilet_id;
      });
      res.json(toilets);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports.getToilet = async (req, res) => {
  const client = await pool.connect();
  const idTexte = req.params.id;
  const id = parseInt(idTexte);
  try {
    if (!isNaN(id)) {
      const { rows: toilets } = await ToiletModele.getToilet(id, client);
      const toilet = toilets[0];
      if (toilet !== undefined) {
        res.json(toilet);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
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
      isReducedMobility,
      isPaid,
      client
    );
    const toilet = toilets[0];

    const { rows: locations } = await LocationModele.postLocation(
      latitude,
      longitude,
      toilet.id,
      client
    );
    const location = locations[0];

    await client.query("COMMIT TRANSACTION");

    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK TRANSACTION");
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deleteToilet = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    await ToiletModele.deleteToilet(id, client);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
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
      await ToiletModele.updateToilet(id, isPaid, isReducedMobility, client);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};*/
