# Pokédex 2.0

Uma Pokédex interativa com os 151 Pokémon da região de Kanto, consumindo a [PokéAPI v2](https://pokeapi.co/).

## Stack

- **React 18** + **React Router 7** + **Vite 5** + **Tailwind CSS 3**

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento (porta 5173)
npm run build    # Build de produção → dist/
npm run preview  # Pré-visualização do build (porta 4173)
npm run lint     # ESLint
```

## Docker

```bash
docker build -t pokedex .
docker run -p 8080:80 pokedex
```

Acesse em [http://localhost:8080](http://localhost:8080).

## Estrutura

```
src/
├── main.jsx             # Router (rotas / e /Detalhes)
├── App.jsx              # Layout raiz
├── index.css            # Tailwind + fonte Inter
├── components/
│   ├── Header.jsx       # Banner superior
│   ├── Body.jsx         # Lista / busca / paginação
│   └── utils.js         # colorMap, fetchPokemon, fetchinfoPokemon
└── pages/
    └── Detalhes.jsx     # Detalhes do Pokémon
```

## Documentação

Consulte [docs/fluxo-da-aplicacao.html](docs/fluxo-da-aplicacao.html) para o fluxo completo de dados e chamadas à API.
