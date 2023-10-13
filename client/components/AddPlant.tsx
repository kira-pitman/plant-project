import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPlant } from '../apis/apiClient'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const intialFormState = {
  name: '',
  height: '',
  location: '',
  facts: '',
  image: '',
}

export default function AddPlant(){
const [formValues, setFormValues] = useState(intialFormState)
  const queryClient = useQueryClient()

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
  }

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPlantMutation.mutate(formValues)
  }

  return (
    <div className="addPage">
      <div className="addForm">
        <h2>Add New Plant</h2>
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
          <br />
          <br />
          <Link to="/">
          <button type="submit" aria-label="save">
            Add
          </button></Link>
        </form>
      </div>
    </div>
  )
}