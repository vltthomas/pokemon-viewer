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

type PokedexInfo = {
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
}

const useFetchGenerationsList = () => {
  return useQuery<GenerationsList, Error>(['generations'], () => fetch('https://pokeapi.co/api/v2/generation/').then((res) => res.json()))
}

const useFetchPokemonFromGeneration = (id: number) => {
  return useQuery<PokemonListFromGeneration, Error>(['pokemonList', id], () => fetch('https://pokeapi.co/api/v2/generation/' + id).then((res) => res.json()))
}

const useFetchPokedexInfo = (id: number, enabledValue: boolean) => {
  return useQuery<PokedexInfo, Error>(['pokedexInfo', id], () => fetch('https://pokeapi.co/api/v2/pokemon-species/' + id).then((res) => res.json()), {
    enabled: enabledValue
  })
}

export { useFetchGenerationsList, useFetchPokemonFromGeneration, useFetchPokedexInfo }
