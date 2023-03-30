import { expect } from 'chai';
import User from '../src/user.js';
import UserRepository from '../src/UserRepository';

describe('User', () => {
    let testUser;

    beforeEach('data creation', function () {
        let userList = {
            users: [
                {
                    "id": 48,
                    "name": "Kenny Zboncak",
                    "address": "2077 West Loaf, Lilianefort SD 09435",
                    "email": "Aliza.Schulist2@hotmail.com",
                    "strideLength": 2.5,
                    "dailyStepGoal": 7000,
                    "friends": [
                        33,
                        23,
                        46,
                        8
                    ]
                },
                {
                    "id": 49,
                    "name": "Vida Lueilwitz",
                    "address": "85485 Lesley Islands, Predovichaven WY 84422",
                    "email": "Zella.Jacobi@hotmail.com",
                    "strideLength": 3.3,
                    "dailyStepGoal": 8000,
                    "friends": [
                        3,
                        14,
                        45
                    ]
                },
                {
                    "id": 50,
                    "name": "Karianne Berge",
                    "address": "40555 White Knoll, New Christophechester MA 18097",
                    "email": "Amy19@yahoo.com",
                    "strideLength": 4.5,
                    "dailyStepGoal": 10000,
                    "friends": [
                        46,
                        48,
                        12
                    ]
                }
            ]
        }
       let allUsers = new UserRepository(userList)
        testUser = new User(allUsers.findUserbyId(48));
    });

    it.skip('should be a function', function () {
        expect(User).to.be.a('function');
    });

    it.skip('should be an instance of user', function () {
        expect(testUser).to.be.an.instanceof(User);
    });

    it.skip('should be state if a user id is valid', function () {
        const invalidUser = new User(14)
        expect(invalidUser).to.be.equal('user not found');
    });

    it.skip('should store a users id', function () {
        expect(testUser).to.equal(48);
    });

    it.skip('should store a user name', function () {
        expect(testUser.name).to.equal("Kenny Zboncak");
    });

    it.skip('should store a user address', function () {
        expect(testUser.address).to.equal("2077 West Loaf, Lilianefort SD 09435");
    });

    it.skip('should store a user email', function () {
        expect(testUser.email).to.equal("Aliza.Schulist2@hotmail.com");
    });

    it.skip('should store the stridelength of the user', function () {
        expect(testUser.strideLength).to.equal(2.5);
    });

    it.skip('should store the daily step goal of the user', function () {
        expect(testUser.dailyStepGoal).to.equal(7000);
    });

    it.skip('should store a user address', function () {
        expect(testUser.userFriends).to.deep.equal([33, 23, 46, 8]);
    });

    it.skip('should find the users first name', function () {
        expect(testUser.findFirstName()).to.be.equal('Kenny');
    });
});