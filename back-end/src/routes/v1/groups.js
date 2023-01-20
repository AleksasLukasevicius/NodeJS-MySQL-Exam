import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config.js";

export const getGroups = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  let payload = null;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);

        const [result] = await con.execute(
          "SELECT * FROM groups WHERE isPrivate=0"
        );

        await con.end();

        return res.status(200).send(result).end();
      } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
      }
    }
    return res.status(400).send(error).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [result] = await con.execute("SELECT * FROM groups");

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getUserGroups = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const id = mysql.escape(req.params.id.trim());
  const cleanId = +id.replaceAll("'", "");

  if (cleanId < 0 || Number.isNaN(cleanId) || typeof cleanId !== "number") {
    return res
      .status(400)
      .send({
        error: `Please provide a proper id in the URL: current id ${cleanId} incorrect.`,
      })
      .end();
  }

  let payload = null;

  if (!token) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [result] = await con.execute(
      `SELECT * FROM groups WHERE user_id=${cleanId}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const postGroup = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { name } = req.body;

  let payload = null;

  if (!token) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  const sendBadReqResponse = (message) => {
    res
      .status(400)
      .send({
        error: message,
      })
      .end();
  };

  if (!name) {
    return sendBadReqResponse("Please input group name.");
  }

  const cleanName = mysql.escape(req.body.name?.trim());

  if (typeof cleanName !== "string") {
    return sendBadReqResponse("Please input group name as a string.");
  }

  const query = `INSERT INTO groupsdb.groups (name) VALUES (${cleanName})`;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    await connection.execute(query);

    await connection.end();

    res
      .status(200)
      .send({ message: `Group ${cleanName} was added` })
      .end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
