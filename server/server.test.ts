import request from 'supertest'

import {
  describe,
  it,
  expect,
  test,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'

import server from './server.js'
import connection from './db/connection.ts'

vi.useFakeTimers()
vi.setSystemTime(1692584552520)

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

// DB //

describe('GET /4 returns pothos page', () => {
  it('displays all pothos data', async () => {
    const res = await request(server).get('/api/v1/plants/4')
    expect(res.body).toContain(/variegation/)
  })
})

//  "facts": "Has white variegation",
// "height": "15cm",
// "location": "Indoor",

it("responds with 404 if the post doesn't exist", async () => {
  const res = await request(server).get('/api/v1/posts/127/comments')
  expect(res.body).toEqual({})
})

// SERVER //

test('/ has a title', async () => {
  // ARRANGE
  // ACT
  const response = await request(server).get('/')
  // ASSERT
  expect(response.text).toContain('DOCTYPE')
})

test('/wrong-url responds with a 404', async () => {
  const response = await request(server).get('/wrong-url')
  expect(response.statusCode).toBe(404)
})
