#!/bin/bash
</dev/tcp/localhost/5434 && echo Port open. || echo Port closed.
if [ $? -eq 0 ]; then
    docker compose up dev-db -d

    until </dev/tcp/localhost/5434; do sleep 5; done
    echo "Postgres is up and running!"
fi

SCRIPTS_DIR=`dirname "$0"`

export PGPASSWORD=123
cat "" "$SCRIPTS_DIR/../sql/schema.sql" "$SCRIPTS_DIR/../sql/seeds.sql" \
    | psql -U postgres -d mydb -p 5434 -h localhost -1 -f - 