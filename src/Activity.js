class Activity {
    constructor(userInfo, activityFile){
        this.userId = userInfo.id;
        this.userInfo = userInfo;
        this.activityLogs = activityFile.activityData.filter(log => userInfo.id  === log.userID);
    }

    milesPerDay(day){
        const selectedDay = this.activityLogs.find(log => log.date === day);
        const miles = (selectedDay.numSteps * this.userInfo.strideLength) / 5280;
    
        return Math.round(miles * 10) / 10;
    }

    activeMinutesByDay(date){
        const dayDetail = this.activityLogs.find((log) => {
            return log.date === date;
        })

        return dayDetail.minutesActive;
    }

    stepGoalReached(date){
        const dayDetail = this.activityLogs.find((log) => {
            return log.date === date
        });
        const stepGoal = this.userInfo.dailyStepGoal;

        return stepGoal <= dayDetail.numSteps;
    }

  }
  
  export default Activity;