import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPlant, fetchAllPlants } from '../apis/apiClient'
import { Plant, newPlant } from '../../models/plants'
import { Link } from 'react-router-dom'
import { useState } from 'react'

//useQuery
//also want to return plant list by mapping over everything perhaps?
// then add link to click to {'${plant.id}/${plant.name}'}

export default function PlantList() {
  const {
    data: plantList,
    isError,
    isLoading,
  } = useQuery(['plants'], fetchAllPlants)
  console.log(plantList)

  // want to add an add plant form? with a save button
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(plantList.name)
  const queryClient = useQueryClient()

  const addPlantMutation = useMutation(addPlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
    },
  })

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPlantMutation.mutate({
      //idk what to mutate in here
    })
  }

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
        {plantList.map((p: Plant, index: number) => {
          return (
            <li key={index}>
              <Link to={`/${p.id}`}> {p.name}</Link>
            </li>
          )
        })}
      </ul>

      {/* add plant form? */}
    </>
  )
}
