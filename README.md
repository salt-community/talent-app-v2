# Talent App v2

The app helps us match the right talent with different client opportunities.

## Setting Up the Project

```sh
# Copy environment variables to .env
cp .env.example .env

# Start Docker containers
docker compose up

# Install dependencies
npm i

# Push database changes
npm run db:push

# Seed the database
npm run seed

# Start the development server
npm run dev
```

## Create GitHub Personal Access Token

    •	Go to GitHub Personal Access Tokens.
    •	Click on Generate new token.
    •	Select the appropriate scope:
    •	This is for reading public data only. You don’t need to select any scopes.
    •	Copy your token – it will only be displayed once. Make sure to save it securely.

## Setting Up Clerk

    •	Navigate to config > session.
    •	Click Edit Customize session token.
    •	Paste the following into the customized session:

```
{
	"email": "{{user.primary_email_address}}",
	"last_name": "{{user.last_name}}",
	"first_name": "{{user.first_name}}"
}
```

## Create Google PageSpeed Insights API Key

    •	Log in to Google Cloud Console.
    •	Scroll down and click on Get a Key.
    •	Create or select a project:
    •	If you already have a project, select it from the project list and then make a key.
    •	To create a new project:
            1. Click the Select a Project dropdown in the top navigation bar.
            2. Click New Project.
            3. Enter a name for your project and click Create.
    •	Copy the key.
    •	Secure your API key by restricting it to specific IPs or referrers if needed.

## Feature slice connections
![image](https://github.com/user-attachments/assets/0512bbd5-c9ce-4a8f-ad91-4f7adba53f55)
