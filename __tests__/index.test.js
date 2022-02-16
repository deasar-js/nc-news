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

describe("GET /api/articles/:article_id", () => {
  test("retrieve article object by id and check has correct properties", () => {
    return request(app)
      .get("/api/articles/5")
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
        // asserting data-types
        expect(
          typeof article.author &&
            typeof article.title &&
            typeof article.body &&
            typeof article.topic &&
            typeof article.created_at &&
            typeof article.comment_count
        ).toBe("string");
        expect(typeof article.article_id && typeof article.votes).toBe(
          "number"
        );
      });
  });
  test("status 400 - Bad request, query string but must be number", () => {
    return request(app)
      .get("/api/articles/whodis")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("status 404 - not found, query number but no such article exists with id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((err) => {
        expect(err.res.statusMessage).toBe("Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status 200, responds with updated article", () => {
    const articleUpdate = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/articles/4")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 4,
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: "2020-05-06T01:14:00.000Z",
          votes: 1,
        });
      });
  });
  test("status 200, responds with updated article after subtracting votes", () => {
    const articleUpdate = {
      inc_votes: -100,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 0,
        });
      });
  });
  test("status 200, responds with updated article after subtracting votes to take below 0", () => {
    const articleUpdate = {
      inc_votes: -100,
    };
    return request(app)
      .patch("/api/articles/5")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 5,
          title: "UNCOVERED: catspiracy to bring down democracy",
          topic: "cats",
          author: "rogersop",
          body: "Bastet walks amongst us, and the cats are taking arms!",
          created_at: "2020-08-03T13:14:00.000Z",
          votes: -100,
        });
      });
  });
  test("status 400 - Bad request, query string but must be number", () => {
    return request(app)
      .get("/api/articles/syd")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("status 404 -Not found, number but doesnt exist in db", () => {
    const articleUpdate = {
      inc_votes: -100,
    };
    return request(app)
      .patch("/api/articles/10000")
      .send(articleUpdate)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
});

describe("GET /api/users", () => {
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
