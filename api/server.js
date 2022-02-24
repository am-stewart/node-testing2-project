const express = require('express');
const req = require('express/lib/request');

const Projects = require('./projects/projects-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

server.get("/projects", (req, res) => {
  Projects.getAll()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/projects", async (req, res) => {
  res.status(201).json(await Projects.insert(req.body))
  .end()
});

module.exports = server