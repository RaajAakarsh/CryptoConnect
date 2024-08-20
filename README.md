# CryptoConnect


### Clone and Navigate to the Project Directory

### Step 1: Set up the Frontend

a. Navigate to the Frontend Directory 
        cd Frontend

b. Install Dependencies
        npm install

c. Set up CoinGecko API Key
    Sign up on the CoinGecko website and obtain an API key. Create a new file named .env in the frontend directory and add the following line:
        COIN_API_KEY = YOUR_API_KEY_HERE
        Replace YOUR_API_KEY_HERE with your actual API key.

### Step 4: Set up the Backend

a. Navigate to the Backend Directory
        cd Backend

b. Install Dependencies
        npm install

c. Set up MongoDB Connection URL
    Create a new file named .env in the backend directory and add the following line:
        DB_URL = you_mongo_db_connection_url
        Replace your-mongodb-url with your actual MongoDB connection details.

### Step 5: Run the Project

a. Run the Backend
    navigate to backend folder
        npm run start

b. Run the Frontend
    navigate to frontend folder
        npm run dev

Open your web browser and navigate to http://localhost:3000 to access the frontend application.

### Troubleshooting
If you encounter any issues, check the console logs for errors. Make sure you have replaced the placeholders with your actual API key and MongoDB connection details.

### Note
This project uses a .env file to store environment variables. Make sure to add the .env file to your .gitignore file to avoid committing sensitive information to your repository.

