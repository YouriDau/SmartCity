require("dotenv").config();
const process = require("process");
const jwt = require("jsonwebtoken");

const pool = require("../modele/database");
const UserModel = require("../modele/userDB");

module.exports.login = async (req, res) => {
  const { pseudo, password } = req.body;
  if (pseudo === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      const result = await UserModel.getUser(client, pseudo, password);
      const { userType, value } = result;
      if (userType === "unknow") {
        res.sendStatus(404);
      } else {
        const { id, pseudo } = value;
        const payload = {
          status: userType,
          value: { id, pseudo },
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
          expiresIn: "1d",
        });
        res.status(200).json(token);
      }
    } catch (e) {
      console.error("userControllerLoginError", e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

// A voir si utile
/*
module.exports.getUserSession = async (req, res) => {
  if (req.session !== undefined) {
    let user = null;
    const client = pool.connect();
    try {
      user = await PersonModel.getPersonById(client, id);
    } catch (error) {
      console.error("getUserSessionError", error);
      res.sendStatus(401);
    } finally {
      client.release();
    }
  } else {
    res.sendStatus(401);
  }
};
*/
