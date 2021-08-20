var chai  = require('chai');
var http = require('chai-http');
chai.use(http);
var request = require('request');


    describe ('Register User', function() {
        it('should send parameters to : /register POST', function(done) {
            chai
                .request('localhost:4000')
                .post('/register')
                .set('content-type', 'application/json')
                .send({name:'try',email:'test@gmail.com',password:'try'})
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                    } else {
                        done();
                    }
                });
        });
    });

    describe ('Get User', function() {
        it('get user with email', function(done) {
            chai
                .request('localhost:4000')
                .get('test@gmail.com')
                .set('content-type', 'application/json')
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                    } else {
                        done();
                    }
                });
        });
    });