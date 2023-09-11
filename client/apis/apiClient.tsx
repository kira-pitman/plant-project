import request from 'superagent'
import { Plant, newPlant } from '../../models/plants'

export async function fetchAllPlants() {
  console.log('wahoo we made it to the api')

  const response = await request.get('/api/v1/plants')

  return response.body
}

export async function fetchPlantById(id: number) {
  console.log('wahoo we fetching a plant by Id using apiclient')

  const response = await request.get(`/api/v1/plants/${id}`)
  const responseBody = response.body
  return responseBody

  // const response = await request.get(`/api/v1/plants/${id}`)
  // return response.body
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

export async function deletePlant({id}: DeletePlant): Promise<void>{
await request.delete(`/api/v1/plants/${id}`)
}
