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
export default function Editing() {
  return <h1>hello we r gonna edit</h1>
}
