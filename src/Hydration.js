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
        const sevenDayDetail = this.userHydrationLogs.slice(-7).map(log => log.numOunces);

        return sevenDayDetail
    };
   
  }
  
  export default Hydration;