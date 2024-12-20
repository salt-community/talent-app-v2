# Setting Up the Project

```sh
# Copy environment variables to .env
cp .env.example .env
```

```sh
# Start Docker containers
docker compose up
```

```sh
# Install dependencies
npm i

# Push database changes
npm run db:push

# Seed the database
npm run seed

# Start the development server
npm run dev
```

# Create GitHub Personal Access Token

1. Go to GitHub Personal Access Tokens.
2. Click on Generate new token.
3. Select the appropriate scope:

   • This is for reading public data only, you don’t need to select any scopes.

4. Copy your token – it will only be displayed once. Make sure to save it securely.

# Setting up Clerk

1. navigate to config > session.
2. click edit Customize session token.
3. paste this in to the Customized session.

```
{
	"email": "{{user.primary_email_address}}",
	"last_name": "{{user.last_name}}",
	"first_name": "{{user.first_name}}"
}
```

## Create Google PageSpeed Insights API key

1. Log In to Google Cloud Console

   [Log In](https://developers.google.com/speed/docs/insights/v5/get-started)

2. Scroll down and click on "Get a Key".

3. Create or Select a Project:

   • If you already have a project, select it from the project list and then make a key

   • To create a new project:

   1. Click the Select a Project dropdown in the top navigation bar.
   2. Click New Project.
   3. Enter a name for your project and click Create.
   4. Copy the key.

4. Secure Your API Key.
