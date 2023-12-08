export interface newPlant {
  name: string
  height: string
  location: string
  facts: string
  image: string
  token: string
}

export interface Plant extends newPlant {
  id: number
  token: string
}

export interface DeletePlant {
  id: Plant['id']
  token: string
}