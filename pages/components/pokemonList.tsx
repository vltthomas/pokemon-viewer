import Image from 'next/image'
import { useState } from 'react'
import { useFetchPokedexInfo, useFetchPokemonFromGeneration } from '../api/pokeapi'

type PokemonListProps = {
  generation: number
}

function PokemonList(props: PokemonListProps) {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [enableQueryPokedex, setEnableQueryPokedex] = useState(false)
  const [filter, setFilter] = useState('')

  const { status, data, error } = useFetchPokemonFromGeneration(props.generation)
  const { status: statusPokedex, data: dataPokedex, error: errorPokedex } = useFetchPokedexInfo(selectedPokemon, enableQueryPokedex)

  function handleClickOnPokemon(index: number) {
    if (index == selectedPokemon) {
      setSelectedPokemon(0)
      setEnableQueryPokedex(false)
    } else {
      setSelectedPokemon(index)
      setEnableQueryPokedex(true)
    }
  }

  return status === 'loading' ? (
    <div className="text-center text-white">Loading...</div>
  ) : status === 'error' && error instanceof Error ? (
    <div className="text-center text-white">Error : {error.message}</div>
  ) : data ? (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Pokémon by name"
        className="block mx-auto mt-5 mb-1 p-2 pl-5 bg-slate-800 rounded md:w-96 w-56 text-white focus:outline-none"
      />
      <div className="flex flex-wrap justify-start">
        {data.pokemon_species
          .filter((pokemon) => pokemon.name.includes(filter.toLowerCase()))
          .sort((p1, p2) => {
            let idP1 = parseInt(p1.url.slice(0, -1).split('/').pop()!)
            let idP2 = parseInt(p2.url.slice(0, -1).split('/').pop()!)
            return idP1 - idP2
          })
          .map((pokemon) => {
            let idPokemon = parseInt(pokemon.url.slice(0, -1).split('/').pop()!)
            return (
              <div
                key={idPokemon}
                onClick={() => handleClickOnPokemon(idPokemon)}
                className={`flex ${
                  idPokemon === selectedPokemon ? 'bg-slate-500' : ' bg-slate-600 hover:bg-slate-500'
                } transition transition-width ease-out duration-300 m-4 p-2 rounded h-52`}
              >
                <div className="flex flex-col justify-between">
                  <div className="text-white font-semibold text-center">
                    #{idPokemon} {pokemon.name.toUpperCase()}
                  </div>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`}
                    alt={`front sprite of ${pokemon.name}`}
                    width="150"
                    height="150"
                  />
                </div>
                <div
                  className={`flex font-sans text-white text-sm ${
                    selectedPokemon === idPokemon ? 'ml-1 w-48' : 'w-0 opacity-10 '
                  } h-full bg-slate-700 rounded transition-all duration-500 ease-out overflow-hidden`}
                >
                  {dataPokedex && selectedPokemon === idPokemon ? (
                    <div className="opacity-100 px-2 py-1 transition duration-100 delay-500 ease-in overflow-y-auto">
                      {dataPokedex.flavor_text_entries.filter((desc) => desc.language.name === 'en').pop()?.flavor_text}
                    </div>
                  ) : (
                    <div className="opacity-0 transition duration-100 delay-500 ease-in"></div>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default PokemonList
