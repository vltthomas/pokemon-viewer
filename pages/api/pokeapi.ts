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

/**
 * Query to recover all existing generations of Pokemon from PokeAPI.
 *
 * @return Response from PokeAPI as {@link GenerationsList }
 */
const useFetchGenerationsList = () => {
  return useQuery<GenerationsList, Error>(['generations'], () => fetch('https://pokeapi.co/api/v2/generation/').then((res) => res.json()))
}

/**
 * Query to recover all Pokemon associated to a generation id from PokeAPI.
 *
 * @param id Generation id
 *
 * @returns Response from PokeAPI as {@link PokemonListFromGeneration}
 */
const useFetchPokemonFromGeneration = (id: number) => {
  return useQuery<PokemonListFromGeneration, Error>(['pokemonList', id], () => fetch('https://pokeapi.co/api/v2/generation/' + id).then((res) => res.json()))
}

/**
 * Query to recover description of a Pokemon from his id from PokeAPI.
 * If the id equals 0, the request is disabled as it would return a 404.
 *
 * @param id Pokemon id
 *
 * @returns Response from PokeAPI as {@link PokemonListFromGeneration}
 */
const useFetchPokedexInfo = (id: number) => {
  const enabledValue: boolean = id != 0
  return useQuery<PokedexInfo, Error>(['pokedexInfo', id], () => fetch('https://pokeapi.co/api/v2/pokemon-species/' + id).then((res) => res.json()), {
    enabled: enabledValue
  })
}

export { useFetchGenerationsList, useFetchPokemonFromGeneration, useFetchPokedexInfo }
