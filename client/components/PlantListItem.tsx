// // import { useState } from 'react'
// // import styles from './PokemonListItem.module.css'
// // import { deletePokemon, renamePokemon } from '../apis/pokemon.ts'
// // import { useMutation, useQueryClient } from '@tanstack/react-query'

// export default function ItemList() {
//   const { data: plants, error, isLoading } = useQuery(['plants'], fetchAllItems)
//   console.log(plants)

// if (error) {
//   return <p>Whoops, no items!</p>
// }

// if (!items || isLoading) {
//   return <p>Loading items..</p>
// }

// return(
// <>
// <h2>All Items Available</h2>
// <ul>
//   {items.map((i: Item) => (
//     <li key={i.id}>
//       <img className="item-img" src={String(i.image)} alt="items" />
//       {i.name}
//       <Link to={`${i.id}/claimitem`}>

//       </Link>

//     </li>
//   ))}
// </ul>
// </>
// )
