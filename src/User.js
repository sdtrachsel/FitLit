class User {
    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.address = user.address
        this.email = user.email
        this.strideLength = user.strideLength
        this.dailyStepGoal = user.dailyStepGoal
        this.friends = user.friends
    }

    findFirstName(){
        const firstName = this.name.split(" ")

        return firstName[0]
    }
}

export default User;