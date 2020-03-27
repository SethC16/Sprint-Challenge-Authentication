const auth = require('./auth-router');
const request = require('supertest');

describe('auth-router.js', function() {
    describe('POST Register', function() {
        it('should return 200 ok', function() {
            request(auth).get('/register').then( res => {
                expect(res.status).toBe(200);
            })
        });
        it('responds with json', function() {
            return request(auth).get('/register')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert(res.body.username, 'seth')
                })
                
        })
    })
})

describe('auth-router.js', function() {
    describe('POST Login', function() {
        it('should return 200 ok', function() {
            request(auth).get('/login').then( res => {
                expect(res.status).toBe(200);
            })
        });
        it('responds with json', function(done) {
            request(auth).get('/login')
                .auth('username', 'password')
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    })
})

