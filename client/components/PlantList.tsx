import { useQuery } from '@tanstack/react-query'
import { fetchAllPlants } from '../apis/apiClient'
import { Plant } from '../../models/plants'
import { Link } from 'react-router-dom'

export default function PlantList() {
  const {
    data: plantList,
    isError,
    isLoading,
  } = useQuery(['plants'], fetchAllPlants)

  if (isError) {
    return <p>Whoops! Time to get some plants, as yours do not live here!</p>
  }

  if (!plantList || isLoading) {
    return (
      <div className="loadingContainer">
        <img
          className="loading-icon"
          alt="loading icon"
          src="./loading-larger.png"
        ></img>
        <p className="loading">Plants are growing!</p>{' '}
      </div>
    )
  }

  return (
    <>
      <div className="homepage">
        <div className="plantList">
          <ul>
            {plantList.map((p: Plant, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/${p.id}`} style={{ textDecoration: 'none' }}>
                    {' '}
                    {p.name}
                  {/* </Link>{' '} */}
                  <br />
                  <br />
                  {/* <Link to={`/${p.id}`} style={{ textDecoration: 'none' }}> */}
                    <img
                      className="homeImage"
                      src={p?.image}
                      alt={`a close up of ${p.name} showing identifiable features`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <>
        <Link to="/add" className="toAdd">
          <h4>Add a new plant</h4>
        </Link>
      </>
    </>
  )
}
