# Northcoders News API

[Check out the hosted version](https://deasar-news-app.herokuapp.com/api)

## My goal was to build the back-end for a news app project

This project is a Node.js REST API with GET, POST, PATCH and DELETE requests. Using node-postgres to interact with the PostgreSQL database. The client can create and manage new articles, users, topics and comments. It is an example of a back-end service allowing access to application data programmatically which serves the information to the front-end architecture.

## How I worked on this project

- I built this REST API using TDD
- I worked with tasks on kanban board [see here](https://user-images.githubusercontent.com/86922213/162231188-aeebafb3-b147-449e-92c6-78fe340c89f5.png "kanban")
- I used feature branches and pull requests [see here](https://user-images.githubusercontent.com/86922213/162231183-913f4482-44b8-437d-9c46-2598ea40d849.png "pull request") & [here](https://user-images.githubusercontent.com/86922213/162231182-a4162d5b-d78a-40b2-a2c6-71ad3185338f.png "Pull requests")

## How to navigate this project

- Use MVC pattern: Model handles and then sends data to controller [see here](https://user-images.githubusercontent.com/86922213/162231163-63fbbff8-6630-4a6a-a6b8-778c523d73ff.png "example model code")
- Testing using Jest [see here](https://user-images.githubusercontent.com/86922213/162231172-809a5054-d423-4c4c-b11b-891b659b254b.png "test results") & [here](https://user-images.githubusercontent.com/86922213/162231177-ff5a7360-d239-40f3-afff-2565f0906b1e.png "example test code")
- REST API available endpoints [see here](https://user-images.githubusercontent.com/86922213/162231179-fc1a95e4-10ea-4089-b5b4-c548be5e2496.png "hosted API endpoints")

## Why I built the project this way

- Express JS is robust and more concise than setting up a server using http
- Node-postgres allows simple interfacing with PostgreSQL database and works well with Express
- Testing using Jest (unit testing), supertest (integration testing) & Husky to test on every commit

## If I had more time I would change this

- Add more endpoints - for article filtering and user authentication
- Integrate pagination by adding limits number of responses
- POST new topics & DELETE articles by ID

## Instructions

1. Clone the repository
2. Install dependencies with npm install (or yarn)
```bash
   - npm install
```
3. seed local database

   - npm run setup-dbs

4. run tests with command:

   - npm test

## Minimum Version Requirements

- Node.js: v17.3.0
- Postgres: 14.1
