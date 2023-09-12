import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { fetchPlantById } from '../apis/apiClient'
import { useParams } from 'react-router-dom'
import { deletePlant } from '../apis/apiClient'

export default function PlantInfo() {
  const id = Number(useParams().id)
  const {
    data: plant,
    isLoading,
    error,
  } = useQuery(['plant'], () => fetchPlantById(id))

  const queryClient = useQueryClient()

  const deletePlantMutation = useMutation(deletePlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
    },
  })

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    deletePlantMutation.mutate({ id })
  }

  if (isLoading) {
    return <p>Still loading ya boi</p>
  }

  if (error) {
    return <p>Whoops! Your plant is no longer here!</p>
  }

  return (
    <>
      <h3>{plant?.name}</h3>
      <img src={plant?.image} alt={`${plant.name}`} />
      <h3>Height:</h3>
      <p> {plant?.height}</p>
      <h3>Location:</h3>
      <p> {plant?.location}</p>
      <h3>Facts:</h3>
      <p> {plant?.facts}</p>
      <br />
      <button
        className="deleteButton"
        onClick={(e) => handleDeleteClick(e, plant.id)}
      >
        Delete
      </button>
    </>
  )
}
