cd ..

cleanup() {
  . scripts/clean.sh
}

trap cleanup INT TERM EXIT

docker compose up server client