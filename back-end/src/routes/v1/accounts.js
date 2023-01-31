import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { MYSQL_CONFIG } from "../../config.js";
import { jwtSecret } from "../../config.js";

export const getUserAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const userId = decryptedToken.id;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    const [userAccounts] = await connection.execute(
      `SELECT ${MYSQL_CONFIG.database}.groups.id 
      AS group_id, ${MYSQL_CONFIG.database}.groups.name 
      FROM ${MYSQL_CONFIG.database}.accounts 
      INNER JOIN ${MYSQL_CONFIG.database}.groups 
      ON accounts.group_id = ${MYSQL_CONFIG.database}.groups.id 
      WHERE ${MYSQL_CONFIG.database}.accounts.user_id = ${userId};`
    );
    await connection.end();

    return res.status(200).send(userAccounts).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

const accountSchema = Joi.object({
  group_id: Joi.number().integer().required(),
});

export const addAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;
  let accountData = req.body;

  try {
    accountData = await accountSchema.validateAsync(accountData);
  } catch (error) {
    return res.status(400).send({ error: error.message }).end();
  }

  const sendBadReqResponse = (message) => {
    res
      .status(400)
      .send({
        error: message,
      })
      .end();
  };

  if (!user_id) {
    return sendBadReqResponse(`${user_id} is not provided`);
  }

  const cleanUserId = +mysql.escape(user_id);

  if (
    typeof cleanUserId !== "number" ||
    Number.isNaN(cleanUserId || cleanUserId < 0)
  ) {
    return sendBadReqResponse("Please input user Id as a number.");
  }

  const userExistsInGroup = `SELECT * FROM ${MYSQL_CONFIG.database}.accounts 
<<<<<<< HEAD
  WHERE group_id = ${cleanGroupId} 
  AND user_id = ${user_id}`;
  const query = `INSERT INTO ${MYSQL_CONFIG.database}.accounts (group_id, user_id) 
  VALUES (${cleanGroupId}, ${cleanUserId})`;
=======
  WHERE group_id = ${accountData.group_id} 
  AND user_id = ${user_id}`;
  const query = `INSERT INTO ${MYSQL_CONFIG.database}.accounts (group_id, user_id) 
  VALUES (${accountData.group_id}, ${cleanUserId})`;
>>>>>>> 763ec601aae8abbdc0b7b377250dc3dcd65f99fd

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    const [isUserInGroup] = await connection.execute(userExistsInGroup);

    if (isUserInGroup.length && Array.isArray(isUserInGroup)) {
      return sendBadReqResponse(
        `User ${cleanUserId} is already in account number: ${accountData.group_id}.`
      );
    }

    await connection.execute(query);

    await connection.end();

    res
      .status(200)
      .send({ message: `User added to account ${accountData.group_id}.` })
      .end();
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};
