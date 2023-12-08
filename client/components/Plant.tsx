import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { fetchPlantById } from '../apis/apiClient'
import { useParams } from 'react-router-dom'
import { deletePlant } from '../apis/apiClient'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function PlantInfo() {
  const { getAccessTokenSilently } = useAuth0()
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

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    const token = await getAccessTokenSilently()
    e.preventDefault()
    deletePlantMutation.mutate({ id, token: token })
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
      <div className="PlantPage">
        <div className="nameImage">
          <h2>{plant?.name}</h2>
          <img
            src={plant?.image}
            alt={`${plant.name}`}
            className="individualImage"
          />
          <br />
          <Link to={`/${id}/edit`} className="toEdit">
            <button className="editButton">Edit</button>
          </Link>
          <button
            className="deleteButton"
            onClick={(e) => handleDeleteClick(e, plant.id)}
          >
            Delete
          </button>
        </div>
        <div className="plantInfo">
          <h4>Height</h4>
          <p> {plant?.height}</p>
          <h4>Location</h4>
          <p> {plant?.location}</p>
          <h4>Facts</h4>
          <p> {plant?.facts}</p>
        </div>
      </div>
    </>
  )
}
