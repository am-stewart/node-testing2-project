const request = require('supertest')
const db = require('../data/db-config')
const server = require('./server.js')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[GET] /projects', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/projects')
    expect(res.status).toBe(200)
  })
  it('should return json', async () => {
    const res = await request(server).get('/projects')
    expect(res.type).toBe('application/json')
  })
  it('should return a list of projects', async () => {
    const res = await request(server).get('/projects')
    expect(res.body).toHaveLength(3)
  })
})

describe('[GET] /projects/:id', () => {
  it('should return a 200 OK status', async () => {
    const res = await request(server).get('/projects/2')
    expect(res.status).toBe(200)
  })
  it('should return a 404 status if ID does not exist', async () => {
    const res = await request(server).get('/projects/7')
    expect(res.status).toBe(404)
  })
  it('should return json', async () => {
    const res = await request(server).get('/projects/1')
    expect(res.type).toBe('application/json')
  })
  it('should return project id and name', async () => {
    const res = await request(server).get('/projects/3')
    expect(res.body).toMatchObject({ id: 3, project_name: 'paint bedroom'})
  })
})

describe('[POST] /projects', () => {
  it('should respond with a 201 created status', async () => {
    const res = await request(server).post('/projects').send({ project_name: 'build patio'})
    expect(res.status).toBe(201)
  })
  it('should respond with a 422 if project_name is missing', async () => {
    const res = await request(server).post('/projects').send({ project_name: '    ' })
    expect(res.status).toBe(422)
  })
  it('responds with the newly added project', async () => {
    const res = await request(server).post('/projects').send({ project_name: 'power wash house'})
    expect(res.body).toMatchObject({ id: 4, project_name: 'power wash house'})
  })
})