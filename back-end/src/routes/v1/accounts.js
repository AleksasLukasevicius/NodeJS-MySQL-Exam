import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG } from "../../config.js";
import { jwtSecret } from "../../config.js";

// export const getGroups = async (req, res) => {
//   try {
//     const connection = await mysql.createConnection(MYSQL_CONFIG);

//     const [groups] = await connection.execute("SELECT * FROM groupsdb.groups");

//     await connection.end();

//     return res.status(200).send(groups).end();
//   } catch (error) {
//     res.status(500).send(error).end();

//     return console.error(error);
//   }
// };

export const getUserAccounts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;

  // if (cleanId < 0 || Number.isNaN(cleanId) || typeof cleanId !== "number") {
  //   return res
  //     .status(400)
  //     .send({
  //       error: `Please provide a proper id in the URL: current id ${cleanId} incorrect.`,
  //     })
  //     .end();
  // }

  // let payload = null;

  // if (!token) {
  //   return res.status(401).send({ error: "User unauthorised" }).end();
  // }

  // try {
  //   payload = jwt.verify(token, jwtSecret);
  // } catch (error) {
  //   if (error instanceof jwt.JsonWebTokenError) {
  //     return res.status(401).send({ error: "User unauthorised" }).end();
  //   }
  //   return res.status(400).end();
  // }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    const [result] = await connection.execute(
      `SELECT groupsdb.groups.id AS group_id, groupsdb.groups.name FROM accounts INNER JOIN groupsdb.groups ON accounts.group_id = groups.id WHERE accounts.user_id = ${user_id}`
    );

    await connection.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const postAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decryptedToken = jwt.verify(token, jwtSecret);
  const user_id = decryptedToken.id;
  const { group_id } = req.body;

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

  if (!group_id) {
    return sendBadReqResponse("Please input group name.");
  }

  if (!user_id) {
    return sendBadReqResponse(`${user_id} is not provided`);
  }

  const cleanGroupId = +mysql.escape(req.body?.group_id);
  const cleanUserId = +mysql.escape(user_id);

  if (
    typeof cleanGroupId !== "number" ??
    Number.isNaN(cleanGroupId ?? cleanGroupId < 0)
  ) {
    return sendBadReqResponse("Please input group Id as a number.");
  }

  if (
    typeof cleanUserId !== "number" ??
    Number.isNaN(cleanUserId ?? cleanUserId < 0)
  ) {
    return sendBadReqResponse("Please input user Id as a number.");
  }

  const userExistsInGroup = `SELECT * FROM groupsdb.accounts WHERE group_id = ${cleanGroupId} AND user_id = ${user_id}`;
  const query = `INSERT INTO groupsdb.accounts (group_id, user_id) VALUES (${cleanGroupId}, ${cleanUserId})`;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    const [isUserInGroup] = await connection.execute(userExistsInGroup);

    if (!isUserInGroup) {
      return sendBadReqResponse(
        `User is already in group number: ${cleanGroupId}.`
      );
    }

    await connection.execute(query);

    await connection.end();

    res
      .status(200)
      .send({ message: `User added to group ${cleanGroupId}.` })
      .end();
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};
