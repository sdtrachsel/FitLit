class Hydration {
    constructor(id, hydrationLogs){
        this.userId = id;
        this.userHydrationLogs = hydrationLogs.hydrationData.filter((log) => {
            return log.userID === id
        })
    }

    findMostRecentDay(){
        return this.userHydrationLogs[0].date
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

    findOuncesForWeek(date) {
        const selectedDayIndex = this.userHydrationLogs.findIndex(log => log.date === date);

        const sevenDayDetail = this.userHydrationLogs.slice(selectedDayIndex, selectedDayIndex +7).map(log => log.numOunces);

        let lastWeekDetails = [0, 0, 0, 0, 0, 0, 0]

        sevenDayDetail.forEach((log, index) => {
            lastWeekDetails[index] = log;
        });

        if (selectedDayIndex < 0) {
            return 'no such date';
        } else {
            return lastWeekDetails;
        }
    };
   
  }
  
  export default Hydration;