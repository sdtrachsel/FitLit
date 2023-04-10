// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';


// An example of how you tell webpack to use a JS file

// import userData from './data/users';
// import SomeClassYouChangeTheName from './SomeClassYouChangeTheName';

import { fetchAllData } from './apiCalls';
import UserRepository from './UserRepository';
import User from './User';
import Sleep from './Sleep';
import Activity from './Activity';
import Hydration from './Hydration';

// Variables
let allUsers;
let user;
let userSleep;
let userHydration;
let userActivity;

//Selectors
const welcomeText = document.getElementById('welcomeText');
const userDisplay = document.getElementById('userInfo');
const dashboard = document.getElementById('dashboard');

window.addEventListener('load', () => {
    fetchAllData()
        .then(data => {
            console.log(allUsers)
            allUsers = new UserRepository(data[0]);
            user = new User(allUsers.generateRandomId())
            userSleep = new Sleep(user.id, data[2])
            userHydration = new Hydration(user.id, data[1])
            userActivity = new Activity(allUsers.findUserById(user.id), data[3])
            loadPage()
        })
})

function loadPage() {
    setWelcome()
    setUserDisplay()
    displayWidgets()
    // displayHydrationWidgets()
    // displaySleepWidgets()
    // displayActivityWidgets()
}

function displayWidgets(){
    displayDayInfo(userActivity.findMostRecentDay().minutesActive, 'Active Minutes')
    displayDayInfo(userActivity.findMostRecentDay().numSteps, 'Steps')
    displayDayInfo(userActivity.calculateMilesPerDay(userActivity.findMostRecentDay().date), 'Miles')
    displayWeekInfo('Step Goal Last 7 Days', userActivity.findStepGoalLastSevenDays(), 'goalMet')
    displayDayInfo(userHydration.findOuncesByDay(userHydration.findMostRecentDay()), 'Ounces Drank')
    displayWeekInfo('Ounces Last 7 Days', userHydration.findOuncesLastSevenDays(), 'numOunces')
    displayDayInfo(userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'hoursSlept'), 'Hours Slept')
    displayWeekInfo('Hours Slept Last 7 Days', userSleep.findDetailByWeek('hoursSlept'), 'hoursSlept')
    displayDayInfo(userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'sleepQuality'), 'Sleep Quality') 
    displayWeekInfo('Sleep Quality Last 7 Days', userSleep.findDetailByWeek('sleepQuality'), 'sleepQuality')
}    

// function displayHydrationWidgets() {
//     displayDayInfo(userHydration.findOuncesByDay(userHydration.findMostRecentDay()), 'Ounces Drank')
//     displayWeekInfo('Ounces Last 7 Days', userHydration.findOuncesLastSevenDays(), 'numOunces')
// }

// function displaySleepWidgets(){
//     displayDayInfo(userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'hoursSlept'), 'Hours Slept')
//     displayWeekInfo('Hours Slept Last 7 Days', userSleep.findDetailByWeek('hoursSlept'), 'hoursSlept')
//     displayDayInfo(userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'sleepQuality'), 'Sleep Quality') 
//     displayWeekInfo('Sleep Quality Last 7 Days', userSleep.findDetailByWeek('sleepQuality'), 'sleepQuality')
// }

// function displayActivityWidgets(){
//     displayDayInfo(userActivity.findMostRecentDay().numSteps, 'Steps')
//     displayWeekInfo('Step Goal Last 7 Days', userActivity.findStepGoalLastSevenDays(), 'goalMet')
//     displayDayInfo(userActivity.calculateMilesPerDay(userActivity.findMostRecentDay().date), 'Miles')
//     displayDayInfo(userActivity.findMostRecentDay().minutesActive, 'Active Minutes')

// }

function setWelcome() {
    welcomeText.innerText = `Welcome ${user.findFirstName()}!`
}

function setUserDisplay() {
    userDisplay.innerHTML += `
    <section class ="demographics">
        <p>${user.name}</p>
        <p>${user.address}</p>
        <p>${user.email}</p>
    </section>
    <section class="goals">
        <p>Stride length: ${user.strideLength}</p>
        <p>Step Goal: ${user.dailyStepGoal}</p>
    </section>`
}

function displayDayInfo(amount, unit) {
    dashboard.innerHTML += `
    <section class="day-info">
        <h2>${unit}</h2>
        <p>${amount}</p>
    </section>`
}

function displayWeekInfo(title, dataList, dataDetail) {
    dashboard.innerHTML += `
        <section class="week-info">
            <h2>${title}</h2>
            <table>
                <tr class="date-heading">
                    <th>${dataList[0].date}</th>
                    <th>${dataList[1].date}</th>
                    <th>${dataList[2].date}</th>
                    <th>${dataList[3].date}</th>
                    <th>${dataList[4].date}</th>
                    <th>${dataList[5].date}</th>
                    <th>${dataList[6].date}</th>
                </tr>
                <tr class="date-data">
                    <td>${dataList[0][dataDetail]}</td>
                    <td>${dataList[1][dataDetail]}</td>
                    <td>${dataList[2][dataDetail]}</td>
                    <td>${dataList[3][dataDetail]}</td>
                    <td>${dataList[4][dataDetail]}</td>
                    <td>${dataList[5][dataDetail]}</td>
                    <td>${dataList[6][dataDetail]}</td>
                </tr>
            </table>
        </section>`
}

