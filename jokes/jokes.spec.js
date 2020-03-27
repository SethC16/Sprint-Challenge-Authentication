const router = require('./jokes-router');
const request = require('supertest');

describe('jokes-router.js', function() {
    describe('GET /', function() {
        it('should return 200 ok', function() {
            request(router).get('/').then( res => {
                expect(res.status).toBe(200);
            });
        });
            
        it('should return json', function() {
            request(router).get('/').then(res => {
                expect(res.type).toMatch(/json/i)
            })
        });
    })
})