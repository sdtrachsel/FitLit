class Hydration {
    constructor(id, hydrationLogs){
        this.userId = id;
        this.userHydrationLogs = hydrationLogs.hydrationData.filter((log) => {
            return log.userID === id
        })
    }

    findMostRecentDay(){
        return this.userHydrationLogs[this.userHydrationLogs.length - 1].date
    }

    calculateAllTimeOunceAvg(){
        const totalOunces = this.userHydrationLogs.reduce((total , currentVal) => {
            return total += currentVal.numOunces;
        }, 0)

        return Math.round(totalOunces /this.userHydrationLogs.length )
    }

    findOuncesByDay(date){
        const ouncesByDay = this.userHydrationLogs.find((log) => {
            return log.date === date;
        })

        if (ouncesByDay){
            return ouncesByDay.numOunces;
        } else {
            return 'no such date';
        }
    }

    findOuncesLastSevenDays() {
        const sevenDays = this.userHydrationLogs.slice(-7)
        const sevenDayDetail= sevenDays.map((log) => {
            let dayLog = {}
            dayLog.date = log.date.slice(5)
            dayLog.numOunces = log.numOunces
            return dayLog
        });

        return sevenDayDetail
    };
   
  }
  
  export default Hydration;