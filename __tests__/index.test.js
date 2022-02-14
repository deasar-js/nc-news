const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const data = require("../db/data/test-data");
const { notify } = require("../app");

afterAll(() => db.end());

beforeEach(() => seed(data));

describe("test first GET request", () => {
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
