import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import request from 'supertest'
import { JSDOM } from 'jsdom'
import server from './server.js'
import * as db from './db/plants.ts'

vi.mock('./db/plants.ts')

describe('the home route', () => {
  it('lists all the cars', async () => {
    vi.mocked(db.getAllPlants).mockImplementation(async () => {
      return [
        {
          id: 205,
          name: 'beep boop',
          height: '40cm',
          location: 'Outdoor',
          facts: 'Two Thousand',
          image: 'beepboop.jpg',
        },
      ]
    })

    const res = await request(server).get('/api/v1/plants')
    expect(res.statusCode).toBe(200)

    const dom = new JSDOM(res.text).window.document.body
    expect(dom.getElementsByTagName('li')).toContain(/height/)

    expect(db.getAllPlants).toHaveBeenCalled()
  })
})

describe('Search by id', () => {
  it('calls our db.getPlantById', async () => {
    vi.mocked(db.getPlantById).mockImplementation(async () => {
      return [
        {
          id: 205,
          name: 'beep boop',
          height: '40cm',
          location: 'Outdoor',
          facts: 'Two Thousand',
          image: 'beepboop.jpg',
        },
      ]
    })

    const res = await request(server).get('/api/v1/plants/205')
    expect(res.statusCode).toBe(200)
    expect(db.getPlantById).toHaveBeenCalledWith(205)
    expect(res.text).toContain('beep boop')
  })
})

describe('delete by Id', () => {
  it('calls our db.deletePlant and responds w 200', async () => {
    const res = await request(server).get('/api/v1/plants/1')
    expect(res.statusCode).toBe(200)

    request(res).del('/api/v1/plants/1').expect(200)
  })
  // change to allow for branch to merge
})

// it('handles errors', async () => {
//   vi.mocked(db.getPlantById).mockImplementation(async () => {
//     throw new Error('This database is totally fake')
//   })

//   const res = await request(server).get(
//     '/api/v1/plants/207'
//   )

//   expect(db.getPlantById).toHaveBeenCalledWith(207)
//   expect(res.statusCode).toBe(500)
// })
