import request from 'supertest';
import app from '../src/app';

describe('GET /api/health', () => {
    it("should return server health status", async () => {
        const response = await request(app).get('/api/health').expect(200);

        expect(response.body.message).toBe("Server is healthy")
    })
})