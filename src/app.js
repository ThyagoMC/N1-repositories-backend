const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs } = request.body;
  const repository = repositories.find((r) => r.id === id);
  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    response.json(repository);
  } else {
    response.status(400).json({ error: "Repository not found" });
  }
});

app.delete("/repositories/:id", (request, response) => {
  let id = request.params.id;
  let index = repositories.findIndex((r) => r.id === id);
  if (index > -1) {
    repositories.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(400).json({ error: "Repository not found" });
  }
});

app.post("/repositories/:id/like", (request, response) => {
  let id = request.params.id;
  let repository = repositories.find((r) => r.id === id);
  if (repository) {
    repository.likes++;
    response.json(repository);
  } else {
    response.status(400).json({ error: "Repository not found" });
  }
});

module.exports = app;
