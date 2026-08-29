import request from 'supertest';


const response = await request(app)
    .post('/api/register')
    .send({
        name: 'John',
        email: 'john@example.com',
        password: 'password123'
    })
    .expect(201);