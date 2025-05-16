#!/bin/sh

# Run database seed if SEED_DB is set to true
if [ "$SEED_DB" = "true" ]; then
    echo "Seeding database..."
    npm run seed
fi

# Start the application
npm run start:prod 