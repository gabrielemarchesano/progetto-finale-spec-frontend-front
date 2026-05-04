export type Game = {
  readonly title: string,
  category: string[],
  imageUrl: string,
  platforms: string[],
  genres: string[],
  releaseYear: number,
  developer: string,
  description: string,
  pegi: string,
  price: number
}