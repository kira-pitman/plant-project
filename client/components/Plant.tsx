import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { fetchPlantById } from '../apis/apiClient'
import { useParams } from 'react-router-dom'
import { deletePlant, editPlant } from '../apis/apiClient'

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

  const editPlantMutation = useMutation(editPlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
    }
  })

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    deletePlantMutation.mutate({ id })
  }

  const handleEditClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    editPlantMutation.mutate({id})
  }

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <img
          className="loading-icon"
          alt="loading icon"
          src="./loading-larger.png"
        ></img>
        <p className="loading">Plants growing!</p>{' '}
      </div>
    )
  }

  if (error) {
    return <p>Whoops! Your plant is no longer here!</p>
  }

  return (
    <>
      <h3>{plant?.name}</h3>
      <img src={plant?.image} alt={`${plant.name}`} className='homeImage' />
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
      <button className="editButton"
      onClick={(e) => handleEditClick(e, plant.id)}
    </>
  )
}
