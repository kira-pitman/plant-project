import request from 'superagent'

export async function fetchAllPlants(){
  console.log('wahoo we made it to the api')

  const response = await request.get('/api/v1/plants')

  return response.body
}

export async function fetchPlantById(id: number) {
  console.log('wahoo we fetching a plant by Id using apiclient')
  
const response =  await request.get(`/api/v1/plants/${id}`)
const responseBody = response.body
console.log('response body', responseBody)
return responseBody



  // const response = await request.get(`/api/v1/plants/${id}`)
  // return response.body
}
