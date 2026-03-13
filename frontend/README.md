# Frontend

The frontend uses React, TypeScript, Vite, Tailwind CSS 3, ESLint, and Vitest.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Docker Dev Mode

The Docker setup uses the `dev` target in [frontend/Dockerfile](./Dockerfile) and runs Vite on port `5173`.

```bash
docker compose up --build frontend
```

Source files are bind-mounted into the container and Vite polling is enabled, so frontend changes trigger hot reload without restarting Docker.

## Production Image

The production image builds the static app and serves it through Nginx:

```bash
docker build -t rideapp-frontend .
```
