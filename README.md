# Ride Booking App

Ride Booking App is a full-stack project built with React, Spring Boot, MySQL, and Docker. The repository is structured for local development with hot reload and for GitHub-based CI/CD.

The application branding in the UI uses `QRide`.

## Modules

- [backend/README.md](./backend/README.md)
- [database/README.md](./database/README.md)
- [frontend/README.md](./frontend/README.md)

Backend domain modules currently included:

- `auth`: registration, login, JWT security
- `userprofile`: profile management and profile picture upload
- `ride`: rider trip requests and ride lifecycle actions
- `driver`: driver profile management and availability
- `location`: city/state autocomplete search API for pickup and dropoff fields

## Branch Strategy

- `main`: production-ready branch
- `feature_fe`: frontend work
- `feature_be`: backend work
- `feature_db`: database work

Merge changes through Pull Requests. A PR template is included at [.github/pull_request_template.md](./.github/pull_request_template.md).

## Local Development

Start the full stack with Docker Compose:

```bash
docker compose up --build
```

Services:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8080](http://localhost:8080)
- MySQL: `localhost:3307`

Frontend changes reload through Vite HMR inside the `ride_frontend` container. Backend changes continue to use the Spring Boot dev container and DevTools flow.

The frontend now includes:

- A QRide navbar and ride-request hero section
- A post-hero "Explore what you can do with QRide" section
- Routed pages for `/home`, `/login`, `/register`, `/ride`, and `/captain`
- Login and signup forms connected to Spring Boot auth APIs
- Captain login/signup flow connected to dedicated `/api/captain/*` endpoints
- Pickup and dropoff autocomplete backed by the location module
- Ride request creation, ride estimates, and a captain dashboard for open ride requests

## Quality Gates

Frontend:

```bash
cd frontend
npm install
npm run lint
npm run test
npm run build
```

Backend:

```bash
cd backend
./mvnw clean verify
```

The backend Maven build now runs Checkstyle and SpotBugs during `verify`.

Useful backend APIs:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/captain/register`
- `POST /api/captain/login`
- `GET /api/location/suggestions?q=<query>`
- `GET /api/location/coordinates?q=<query>`
- `GET /api/location/distance-time?origin=<origin>&destination=<destination>`
- `GET /api/locations/search?q=<query>`
- `POST /api/rides`
- `POST /api/rides/create`
- `GET /api/rides/me`
- `GET /api/rides/user`
- `GET /api/rides/captain`
- `GET /api/rides/open`
- `PUT /api/drivers/me`
- `PATCH /api/drivers/me/availability`

## Docker

Build images locally:

```bash
docker build -t rideapp-frontend ./frontend
docker build -t rideapp-backend ./backend
```

Use `docker compose config` to validate the compose file before startup or deployment.

## GitHub Automation

The repository now includes:

- CI workflow at [.github/workflows/ci.yml](./.github/workflows/ci.yml)
- Deploy workflow at [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- Issue templates at [.github/ISSUE_TEMPLATE](./.github/ISSUE_TEMPLATE)

The deploy workflow builds and publishes frontend/backend images to GHCR. Remote deployment requires repository secrets for the target servers and compose file paths.

## Rollback

If a deployment fails:

```bash
docker compose down
docker pull <previous-stable-image>
docker compose up -d
```

Keep previous image tags in GHCR or your registry so you can pin the last stable release quickly.
