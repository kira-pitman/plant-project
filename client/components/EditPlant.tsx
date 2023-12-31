import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editPlant } from '../apis/apiClient'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

// PSEUDOCODE //
// want to show a form
// want form to have name, height, location, facts, image (image can be stretch as need to figure out how to upload)
// want to click button at bottom (i.e. update ur plant) that will be a submit button type, and it will update the database
// have to make each field compulsory, and have initial state be that which is in the database already

//get this to be the info for the plant page we're on
const intialFormState = {
  id: Number(''),
  name: ``,
  height: '',
  location: '',
  facts: '',
  image: '',
}

export default function Editing() {
  const [formValues, setFormValues] = useState(intialFormState)
  const queryClient = useQueryClient()

  const editPlantMutation = useMutation(editPlant, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['plants'])
      console.log('beep boop')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }

  const handleEditClick = async (e: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently();
    e.preventDefault()
    editPlantMutation.mutate(formValues, token)
  }

  return (
    <>
      <h1>Prune your plant!</h1>

      <div className="editPage">
        <div className="editForm">
          <h4>*IN PROGRESS* {intialFormState.name}</h4>
          <form onSubmit={handleEditClick} aria-label="Edit Plant Form">
            <p>Name</p>
            <input
              type="text"
              name="name"
              aria-label="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p>Height</p>
            <input
              type="text"
              name="height"
              aria-label="height"
              value={formValues.height}
              onChange={handleChange}
            />
            <p>Location</p>
            <input
              type="text"
              name="location"
              aria-label="location"
              value={formValues.location}
              onChange={handleChange}
            />
            <p>Facts</p>
            <input
              type="text"
              name="facts"
              aria-label="facts"
              value={formValues.facts}
              onChange={handleChange}
            />
            <p>Image Link</p>
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
                Update
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

// const handleEditClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
//   e.preventDefault()
//   editPlantMutation.mutate({ id, name, height, location, facts, image })
//   console.log('beep boop')
// }

// const editPlantMutation = useMutation(editPlant, {
//   onSuccess: async () => {
//     queryClient.invalidateQueries(['plants'])
//   },
// })
