import request from 'superagent'
import { Plant, newPlant } from '../../models/plants'

export async function fetchAllPlants() {
  const response = await request.get('/api/v1/plants')
  return response.body
}

export async function fetchPlantById(id: number) {
  const response = await request.get(`/api/v1/plants/${id}`)
  const responseBody = response.body
  return responseBody
}

export async function addPlant({
  name,
  height,
  location,
  facts,
  image,
}: newPlant): Promise<void> {
  await request
    .post('/api/v1/plants')
    .send({ name, height, location, facts, image })
}

interface DeletePlant {
  id: Plant['id']
}

export async function deletePlant({ id }: DeletePlant): Promise<void> {
  await request.delete(`/api/v1/plants/${id}`)
}

export async function editPlant({
  id,
  name,
  height,
  location,
  facts,
  image,
}: Plant): Promise<void> {
  await request
    .post(`/api/v1/plants/${id}`)
    .send({ name, height, location, facts, image })
}
