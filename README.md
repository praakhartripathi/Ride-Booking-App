# Ride Booking App

Ride Booking App is a full-stack project built with React, Spring Boot, MySQL, and Docker. The repository is structured for local development with hot reload and for GitHub-based CI/CD.

## Modules

- [backend/README.md](./backend/README.md)
- [database/README.md](./database/README.md)
- [frontend/README.md](./frontend/README.md)

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
