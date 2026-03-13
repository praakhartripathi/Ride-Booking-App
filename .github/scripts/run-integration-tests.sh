#!/usr/bin/env bash

set -euo pipefail

cleanup() {
  docker compose down -v
}

trap cleanup EXIT

docker compose up -d mysql backend

for attempt in $(seq 1 30); do
  status_code="$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/auth/login || true)"
  if [ "${status_code}" != "000" ]; then
    break
  fi

  if [ "${attempt}" = "30" ]; then
    echo "Backend did not become ready in time"
    docker compose logs backend mysql
    exit 1
  fi

  sleep 5
done

suffix="$(date +%s)"
email="ci.user.${suffix}@example.com"
phone="+1999${suffix}"

register_payload="$(cat <<EOF
{
  "firstName": "CI",
  "lastName": "User",
  "email": "${email}",
  "phoneNumber": "${phone}",
  "password": "SecurePass123!",
  "role": "RIDER"
}
EOF
)"

register_response="$(curl -sS \
  -X POST http://localhost:8080/api/auth/register \
  -H 'Content-Type: application/json' \
  -d "${register_payload}")"

echo "${register_response}" | grep -q '"accessToken"'
echo "${register_response}" | grep -q "\"email\":\"${email}\""

login_response="$(curl -sS \
  -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d "{\"identifier\":\"${email}\",\"password\":\"SecurePass123!\"}")"

echo "${login_response}" | grep -q '"accessToken"'
echo "${login_response}" | grep -q "\"email\":\"${email}\""

echo "Integration tests passed"
