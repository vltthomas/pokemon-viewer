import { useQuery } from '@tanstack/react-query'

type GenerationsList = {
  results: {
    name: string
  }[]
}

type PokemonListFromGeneration = {
  pokemon_species: {
    name: string
    url: string
  }[]
}

const useFetchGenerationsList = () => {
  return useQuery<GenerationsList, Error>(['generations'], () => fetch('https://pokeapi.co/api/v2/generation/').then((res) => res.json()))
}

const useFetchPokemonFromGeneration = (id: number) => {
  return useQuery<PokemonListFromGeneration, Error>(['pokemonList', id], () => fetch('https://pokeapi.co/api/v2/generation/' + id).then((res) => res.json()))
}

export { useFetchGenerationsList, useFetchPokemonFromGeneration }
