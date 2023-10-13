import express from 'express'
import * as db from '../db/plants.ts'

const router = express.Router()

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const onePlant = await db.getPlantById(id)
  res.json(onePlant)
})

router.post('/', async (req, res) => {
  const plant = req.body
  const newPlant = await db.addPlant(plant)
  res.status(200).json({ newPlant })
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await db.deletePlant(id)
  res.sendStatus(200)
})

// EDIT PLANT //
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const height = req.body.height
  const location = req.body.location
  const facts = req.body.facts
  const image = req.body.image
  await db.editPlant(id, name, height, location, facts, image)
  res.sendStatus(200)
  console.log('beep bop')
})

export default router
