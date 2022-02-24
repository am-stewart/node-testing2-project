const express = require('express');
const req = require('express/lib/request');
const dbConfig = require('../data/db-config');

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

const checkId = async (req, res, next) => {
  const project = await dbConfig('projects').where('id', req.params.id).first()
  if(project) {
    next()
  } else {
    res.status(404).json({ message: 'could not find project with that id' })
  }
}
server.get('/projects/:id', checkId, async (req, res) => {
  try {
    const project = await Projects.getById(req.params.id)
    res.status(200).json(project)
  } catch {
    console.log('err')
  }
})

server.post("/projects", async (req, res) => {
  res.status(201).json(await Projects.insert(req.body))
  .end()
});

module.exports = server