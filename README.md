## Guess Word Game Backend

The Guess Word Game Backend is built using Node.js, and it provides the API endpoints necessary for the Guess Word Game to function. This README file provides instructions on how to set up and run the backend server.

### Installation

To install the Guess Word Game Backend, follow the steps below:

1.Clone this repository to your local machine using git clone https://github.com/sachinsingh3232/litmusbackend.git

2.Navigate to the project directory using cd Guess Word-game-backend

3.Install the required dependencies using npm install
  
4.Run the server using npm start

### API Endpoints

The Guess Word Game Backend provides the following API endpoints:

### GET /app/user/findAllUser
    This endpoint returns an array of JSON object containing list of all users.
    
### GET /app/leaderboard/findRanking
    This endpoint returns an array of JSON object containing list of all users sorted according to score and ranks of users who have completed the game
    
### POST /app/image/fetchLevelImages
    This endpoint returns an array of 4 images for the level the current user is on.
    
### Technologies Used
The Guess Word Game Backend was built using the following technologies:

1.Node.js: a JavaScript runtime for building server-side applications

2.Express: a Node.js framework for building web applications

3.MongoDB: a NoSQL document database used to store high scores data
