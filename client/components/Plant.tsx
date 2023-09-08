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
  console.log(plant)

  if (isLoading) {
    return <p>Still loading ya boi</p>
  }

  if (error) {
    return <p>Whoops! Your plant is no longer here!</p>
  }

  return (
    <>
      <div>
        {/* want to return all plant info: name, height, location, fact, image */}
        <h1>{plant?.name}</h1>
        <img src={plant?.image} alt={plant?.name} />
        <h2>Height</h2>
        {plant?.map((p: Plant, index: number) => {
          return <li key={index}>{p.height}</li>
        })}

        <h2>Location</h2>
        {plant?.map((p: Plant, index: number) => {
          return <li key={index}>{p.location}</li>
        })}
        <h2>Fact</h2>
        {plant?.map((p: Plant, index: number) => {
          return <li key={index}>{p.facts}</li>
        })}
      </div>
    </>
  )
}
