import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app.js';
import { connectDB, disconnectDB } from '../config/database.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';
import Adoption from '../dao/models/Adoption.js';
import { hashPassword } from '../utils/index.js';

const request = supertest(app);

describe('Adoption Router Tests', function() {
  let authCookie;
  let adminCookie;
  let testUser;
  let testAdmin;
  let testPet;

  before(async function() {
    // Connect to test database
    await connectDB();

    // Clean up test data
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Adoption.deleteMany({});

    // Create test user
    const hashedPassword = await hashPassword('testpassword123');
    testUser = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: hashedPassword,
      role: 'user'
    });

    // Create test admin
    testAdmin = await User.create({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Create test pet
    testPet = await Pet.create({
      name: 'Buddy',
      specie: 'Dog',
      birthDate: new Date('2020-01-01'),
      adopted: false
    });

    // Login as user
    const userLoginRes = await request
      .post('/api/sessions/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword123'
      });
    authCookie = userLoginRes.headers['set-cookie'];

    // Login as admin
    const adminLoginRes = await request
      .post('/api/sessions/login')
      .send({
        email: 'admin@example.com',
        password: 'testpassword123'
      });
    adminCookie = adminLoginRes.headers['set-cookie'];
  });

  after(async function() {
    // Clean up test data
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Adoption.deleteMany({});
    await disconnectDB();
  });

  describe('POST /api/adoptions/:uid/:pid', function() {
    it('should create an adoption successfully', async function() {
      const res = await request
        .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
        .set('Cookie', authCookie)
        .expect(201);

      expect(res.body).to.have.property('message', 'Adoption created successfully');
      expect(res.body).to.have.property('adoption');
      expect(res.body.adoption).to.have.property('owner');
      expect(res.body.adoption).to.have.property('pet');
    });

    it('should not allow adopting an already adopted pet', async function() {
      const res = await request
        .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
        .set('Cookie', authCookie)
        .expect(400);

      expect(res.body).to.have.property('error', 'Pet is already adopted');
    });

    it('should require authentication', async function() {
      await request
        .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
        .expect(401);
    });
  });

  describe('GET /api/adoptions', function() {
    it('should get all adoptions as admin', async function() {
      const res = await request
        .get('/api/adoptions')
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body).to.have.property('adoptions');
      expect(res.body.adoptions).to.be.an('array');
      expect(res.body.adoptions.length).to.be.greaterThan(0);
    });

    it('should not allow non-admin to get all adoptions', async function() {
      await request
        .get('/api/adoptions')
        .set('Cookie', authCookie)
        .expect(403);
    });
  });

  describe('GET /api/adoptions/user', function() {
    it('should get user\'s adoptions', async function() {
      const res = await request
        .get('/api/adoptions/user')
        .set('Cookie', authCookie)
        .expect(200);

      expect(res.body).to.have.property('adoptions');
      expect(res.body.adoptions).to.be.an('array');
    });
  });

  describe('GET /api/adoptions/:aid', function() {
    it('should get adoption by ID', async function() {
      // First, get the adoption ID
      const adoptionsRes = await request
        .get('/api/adoptions')
        .set('Cookie', adminCookie);

      const adoptionId = adoptionsRes.body.adoptions[0]._id;

      const res = await request
        .get(`/api/adoptions/${adoptionId}`)
        .set('Cookie', authCookie)
        .expect(200);

      expect(res.body).to.have.property('adoption');
      expect(res.body.adoption).to.have.property('_id', adoptionId);
    });

    it('should return 404 for non-existent adoption', async function() {
      const fakeId = '507f1f77bcf86cd799439011';
      await request
        .get(`/api/adoptions/${fakeId}`)
        .set('Cookie', authCookie)
        .expect(404);
    });
  });

  describe('DELETE /api/adoptions/:aid', function() {
    it('should delete adoption as admin', async function() {
      // Get the adoption ID
      const adoptionsRes = await request
        .get('/api/adoptions')
        .set('Cookie', adminCookie);

      const adoptionId = adoptionsRes.body.adoptions[0]._id;

      const res = await request
        .delete(`/api/adoptions/${adoptionId}`)
        .set('Cookie', adminCookie)
        .expect(200);

      expect(res.body).to.have.property('message', 'Adoption deleted successfully');
    });

    it('should not allow non-admin to delete adoption', async function() {
      const fakeId = '507f1f77bcf86cd799439011';
      await request
        .delete(`/api/adoptions/${fakeId}`)
        .set('Cookie', authCookie)
        .expect(403);
    });
  });
});
