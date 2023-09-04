import request from 'superagent'
// import { Plant } from '../../models/plants'

export async function fetchAllPlants() {
  console.log('wahoo we made it to the api')

  const response = await request.get('/api/v1/plants')

  return response.body
}
