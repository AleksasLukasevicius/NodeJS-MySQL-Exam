import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config.js";

export const getTutorials = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  let payload = null;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);

        const [result] = await con.execute(
          "SELECT * FROM tutorials WHERE isPrivate=0"
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

    const [result] = await con.execute("SELECT * FROM tutorials");

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getUserTutorials = async (req, res) => {
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
      `SELECT * FROM tutorials WHERE user_id=${cleanId}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const postTutorial = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  const { title, content } = req.body;

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

  if (!title || !content) {
    return sendBadReqResponse(
      "Please input all data for tutorial: title and content!"
    );
  }

  const cleanTitle = mysql.escape(req.body.title?.trim());

  const cleanContent = mysql.escape(req.body.content?.trim());

  if (typeof cleanTitle !== "string" || typeof cleanContent !== "string") {
    return sendBadReqResponse("Please input title and content as a string!");
  }

  const query = `INSERT INTO tutorials (user_id, title, content) VALUES (${payload.id}, ${cleanTitle}, ${cleanContent})`;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(query);

    await con.end();

    res.status(200).send("Provided data was inserted into table");
  } catch (err) {
    res.status(500).send(err).end();
    return console.error(err);
  }
};
