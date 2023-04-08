class Activity {
    constructor(userInfo, activityFile){
        this.userId = userInfo.id;
        this.userInfo = userInfo;
        this.activityLogs = activityFile.activityData.filter(log => userInfo.id  === log.userID);
    }
    
    findMostRecentDay() {
        return this.activityLogs[this.activityLogs.length - 1].date;
    }

    calculateMilesPerDay(day){
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

    findStepGoalReachedDay(date){
        const dayDetail = this.activityLogs.find((log) => {
            return log.date === date
        });
        const stepGoal = this.userInfo.dailyStepGoal;

        return stepGoal <= dayDetail.numSteps;
    }

    findStepsLastSevenDays() {
        const sevenDayDetail = this.activityLogs.slice(-7).map(log => log.numSteps);

        return sevenDayDetail
    }

    findStepGoalLastSevenDays() {
        const sevenDayDetail = this.findStepsLastSevenDays()       

        const sevenDayGoalDetail = sevenDayDetail.map((daySteps) => {
            if (this.userInfo.dailyStepGoal <= daySteps) {
                return true
            } else {
                return false
            }
        })
        return sevenDayGoalDetail
    };
}
 
  export default Activity;