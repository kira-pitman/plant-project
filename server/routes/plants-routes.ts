import express from 'express'
import * as db from '../db/plants.ts'
// import { getPlantById } from '../db/plants.ts'

const router = express.Router()

// call getPlants from database
// return JSON array of all item objects

router.get('/', async (req, res) => {
  console.log('Yahoo! You made it to the server')
  try {
    const allPlants = await db.getAllPlants()
    res.json(allPlants)
  } catch (error) {
    res
      .status(500)
      .send(
        'whoops! time to get some plants, as your&apos:s don&apos:t live here!'
      )
  }
})

router.get('/:id/', (req, res) => {
  console.log('server')
  try{
    const id = Number(req.params.id)
    db.getPlantById(id).then((plants) => {
      res.json(plants)
    })}
    catch(error)
 
})

// POST /api/vi/plants
// use req.body and pass to db addPlant query
// use

export default router
