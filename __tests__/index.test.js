const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const data = require("../db/data/test-data");
const { notify } = require("../app");

afterAll(() => db.end());

beforeEach(() => seed(data));

describe("GET /api/topics", () => {
  test("retrieve array of objects from /api/topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        console.log(topics);
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        expect(topics[0]).not.toHaveProperty("wth");
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

// describe("PATCH /api/article/:article_id", () => {
//   test("should ", () => {
//     const articleUpdate = {
//       inc_vote: 2,
//     };
//     return request(app)
//       .patch("/api/articles/3")
//       .send(parkUpdates)
//       .expect(200)
//       .then(({ body }) => {
//         expect(body.article).toEqual({
//           ...parkUpdates,
//   });
// });

describe("GET /api/articles/:article_id", () => {
  test("retrieve article object by id and check has correct properties", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        console.log(article);
        expect(article).toBeInstanceOf(Object);
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
      });
  });
});

describe.only("GET /api/users", () => {
  test("status 200, responds with array of objects - representing users in database", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        console.log(users);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toHaveProperty("username");
        });
      });
  });
  test("status 404, route not found", () => {
    return request(app)
      .get("/api/userz")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Route not found");
      });
  });
});

describe("Error handling", () => {
  test("404 route not found", () => {
    return request(app)
      .get("/api/lolwhut")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Route not found");
      });
  });
});
