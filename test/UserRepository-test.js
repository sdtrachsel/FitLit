import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  let userList;
  let repository;

  beforeEach('data creation', () => {
    userList = {
      users: [
        {
          "id": 1,
          "name": "Trystan Gorczany",
          "address": "9484 Lucas Flat, West Kittymouth WA 67504",
          "email": "Taurean_Pollich31@gmail.com",
          "strideLength": 4,
          "dailyStepGoal": 7000,
          "friends": [
            5,
            43,
            46,
            11
          ]
        },
        {
          "id": 2,
          "name": "Tyreek VonRueden",
          "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
          "email": "Nicolette_Halvorson43@yahoo.com",
          "strideLength": 4.5,
          "dailyStepGoal": 9000,
          "friends": [
            13,
            19,
            3
          ]
        },
        {
          "id": 3,
          "name": "Colt Rohan",
          "address": "48010 Balistreri Harbor, Cleobury IN 43317",
          "email": "Wilford.Barton@gmail.com",
          "strideLength": 2.7,
          "dailyStepGoal": 3000,
          "friends": [
            31,
            16,
            15,
            7
          ]
        },
        {
          "id": 4,
          "name": "Evie Satterfield",
          "address": "1378 Renner Island, Port Lincoln NE 06237-3602",
          "email": "Adan66@yahoo.com",
          "strideLength": 3.9,
          "dailyStepGoal": 4000,
          "friends": [
            21,
            32,
            8
          ]
        },
        {
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
        },
        {
          "id": 6,
          "name": "Jillian Senger",
          "address": "235 Geoffrey Highway, New Lavadaport CA 62933-3709",
          "email": "Cortez51@gmail.com",
          "strideLength": 4.3,
          "dailyStepGoal": 10000,
          "friends": [
            25,
            15,
            20
          ]
        }]
    }
  });
    it('should be a function', function () {
      expect(UserRepository).to.be.a('function');
    });

    it('should be an instance of UserRepository', function () {
      expect(repository).to.be.an.instanceof(UserRepository);
    });

    it('should store a repositories of users', function () {
      expect(repository.users).to.deep.equal([
        {
          "id": 1,
          "name": "Trystan Gorczany",
          "address": "9484 Lucas Flat, West Kittymouth WA 67504",
          "email": "Taurean_Pollich31@gmail.com",
          "strideLength": 4,
          "dailyStepGoal": 7000,
          "friends": [
            5,
            43,
            46,
            11
          ]
        },
        {
          "id": 2,
          "name": "Tyreek VonRueden",
          "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
          "email": "Nicolette_Halvorson43@yahoo.com",
          "strideLength": 4.5,
          "dailyStepGoal": 9000,
          "friends": [
            13,
            19,
            3
          ]
        },
        {
          "id": 3,
          "name": "Colt Rohan",
          "address": "48010 Balistreri Harbor, Cleobury IN 43317",
          "email": "Wilford.Barton@gmail.com",
          "strideLength": 2.7,
          "dailyStepGoal": 3000,
          "friends": [
            31,
            16,
            15,
            7
          ]
        },
        {
          "id": 4,
          "name": "Evie Satterfield",
          "address": "1378 Renner Island, Port Lincoln NE 06237-3602",
          "email": "Adan66@yahoo.com",
          "strideLength": 3.9,
          "dailyStepGoal": 4000,
          "friends": [
            21,
            32,
            8
          ]
        },
        {
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
        },
        {
          "id": 6,
          "name": "Jillian Senger",
          "address": "235 Geoffrey Highway, New Lavadaport CA 62933-3709",
          "email": "Cortez51@gmail.com",
          "strideLength": 4.3,
          "dailyStepGoal": 10000,
          "friends": [
            25,
            15,
            20
          ]
        }]);
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
      expect(repository.findOverAllStepGoalAvg()).to.equal();
    });

    it('should a random user id', function () {
      expect(testUserID.generateRandomId().id).to.be.below(7);
      expect(testUserID.generateRandomId().id).to.be.above(0);
    });




  });