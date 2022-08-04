import app from '../../src/index';
import User from '../../src/models/users';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
chai.use(chaiHttp);
const expect = chai.expect;

describe('User Register API Request', () => {
  it('it tests user register by adding email and password', (done) => {
    let data = {
      email: 'bcd',
      password: 'hey'
    }
    chai.request(app)
      .post('/users/register')
      .send(data)
      .end((err, res) => {
        console.log('res');
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      })
  })
  it('it tests user register if user has not added email', (done) => {
    let data = {
      // email: 'bcd',
      password: 'hey'
    }
    chai.request(app)
      .post('/users/register')
      .send(data)
      .end((err, res) => {
        console.log('res');
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        // expect(res).to.have.
        // expect(res.data.data).to.be('INCOMPLETE_DETAILS');
        done();
      })
  })
  it('it tests user register if user has entered already registered email', (done) => {
    let data = {
      email: 'bcd',
      password: 'hey'
    }
    chai.request(app)
      .post('/users/register')
      .send(data)
      .end((err, res) => {
        console.log('res', res.body);
        // console.log('err', err);
        expect(err).to.be.null;
        expect(res).to.have.status(403);
        expect(res.body.data).eq('EMAIL_ALREADY_REGISTERED');
        done();
      })
  })
})