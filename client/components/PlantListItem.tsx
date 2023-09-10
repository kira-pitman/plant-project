import { useState } from 'react'
import styles from './PokemonListItem.module.css'
import { deletePokemon, renamePokemon } from '../apis/pokemon.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
//import { eventNames } from 'superagent'

interface Props {
  id: number
  name: string
}
export default function PlantListItem({ id, name }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)
  const queryClient = useQueryClient()

  const deletePokemonMutation = useMutation(deletePokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['pokemon'])
    },
  })

  const handleDeleteClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    deletePokemonMutation.mutate({ id })
  }

  const renamePokemonMutation = useMutation(renamePokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['pokemon'])
    },
  })

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    renamePokemonMutation.mutate({ id, newName: text })
    setEditing(false)
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(name)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form
          onSubmit={handleEditSubmit}
          aria-label="Rename Fruit Form"
          className={styles.form}
        >
          <input
            type="text"
            aria-label="rename"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" aria-label="save">
            Save
          </button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {name} -{' '}
          <span className={styles.buttons}>
            <button
              onClick={handleStartEditingClick}
              aria-label="rename button"
            >
              Rename
            </button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}