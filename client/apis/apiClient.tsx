import request from 'superagent'
import { Plant, newPlant, DeletePlant } from '../../models/plants'

export async function fetchAllPlants(token: string) {
  const response = await request.get('/api/v1/plants')
  .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function fetchPlantById(id: number, token: string) {
  const response = await request.get(`/api/v1/plants/${id}`)
  .set('Authorization', `Bearer ${token}`)
  const responseBody = response.body
  return responseBody
}

export async function addPlant({
  name,
  height,
  location,
  facts,
  image,
  token,
}: newPlant): Promise<void> {
  await request
    .post('/api/v1/plants')
    .set('Authorization', `Bearer ${token}`)
    .send({ name, height, location, facts, image })
}

export async function deletePlant({ id, token }: DeletePlant): Promise<void> {
  await request.delete(`/api/v1/plants/${id}`)
  .set('Authorization', `Bearer ${token}`)
}

export async function editPlant({
  id,
  name,
  height,
  location,
  facts,
  image,
  token
}: Plant): Promise<void> {
  await request
    .post(`/api/v1/plants/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ name, height, location, facts, image })
}
