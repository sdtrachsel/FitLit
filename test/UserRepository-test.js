import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import testUsers from './UserRepository-test-data'

describe('User Repository', () => {
  let userList;
  let repository;
  
  beforeEach('data creation', () => {
    userList = testUsers

    repository = new UserRepository(userList);
  });

  it ('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', function () {
    expect(repository).to.be.an.instanceof(UserRepository);
  });

  it('should store a repositories of users', function () {
    expect(repository.users).to.deep.equal(testUsers.users)
  });

  it('should find a user by the user id', function () {
    expect(repository.findUserById(5)).to.deep.equal({
      "id": 5,
      "name": "Brycen Rutherford",
      "address": "0770 Keeley Square, West Keyon SD 73400-6577",
      "email": "Jerald55@yahoo.com",
      "strideLength": 3.3,
      "dailyStepGoal": 10000,
      "friends": [
        5,
        46
      ]
    });
  });

  it('should find the overall step goal average of all users', function () {
    expect(repository.findOverAllStepGoalAvg()).to.equal(7167);
  });

  it('should a random user id', function () {
    expect(repository.generateRandomId().id).to.be.below(7);
    expect(repository.generateRandomId().id).to.be.above(0);
    expect(repository.generateRandomId().name).to.be.a('string')
    expect(repository.generateRandomId().address).to.be.a('string')
    expect(repository.generateRandomId().email).to.be.a('string')
    expect(repository.generateRandomId().strideLength).to.be.a('number')
    expect(repository.generateRandomId().dailyStepGoal).to.be.a('number')
    expect(repository.generateRandomId().friends).to.be.a('array')
  });
});