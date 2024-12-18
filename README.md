# Setting Up the Project - testing

```sh
# Copy environment variables to .env
cp .env.local .env
```

```sh
# Start Docker containers
docker compose up -d
```

```sh
# Install dependencies
pnpm i

# Push database changes
pnpm drizzle-kit push

# Seed the database
pnpm seed

# Start the development server
pnpm dev
```

Create a Personal Access Token (PAT)

1. Go to GitHub Personal Access Tokens.
2. Click on Generate new token.
3. Select the appropriate scope:
   • This is for reading public data only, you don’t need to select any scopes.
4. Copy your token – it will only be displayed once. Make sure to save it securely.
