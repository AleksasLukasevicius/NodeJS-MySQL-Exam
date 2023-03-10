import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
import { loginUser, registerUser } from "./routes/v1/authorization.js";
import { addGroup, getGroups, getUserGroups } from "./routes/v1/groups.js";
import { addAccount, getUserAccounts } from "./routes/v1/accounts.js";
import { addBill, getGroupBills } from "./routes/v1/bills.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/authorization/register", registerUser);
app.post("/v1/authorization/login", loginUser);
app.post("/v1/groups", addGroup);
app.post("/v1/accounts", addAccount);
app.post("/v1/bills", addBill);

app.get("/v1/groups", getGroups);
app.get("/v1/user-groups/", getUserGroups);
app.get("/v1/accounts", getUserAccounts);
app.get("/v1/bills/:group_id", getGroupBills);

app.get("/", (_, res) => {
  res.send({ message: "Server is running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port: ${SERVER_PORT}`)
);
