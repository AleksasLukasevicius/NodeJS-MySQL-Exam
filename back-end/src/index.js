import express from "express";
import cors from "cors";
import { SERVER_PORT } from "./config.js";
import { loginUser, registerUser } from "./routes/v1/authorization.js";
import { getGroups, getUserGroups, postGroup } from "./routes/v1/groups.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/authorization/register", registerUser);
app.post("/v1/authorization/login", loginUser);
app.post("/v1/groups", postGroup);

app.get("/v1/groups", getGroups);
app.get("/v1/groups/:id", getUserGroups);

app.get("/", (_, res) => {
  res.send({ message: "Server is running" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port: ${SERVER_PORT}`)
);
