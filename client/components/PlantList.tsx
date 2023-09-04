import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchAllPlants } from '../apis/apiClient'
import { Plant } from '../../models/plants'

//useQuery
//also want to return plant list by mapping over everything perhaps?
// then add link to click to {'${plant.id}/${plant.name}'}

export default function PlantList() {
  const {
    data: plants,
    isError,
    isLoading,
  } = useQuery(['plants'], fetchAllPlants)

  if (isError) {
    return <p>Whoops! Time to get some plants, as yours are don't live here!</p>
  }

  if (!plants || isLoading) {
    return <p>Loading plants..</p>
  }

  return (
    <>
      <h2>All Items Available</h2>

      {plants.map((plant: Plant) => (
        <PlantListItem key={plant.id} id={plant.id} name={plant.name} />
      ))}
    </>
  )
}
