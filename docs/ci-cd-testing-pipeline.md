# CI/CD Testing Pipeline

The GitHub Actions pipeline runs the stages in this order:

1. Build Backend
2. Run Spring Boot Tests
3. Run React Tests
4. Build Docker Images
5. Run Integration Tests

## Workflow File

Pipeline definition:

- [/.github/workflows/ci.yml](/Users/prakhartripathi/Documents/src/Ride-Booking-App/.github/workflows/ci.yml)

Integration test script:

- [/.github/scripts/run-integration-tests.sh](/Users/prakhartripathi/Documents/src/Ride-Booking-App/.github/scripts/run-integration-tests.sh)

## What the Integration Test Covers

The integration stage starts `mysql` and `backend` with Docker Compose, waits for the backend to become reachable, then:

1. Registers a new rider through `POST /api/auth/register`
2. Logs in with that rider through `POST /api/auth/login`
3. Verifies that both responses contain an `accessToken`

## Local Run

You can run the same integration check locally with:

```bash
chmod +x .github/scripts/run-integration-tests.sh
./.github/scripts/run-integration-tests.sh
```
