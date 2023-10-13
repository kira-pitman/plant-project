export interface newPlant {
  name: string
  height: string
  location: string
  facts: string
  image: string
}

export interface Plant extends newPlant {
  id: number
}
