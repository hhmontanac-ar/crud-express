import { Request, Response } from "express";
import { ArticleController } from "../../controllers";

const dBTest = require('../dBTest')

describe("Fetch Articles request", () => {
  const next = jest.fn();

  beforeAll(async () => {
    await dBTest.connect();
  });
  
  afterEach(async () => {
    await dBTest.reset();
    });

    afterAll(async () => {
        await dBTest.disconnect();
        next.mockClear();
    });

  test("fetch", async () => {
    const request = {};
    const response: Partial<Response> = {
      statusCode: 200,
      send: jest.fn().mockImplementation((result) => {
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: "test",
            }),
          ])
        );
      }),
    };
    const expectedStatusCode = 200;

    await ArticleController.fetch(request as Request, response as Response, next);

    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test("create", async () => {
    const request = {};
    const response: Partial<Response> = {
      statusCode: 201,
      send: jest.fn().mockImplementation((result) => {
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: "test",
            }),
          ])
        );
      }),
    };
    const expectedStatusCode = 201;

    await ArticleController.create(request as Request, response as Response, next);
 
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test("update", async () => {
    const request = {};
    const response: Partial<Response> = {
      statusCode: 200,
      send: jest.fn().mockImplementation((result) => {
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: "test",
            }),
          ])
        );
      }),
    };
    const expectedStatusCode = 200;

    await ArticleController.update(request as Request, response as Response, next);
 
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  

  test("remove", async () => {
    const request = {};
    const response: Partial<Response> = {
      statusCode: 200,
      send: jest.fn().mockImplementation((result) => {
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: "test",
            }),
          ])
        );
      }),
    };    
    const expectedStatusCode = 200;

    await ArticleController.remove(request as Request, response as Response, next);

    expect(response.statusCode).toBe(expectedStatusCode);
  });
});