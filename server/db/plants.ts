import { Plant } from '../../models/plants.ts'
import db from './connection.ts'

export async function getAllPlants(): Promise<Plant[]> {
  return await db('plants').select('*')
}

export async function getPlantById(id: number){
  return await db('plants').where('id', id).select().first()
}