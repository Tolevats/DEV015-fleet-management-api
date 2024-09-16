// difference between conventions .test and .spec:
// .test: Could imply testing the "taxis" module's functionality (TDD: Test-driven development)
// .spec: Could imply specifying how the "taxis" module should behave (BDD: Behavior-driven development)

import request from "supertest";
import app from '../src/app';
import { PrismaClient } from "@prisma/client";

// mocking Prisma Client
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                taxis: {
                    findMany: jest.fn().mockResolvedValue([]),
                }
            };
        })
    };
});

describe('GET /taxis', () => {
  afterEach(() => {
    jest.clearAllMocks(); // clean up mocks after each test
  });
  // 1 testing if no taxis are found
  it('should return 200 and an empty array if no taxis are found', async () => {
    // Mock the findMany method to return an empty array
    const response = await request(app).get('/taxis');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});