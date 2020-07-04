
# Full Stack Blog Posts Application

This is an full stack application for render the different posts the backend provides us.

The frontend application is build using React, and the backend application use NodeJS, Express and MongoDB-Mongoose ( for simplicity the db connection is not real and I use mock data, but the files, code and configuration is there.)
You can also find tests in both frontend and backend projects.

It's a simple boilerplate / application, who can be improved in many ways, and many more features can be added ( more endpoints, more middlewares, authentication, login-register in the backend and more functionalities like add comments, update comments, etc in the frontend).

There is a docker compose file, that give us the possibility to build a docker with the whole application and ready to use.


## Launch the project follow the nexts steps:

1. Clone the repository
2. Go to each folder frontend and backend, and repeat this process in each folder.
3. Do a `npm install` to install all the dependencies.
4. Run `npm start`
5. Go to http://localhost:3000 if it doesnt go automatically.
6. Enjoy reading the posts.


## Launch the docker

1. Run the command: docker-compose up
2. Go to http://localhost:3000.
3. Enjoy reading the posts.
