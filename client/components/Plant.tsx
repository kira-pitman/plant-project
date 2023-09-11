import { useQuery } from '@tanstack/react-query'
import { fetchPlantById } from '../apis/apiClient'
import { useParams } from 'react-router-dom'
import { Plant } from '../../models/plants'

export default function PlantInfo() {
  const id = Number(useParams().id)
  const {
    data: plant,
    isLoading,
    error,
  } = useQuery(['plant'], () => fetchPlantById(id))

  if (isLoading) {
    return <p>Still loading ya boi</p>
  }

  if (error) {
    return <p>Whoops! Your plant is no longer here!</p>
  }

  return (
    <>
      <div>
        <h2>{plant?.name}</h2>
        <img src={plant?.image} alt={`${plant.name}`}/>
        <h3>Height</h3>
        <p> {plant?.height}</p>
        <h3>Location</h3>
        <p> {plant?.location}</p>
        <h3>Facts</h3>
        <p> {plant?.facts}</p>
      </div>
    </>
  )
}
