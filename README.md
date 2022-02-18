# Northcoders News API

Link to hosted app:

- https://deasar-news-app.herokuapp.com/api

About this project:

This project is a Node.js REST API using a PostgreSQL database with GET, POST, PATCH and DELETE requests using node-postgres to interact with the database. The client can create and manage new articles, users, topics and comments. It is an example of a back-end service allowing access to application data programmatically which serves the information to the front-end architecture.

Instructions:

1. Clone the repository
2. Install dependencies with npm install (or yarn)

   - npm install

3. seed local database

   - npm run setup-dbs

4. run tests with command:

   - npm test

Create two .env files (important)

- .env.development
  - PGDATABASE=nc_news
- .env.test
  - PGDATABASE=nc_news_test

Anything else?
