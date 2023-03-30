import { expect } from 'chai';
import User from '../src/User.js';
import UserRepository from '../src/UserRepository';

describe('User', () => {
    let testUser;

    beforeEach('data creation',() => {
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
        testUser = new User(allUsers.findUserById(48));
    });

    it('should be a function', function () {
        expect(User).to.be.a('function');
    });

    it('should be an instance of user', function () {
        expect(testUser).to.be.an.instanceof(User);
    });

    it('should store a users id', function () {
        expect(testUser.id).to.equal(48);
    });

    it('should store a user name', function () {
        expect(testUser.name).to.equal("Kenny Zboncak");
    });

    it('should store a user address', function () {
        expect(testUser.address).to.equal("2077 West Loaf, Lilianefort SD 09435");
    });

    it('should store a user email', function () {
        expect(testUser.email).to.equal("Aliza.Schulist2@hotmail.com");
    });

    it('should store the stridelength of the user', function () {
        expect(testUser.strideLength).to.equal(2.5);
    });

    it('should store the daily step goal of the user', function () {
        expect(testUser.dailyStepGoal).to.equal(7000);
    });

    it('should store a users friends', function () {
        expect(testUser.friends).to.deep.equal([33, 23, 46, 8]);
    });

    it('should find the users first name', function () {
        expect(testUser.findFirstName()).to.be.equal('Kenny');
    });
});