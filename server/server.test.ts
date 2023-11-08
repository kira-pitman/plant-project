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
