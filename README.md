# News Map

View news articles on a world map.

## Stack

- Frontend built in Vue and TypeScript
    - Vue-Leaflet
    - TailwindCSS
    - Vite
- Backend built in Node and TypeScript
    - `/news` Endpoint for fetching from GDELT Project
      `ttps://api.gdeltproject.org/api/v2/geo/geo`

## Installation

- Install Node and Docker
- Run `make install`
  This will run `scripts/install.sh` which installs all NPM dependencies in the client and server directories.

## Development

Run `make` in the root directory to compose `client/Dockerfile` and `server/Dockerfile`
