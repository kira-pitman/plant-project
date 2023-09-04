import request from "superagent"

export async function fetchAllPlants() {
  console.log('wahoo we made it to the api')
  const response = await request.get('/api/v1/plants')
  return response.body
}