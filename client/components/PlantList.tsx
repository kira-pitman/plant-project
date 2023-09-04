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
    return (
      <p>
        whoops! time to get some plants, as your&apos:s are don&apos:t live
        here!
      </p>
    )
  }

  if (!plants || isLoading) {
    return <p>Loading plants..</p>
  }

  return (
    <>
      <h2>All Items Available</h2>
      <ul>
        {plants.map((plant: Plant) => (
          <li key={plant.id}>
            <img className="plant-img" src={plant.image} alt="plants" />
            {plant.name}
            <Link to={`${plant.id}/${plant.name}'}`}></Link>

            <button id="would-not-like">No Thank You</button>
          </li>
        ))}
      </ul>
    </>
  )
}
