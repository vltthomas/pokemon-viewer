import Image from 'next/image'
import { useFetchPokemonFromGeneration } from '../api/pokeapi'

type PokemonListProps = {
  generation: number
}

function PokemonList(props: PokemonListProps) {
  const { status, data, error } = useFetchPokemonFromGeneration(props.generation)

  return status === 'loading' ? (
    <div>Loading</div>
  ) : status === 'error' && error instanceof Error ? (
    <div>Error : {error.message}</div>
  ) : data ? (
    <div>
      {data.pokemon_species
        .sort((p1, p2) => {
          let idP1 = parseInt(p1.url.slice(0, -1).split('/').pop()!)
          let idP2 = parseInt(p2.url.slice(0, -1).split('/').pop()!)
          return idP1 - idP2
        })
        .map((pokemon) => {
          let idPokemon = pokemon.url.slice(0, -1).split('/').pop()
          return (
            <li key={idPokemon}>
              #{idPokemon} {pokemon.name.toUpperCase()}
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`}
                alt={`front sprite of ${pokemon.name}`}
                width={100}
                height={100}
              />
            </li>
          )
        })}
    </div>
  ) : (
    <></>
  )
}

export default PokemonList
