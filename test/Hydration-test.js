import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Sleep', () => {
    let testUser;
    let hydrationList;
    beforeEach('data creation', () => {
        hydrationList = {
            hydrationData: [
                { "userID": 1, "date": "2023/03/24", "numOunces": 28 },
                { "userID": 2, "date": "2023/03/24", "numOunces": 35 },
                { "userID": 1, "date": "2023/03/23", "numOunces": 95 },
                { "userID": 1, "date": "2023/03/22", "numOunces": 25 },
                { "userID": 1, "date": "2023/03/21", "numOunces": 48 },
                { "userID": 3, "date": "2023/03/21", "numOunces": 10 },
                { "userID": 1, "date": "2023/03/20", "numOunces": 20 },
                { "userID": 1, "date": "2023/03/19", "numOunces": 87 },
                { "userID": 4, "date": "2023/03/19", "numOunces": 42 },
                { "userID": 1, "date": "2023/03/18", "numOunces": 64 },
                { "userID": 1, "date": "2023/03/17", "numOunces": 55 },
                { "userID": 1, "date": "2023/03/16", "numOunces": 74 }
            ]
        };

        testUser = new Hydration(1, hydrationList)
    });

    it('should be a function', function () {
        expect(Hydration).to.be.a('function');
    });

    it('should be an instance of sleep', function () {
        expect(testUser).to.be.an.instanceof(Hydration);
    });

    it('should store a users id', function () {
        expect(testUser.userId).to.equal(1);
    });

    it('should store a users hydration logs', function () {
        expect(testUser.userHydrationLogs).to.deep.equal([
            { "userID": 1, "date": "2023/03/24", "numOunces": 28 },
            { "userID": 1, "date": "2023/03/23", "numOunces": 95 },
            { "userID": 1, "date": "2023/03/22", "numOunces": 25 },
            { "userID": 1, "date": "2023/03/21", "numOunces": 48 },
            { "userID": 1, "date": "2023/03/20", "numOunces": 20 },
            { "userID": 1, "date": "2023/03/19", "numOunces": 87 },
            { "userID": 1, "date": "2023/03/18", "numOunces": 64 },
            { "userID": 1, "date": "2023/03/17", "numOunces": 55 },
            { "userID": 1, "date": "2023/03/16", "numOunces": 74 }
        ]);
    });

    it('should find the most recent day', function () {
        expect(testUser.findMostRecentDay()).to.be.equal("2023/03/24");
    })

    it('should find the overall average of ounces consumed', function () {
        expect(testUser.userAllTimeOunceAvg()).to.be.equal(55);
    });

    it('should find how many ounces for a specific day', function () {
        expect(testUser.findOuncesByDay("2023/03/17")).to.be.equal(55);
    });


    it('should be able to tell if a date is valid', function () {
        expect(testUser.findOuncesByDay('2023/02/16')).to.be.equal('no such date');
        expect(testUser.findOuncesByDay('2022/04/16')).to.be.equal('no such date');
    });

    it('should be able to find the previous 7 days ounces given an end date', function () {
        expect(testUser.findDetailByWeek('2023/03/24')).to.deep.equal([28, 95, 25, 48, 20, 87, 64]);

        expect(testUser.findDetailByWeek('2023/03/17')).to.deep.equal([55, 74, 0, 0, 0, 0, 0]);
    });


    it('should be able to find if a given date is not valid when finding the previous 7 days detail', function () {
        expect(testUser.findOuncesForWeek('2023/03/14')).to.equal('no such date');

        expect(testUser.findOuncesForWeek('2022/03/19')).to.equal('no such date');

    });
});
