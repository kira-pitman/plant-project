import { Plant, newPlant } from '../../models/plants.ts'
import db from './connection.ts'

export async function getAllPlants(): Promise<Plant[]> {
  return await db('plants').select('*')
}

export async function getPlantById(id: number){
  return await db('plants').where('id', id).select().first()
}

export async function deletePlant(id: number) {
  return await db('plants').where({id}).delete()
}

export async function addPlant(plant: newPlant) {
  return db('plants').insert(plant).returning(['id', 'name', 'height', 'location', 'facts', 'image'])
}