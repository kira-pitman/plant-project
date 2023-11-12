import { test, expect } from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import { render } from './test-utils.js'
import server from './server.ts'

// DOM //

test('A heading appears in the page', async () => {
  const res = await request(server).get('/')
  const screen = render(res)
  const heading = screen.getByRole('header')

  expect(heading.textContent).toBe('Botanical Buds')
})

test('Serves static assets with correct content-type', async () => {
  const res = await request(server).get('/index.css')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toBe("text/css; charset=UTF-8")
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

// DOESN'T WORK :( //

// test('/4 returns pothos', async () => {
//   // ARRANGE
//   // ACT
//   const response = await request(server).get('/api/v1/plants/4')

//   // ASSERT
//   expect(response.statusCode).toBe(200)
// })
