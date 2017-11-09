# BowlingProject
Bowling Project

# Installation Instructions

# BowlingProject/web

- In BowlingProject/web you will need to run npm install to install dependencies

- To build any code that is changed you will need to run "webpack" which will build the code to the build files (UNMINIFIED FOR NOW)

- I have included a server that can be used for testing and seeing the application run, you can start the server using
npm start which will launch the server on localhost:8080 (You will need to be in The /BowlingProject/ file in CMD for this to work.

- For the webside, the API is set to call on http://www.localhost:8000 this is set in the components folder under file named configuration.module.js and this controls the contstant that sets our API route, if you are running your laraval instance on another port, or on a custom url you will NEED to update this or it will not be able to send or recieve game data.

# BowlingProject/server

- On server side, you will need to run "composer install" to install all the dependencies. 

- Update your .env file to your MYSQL DB login values/variables IMPORTANT

- In /BowlingProject/server in CMD run "php artisan migrate" to load the DB with tables

- Then run "php artisan serve" to run the API.

- Once both of the /web and /server are up and running navigate to localhost:8080/web and the application will start and be usable. 

## Important to remember ##
- You can change the location, routes and or ports either the /web or /server is running on, but you MUST update the configuration.module.js and the .env file appropriately for the application to work.

Please contact me at step_henk@hotmail.com if you have any issues or need assistance setting up a different environment.


