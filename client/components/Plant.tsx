import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { fetchPlantById } from '../apis/apiClient'
import { useParams } from 'react-router-dom'
import { deletePlant } from '../apis/apiClient'
import { Link } from 'react-router-dom'

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
    <div className='PlantPage'>
    <div className='nameImage'>
      <h2>{plant?.name}</h2>
      <img src={plant?.image} alt={`${plant.name}`} className="individualImage" />
      </div>
      <div className='plantInfo'>
      <h4>Height</h4>
      <p> {plant?.height}</p>
      <h4>Location</h4>
      <p> {plant?.location}</p>
      <h4>Facts</h4>
      <p> {plant?.facts}</p>
      </div>
      </div>
      <div className='buttons'>
      <button
        className="deleteButton"
        onClick={(e) => handleDeleteClick(e, plant.id)}
      >
        Delete
      </button>
      <Link to={`/${id}/edit`} className="toEdit">
        <button className="editButton">Edit</button>
      </Link>
      </div>
    </>
  )
}
