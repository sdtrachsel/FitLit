class Activity {
    constructor(userInfo, activityFile) {
        this.userId = userInfo.id;
        this.userInfo = userInfo;
        this.activityLogs = activityFile.activityData.filter(log => userInfo.id === log.userID);
    }

    findMostRecentDay() {
        return this.activityLogs[this.activityLogs.length - 1];
    }

    calculateMilesPerDay(day) {
        const selectedDay = this.activityLogs.find(log => log.date === day);
        const miles = (selectedDay.numSteps * this.userInfo.strideLength) / 5280;
        return Math.round(miles * 10) / 10;
    }

    findActiveMinutesByDay(date){
        const dayDetail = this.activityLogs.find((log) => {
            return log.date === date;
        })

        return dayDetail.minutesActive;
    }

    findStepGoalReachedDay(date) {
        const dayDetail = this.activityLogs.find((log) => {
            return log.date === date
        });
        const stepGoal = this.userInfo.dailyStepGoal;

        return stepGoal <= dayDetail.numSteps;
    }

    findStepGoalLastSevenDays() {
        const sevenDays = this.activityLogs.slice(-7)
        const sevenDayDetail = sevenDays.map((log) => {
            let dayLog = {}
            dayLog.date = log.date.slice(5)
            dayLog.numSteps = log.numSteps
            if (this.userInfo.dailyStepGoal <= log.numSteps) {
                dayLog.goalMet = 'Yes!'
            } else {
                dayLog.goalMet = 'No'
            }
            return dayLog
        });

        return sevenDayDetail
    }
}

export default Activity;