# News Map

View news articles on a world map.

## Stack

- Frontend built in Vue and TypeScript
    - Vue-Leaflet
    - TailwindCSS
    - Vite
- Backend built in Node and TypeScript
    - `/news` Endpoint for fetching from GDELT Project Geo 2 API
        ```
        https://blog.gdeltproject.org/gdelt-geo-2-0-api-debuts/
        https://api.gdeltproject.org/api/v2/geo/geo
        ```

## Installation

- Install Node and Docker
- Run `make install`
  This will run `scripts/install.sh` which installs all NPM dependencies in the client and server directories.

## Development

- All shared types are stored in `app/types` and imported from `@newsmap/types`
  `import type { <Resource> } from '@newsmap/types';`

- Run `make` in the root directory to compose `app/client/Dockerfile` and `app/server/Dockerfile`
