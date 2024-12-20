# Setting Up the Project

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
npm i

# Push database changes
npm run drizzle-kit push

# Seed the database
npm run seed

# Start the development server
npm run dev
```

Create a Personal Access Token (PAT)

1. Go to GitHub Personal Access Tokens.
2. Click on Generate new token.
3. Select the appropriate scope:
   • This is for reading public data only, you don’t need to select any scopes.
4. Copy your token – it will only be displayed once. Make sure to save it securely.

Setting up clerk
1. navigate to config > session
2. click edit Customize session token
3. paste this in to the Customized session
```
{
	"email": "{{user.primary_email_address}}",
	"last_name": "{{user.last_name}}",
	"first_name": "{{user.first_name}}"
}
```
