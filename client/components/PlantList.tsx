import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAllPlants } from '../apis/apiClient'
import { Plant } from '../../models/plants'

//useQuery
//also want to return plant list by mapping over everything perhaps?
// then add link to click to {'${plant.id}/${plant.name}'}

export default function PlantList() {
  const {
    data: plantList,
    isError,
    isLoading,
  } = useQuery(['plant'], fetchAllPlants)
  console.log(plantList)

  if (isError) {
    return <p>Whoops! Time to get some plants, as yours do not live here!</p>
  }

  if (!plantList || isLoading) {
    return <p>Loading plants..</p>
  }

  return (
    <>
      <h2>Ya bois</h2>
      <ul>
        {plantList.map((p: Plant) => {
          <li key={p.id}>{p.name}</li>
        })}
      </ul>
    </>
  )
}
