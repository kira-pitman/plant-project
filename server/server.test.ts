import { test, expect } from 'vitest'
import request from 'supertest'

import server from './server.ts'

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

// test('/hb serves a custom greeting', async () => {
//   // ARRANGE
//   // ACT
//   const response = await request(server)
//     .post('/hb')
//     .set('Content-Type', 'application/x-www-form-urlencoded')
//     .send('user=Gerard&comment=How+is+your+day')

//   // ASSERT
//   expect(response.statusCode).toBe(200)
//   expect(response.text).toMatch(/Happy birthday Gerard! How is your day/)
// })
