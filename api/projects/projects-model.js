const db = require('../../data/db-config')

function getAll() {
  return db('projects')
}

function getById(id) {
  return db('projects').where('id', id).first()
}

async function insert(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => {
      return getById(id)
    })
}

module.exports = {
  getAll,
  getById,
  insert
}