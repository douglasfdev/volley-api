#!/bin/bash

echo "Qual é o nome da migration?"

read migrationName

migrationFolder="$PWD/src/database/migrations/$migrationName"

npx typeorm migration:create $migrationFolder
