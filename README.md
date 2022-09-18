# POKEMON VIEWER

This project uses the following technologies :

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) / [NextJS](https://nextjs.org/)
- [TanStack Query](https://tanstack.com/query/v4) (ReactQuery)
- [TailwindCSS](https://tailwindcss.com/)

## Functionalities

This is a simple webapp able to :

- display Pokemon by generations,
- search Pokemon by their name,
- display Pokedex entry on a selected Pokemon.

The datas are fetched from [PokeAPI](https://pokeapi.co/).

## Live demo

You can test the webapp [here](https://pokemon.vthomas.fr).

## How to test the app on a local computer

First, it is necessary to have [NodeJS](https://nodejs.org) installed.

Once this is done, clone this project and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start using it.

### What is the Dockerfile about ?

The live demo application was built inside a Docker container and accessible throught a NGINX reverse proxy configuration on a personnal server. More informations [here](https://hub.docker.com/r/jwilder/nginx-proxy).

It is now deployed throught [Vercel](https://vercel.com/).

## License

Licensed under the MIT license.
