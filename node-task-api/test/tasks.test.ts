import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/tasks', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/tasks')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).to.have.length(3);
            });
    });

    it('should include \'Aprender Ionic 3\'', () => {
        return chai.request(app).get('/api/v1/tasks')
            .then(res => {
                let Ionic3 = res.body.data.find(task => task.title === 'Aprender Ionic 3');
                expect(Ionic3).to.exist;
                expect(Ionic3).to.have.all.keys([
                    'id',
                    'title',
                    'done',
                    'synchronized'
                ]);
            });
    });

});

describe('GET api/v1/tasks/:id', () => {

    it('responds with single JSON object', () => {
        return chai.request(app).get('/api/v1/tasks/1499108461569')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data).to.be.an('object');
            });
    });

    it('should return \'Aprender JavaScript ES6/ES7\'', () => {
        return chai.request(app).get('/api/v1/tasks/1499108461569')
            .then(res => {
                expect(res.body.data.title).to.equal('Aprender JavaScript ES6/ES7');
            });
    });

});

describe('POST api/v1/tasks', () => {

    it('should create new Task with title \'Aprender sobre PWA\'', () => {
        return chai.request(app)
            .post('/api/v1/tasks')
            .send({
                title: 'Aprender sobre PWA', 
                done: false,
                synchronized: false
            })
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res).to.be.json;
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.title).to.equal('Aprender sobre PWA');
            });
    });

});

describe('PUT api/v1/tasks/:id', () => {

    it('should update Task title to \'Task updated\' and done to \'true\'', () => {
        return chai.request(app)
            .put('/api/v1/tasks/1499108461569')
            .send({
                title: 'Task updated', 
                done: true,
                synchronized: true
            })
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.title).to.equal('Task updated');
                expect(res.body.data.done).to.be.true;
            });
    });

});

describe('DELETE api/v1/tasks/:id', () => {

    it('should delete task', () => {
        return chai.request(app)
            .del('/api/v1/tasks/1499108461569')
            .then(res => {
                expect(res.status).to.equal(202);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.true;
            });
    });

});