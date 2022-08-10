import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useFetchGenerationsList } from './api/pokeapi'
import PokemonList from './components/pokemonList'

const Home: NextPage = () => {
  const { status, data, error } = useFetchGenerationsList()
  const [gen, setGen] = useState(0)
  return (
    <div>
      <Head>
        <title>Pokemon viewer</title>
        <meta name="description" content="Pokemon viewer using PokéAPI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>POKEMON VIEWER</header>
      <main>
        <div>
          Select a generation
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'error' && error instanceof Error ? (
            <span>Error : {error.message}</span>
          ) : data ? (
            data.results.map((gen, index) => (
              <button
                key={index}
                onClick={() => {
                  setGen(index + 1)
                }}
              >
                {gen.name.split('-')[1].toUpperCase()}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
        {gen != 0 ? <PokemonList generation={gen} /> : <></>}
      </main>
    </div>
  )
}

export default Home
