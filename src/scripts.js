// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/drink-water.png';
import './images/steps.png';
import './images/running.png';
import './images/wake-up.png';
import './images/push-up.png';

// An example of how you tell webpack to use a JS file
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
const dashboardRowOne = document.getElementById('rowOne');
const dashboardRowTwo = document.getElementById('rowTwo');
const dashboardRowThree = document.getElementById('rowThree');
const dashboardRowFour = document.getElementById('rowFour');

window.addEventListener('load', () => {
    fetchAllData()
        .then(data => {
            allUsers = new UserRepository(data[0]);
            user = new User(allUsers.generateRandomId());
            userSleep = new Sleep(user.id, data[2])
            userHydration = new Hydration(user.id, data[1]);
            userActivity = new Activity(allUsers.findUserById(user.id), data[3]);
            loadPage();
        })
})

function loadPage() {
    setWelcome();
    setUserDisplay();
    makeWidgets();
}

function makeWidgets(){
    displayWeekInfo(dashboardRowOne, 'Step Goal Last 7 Days', userActivity.findStepGoalLastSevenDays(), 'goalMet');
    displayDayInfo(dashboardRowOne, userActivity.findMostRecentDay().minutesActive, 'Active Minutes');
    addImage (dashboardRowOne, './images/drink-water.png', 'Cartoon man drinking water', 'single' );
    displayDayInfo(dashboardRowOne, userHydration.findOuncesByDay(userHydration.findMostRecentDay()), 'Ounces Drank');

    displayDayInfo(dashboardRowTwo, userActivity.findMostRecentDay().numSteps, 'Steps');
    addImage (dashboardRowTwo, './images/steps.png', 'Cartoon man running really fast', 'single' );
    displayDayInfo( dashboardRowTwo, userActivity.calculateMilesPerDay(userActivity.findMostRecentDay().date), 'Miles');
    displayWeekInfo(dashboardRowTwo,'Ounces Last 7 Days', userHydration.findOuncesLastSevenDays(), 'numOunces');

    addImage (dashboardRowThree, './images/running.png', 'Cartoon man going up steps', 'single' )
    displayWeekInfo(dashboardRowThree, 'Hours Slept Last 7 Days', userSleep.findDetailByWeek('hoursSlept'), 'hoursSlept');
    displayDayInfo(dashboardRowThree, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'hoursSlept'), 'Hours Slept');
    addImage (dashboardRowThree, './images/wake-up.png', 'Cartoon man happy to be awake', 'single');

    displayDayInfo(dashboardRowFour, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'sleepQuality'), 'Sleep Quality'); 
    addImage(dashboardRowFour,'./images/push-up.png','Cartoon man doing push-ups', 'double');
    displayWeekInfo(dashboardRowFour, 'Sleep Quality Last 7 Days', userSleep.findDetailByWeek('sleepQuality'), 'sleepQuality');
}    

function setWelcome() {
    welcomeText.innerText = `Welcome ${user.findFirstName()}!`;
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
    </section>`;
}

function displayDayInfo(location, amount, unit) {
    location.innerHTML += `
    <section class="day-info">
        <h2>${unit}</h2>
        <p>${amount}</p>
    </section>`;
}

function addImage (location, image, altText, stylingClass ){
    location.innerHTML += `
    <section>
        <image src="${image}" alt="${altText}" class= "dashboard-image ${stylingClass}" >
    </section>`;
}

function displayWeekInfo(location, title, dataList, dataDetail) {
    location.innerHTML += `
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