import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPlant, fetchAllPlants, deletePlant } from '../apis/apiClient'
import { Plant, newPlant } from '../../models/plants'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const intialFormState = {
  name: '',
  height: '',
  location: '',
  facts: '',
  image: '',
}

export default function PlantList() {
  const {
    data: plantList,
    isError,
    isLoading,
  } = useQuery(['plants'], fetchAllPlants)
  console.log(plantList)

  // I know there should be a useState but I can't think of what it is >_<
  const [formValues, setFormValues] = useState(intialFormState)
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

  const addPlantMutation = useMutation(addPlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
    console.log(name, value)
  }

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPlantMutation.mutate(formValues)
  }
  // DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement
  // React.FormEventHandler<HTMLFormElement>, name: string, height: string, location: string, facts: string, image: string

  if (isError) {
    return <p>Whoops! Time to get some plants, as yours do not live here!</p>
  }

  if (!plantList || isLoading) {
    return <p>Loading plants..</p>
  }

  return (
    <>
      <h2>Ya Bois</h2>
      <div className='plantList'>
      <ul>
        {plantList.map((p: Plant, index: number) => {
          return (
            <li key={index}>
              <Link to={`/${p.id}`} style={{ textDecoration: 'none' }}> {p.name}</Link>{' '}
              <button className="deleteButton" onClick={(e) => handleDeleteClick(e, p.id)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      </div>
<h2>Add a Plant!</h2>
      <form onSubmit={handleAddClick} aria-label="Add Plant Form">
        <p>Plant Name</p>
        <input
          type="text"
          name="name"
          aria-label="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <p>Plant Height</p>
        <input
          type="text"
          name="height"
          aria-label="height"
          value={formValues.height}
          onChange={handleChange}
        />
        <p>Plant Location</p>
        <input
          type="text"
          name="location"
          aria-label="location"
          value={formValues.location}
          onChange={handleChange}
        />
        <p>Plant Facts</p>
        <input
          type="text"
          name="facts"
          aria-label="facts"
          value={formValues.facts}
          onChange={handleChange}
        />
        <p>Plant Image Link</p>
        <input
          type="text"
          name="image"
          aria-label="image"
          value={formValues.image}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <button type="submit" aria-label="save">
          Add
        </button>
      </form>
    </>
  )
}
