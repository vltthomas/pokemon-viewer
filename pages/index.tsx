import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useFetchGenerationsList } from './api/pokeapi'
import PokemonList from './components/pokemonList'

const Home: NextPage = () => {
  const { status, data, error } = useFetchGenerationsList()
  const [genNum, setGenNum] = useState(0)
  return (
    <div className="flex flex-col bg-slate-700 min-h-screen">
      <Head>
        <title>Pokemon viewer</title>
        <meta name="description" content="Pokemon viewer using PokéAPI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-4 py-2.5 bg-slate-800 flex justify-between flex-wrap">
        <div className="flex items-center">
          <a href="">
            <Image src="/pokeball.svg" alt="pokeball image" width="75" height="75" />
          </a>
          <span className="ml-4 text-xl font-semibold whitespace-nowrap text-white">POKEMON VIEWER</span>
        </div>
        <div className="flex flex-wrap items-center text-white">
          <div>Generation:</div>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'error' && error instanceof Error ? (
            <span>Error : {error.message}</span>
          ) : data ? (
            data.results.map((gen, index) => (
              <button
                key={index}
                onClick={() => {
                  setGenNum(index + 1)
                }}
                className={`mx-1 rounded-full ${
                  genNum === index + 1 ? 'bg-slate-400' : 'bg-slate-600 hover:bg-slate-500'
                } transition ease-in duration-300 w-8 h-8`}
              >
                {gen.name.split('-')[1].toUpperCase()}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
      </header>
      <main className={`${genNum === 0 ? 'm-auto' : ''}`}>
        {genNum != 0 ? (
          <PokemonList generation={genNum} />
        ) : (
          <div className="h-full text-white text-5xl text-center antialiased text-slate-200">
            Select a generation <br />
            to start browsing{' '}
            <span className="underline decoration-4 text-amber-400 decoration-blue-500 underline-offset-8 font-semibold tracking-wider leading-loose">
              Pokémon
            </span>{' '}
            !
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
