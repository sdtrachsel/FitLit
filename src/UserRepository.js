class UserRepository {
    constructor(userList){
      this.users = userList.users;
    };

    findUserById(id){
      const user = this.users.find((user) => {
        return user.id === id ;
      })
      return user;
    };

    findOverAllStepGoalAvg(){
       const totalStepGoal = this.users.reduce((acc, currentValue) => {
        return acc += currentValue.dailyStepGoal
       },0);

       return Math.round(totalStepGoal / this.users.length);
    };

    generateRandomId(){
      const idOnly = this.users.map(user => user.id)
      const randomIndex = Math.floor(Math.random() * this.users.length);
      
      return idOnly[randomIndex];
      };
    
  }
  
  export default UserRepository;