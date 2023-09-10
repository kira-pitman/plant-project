import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPlant, fetchAllPlants, deletePlant } from '../apis/apiClient'
import { Plant, newPlant } from '../../models/plants'
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default function PlantList() {
  const {
    data: plantList,
    isError,
    isLoading,
  } = useQuery(['plants'], fetchAllPlants)
  console.log(plantList)

// I know there should be a useState but I can't think of what it is >_<
  const queryClient = useQueryClient()

  const deletePlantMutation = useMutation(deletePlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
    }
  })

    const handleDeleteClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
      e.preventDefault()
      deletePlantMutation.mutate({id})
      console.log(e, id)
    }

  // want to add an add plant form? with a save button
  // const [editing, setEditing] = useState(false)
  // const [text, setText] = useState(plantList.name)
  // const queryClient = useQueryClient()

  // const addPlantMutation = useMutation(addPlant, {
  //   onSuccess: async () => {
  //     queryClient.invalidateQueries(['plants'])
  //   },
  // })

  // const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   addPlantMutation.mutate({
  //     //idk what to mutate in here
  //   })
  // }

  

  if (isError) {
    return <p>Whoops! Time to get some plants, as yours do not live here!</p>
  }

  if (!plantList || isLoading) {
    return <p>Loading plants..</p>
  }

  return (
    <>
      <h2>Ya bois</h2>
      {deletePlantMutation.isError && <p>its not working yikes</p>}
      <ul>
        {plantList.map((p: Plant, index: number) => {
          return (
            <li key={index}>
              <Link to={`/${p.id}`}> {p.name}</Link> <button onClick={(e) => handleDeleteClick(e, p.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
{/* put a form in here which has submit  */}
<button>Add new plant</button>
      {/* add plant form? */}
    </>
  )
}
