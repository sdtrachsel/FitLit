// An example of how you tell webpack to use a CSS file
import './css/styles.css';

import './images/drink-water.png';
import './images/steps.png';
import './images/running.png';
import './images/wake-up.png';
import './images/push-up.png';

import { fetchAllData } from './apiCalls';
import UserRepository from './UserRepository';
import User from './User';
import Sleep from './Sleep';
import Activity from './Activity';
import Hydration from './Hydration';
import quotes from './quotes';

// Variables
let allUsers;
let user;
let userSleep;
let userHydration;
let userActivity;

// Selectors
const welcomeHeading = document.getElementById('welcomeHeading');
const welcomeText = document.getElementById('welcomeText')
const userDemographicsDisplay = document.getElementById('userDemographics')
const userGoalsDisplay = document.getElementById('userGoals')
const motivationalQuote = document.getElementById('motivationalQuote')
const dashboardRowOne = document.getElementById('rowOne');
const dashboardRowTwo = document.getElementById('rowTwo');
const dashboardRowThree = document.getElementById('rowThree');
const dashboardRowFour = document.getElementById('rowFour');
const ouncesFormDate = document.getElementById('formLogDate')
const ouncesFormOunces = document.getElementById('formLogOunces')
const ouncesFormSubmit = document.getElementById('ounceSubmit')
const formFeedback = document.getElementById('formFeedback')
const motivationBtns = document.getElementsByName('motivation-level')
const motivationSubmit = document.getElementById('motivSubmit')

ouncesFormSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event)
    submitForm()
});

motivationSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    createNewWelcome(user.findFirstName())
    clearMotivationSelection()
})

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
    setUserGoals();
    setFormDate();
    displayMotivationalQuote();
    generateAllWidgets();
}

function generateAllWidgets() {
    generateRowOneWidgets()
    generateRowTwoWidgets()
    genterateRowThreeWidgets()
    genterateRowFourWidgets()

};

function generateRowOneWidgets() {
    dashboardRowOne.innerHTML = ''
    displayWeekInfo(dashboardRowOne, 'Step Goal Last 7 Days', userActivity.findStepGoalLastSevenDays(), 'goalMet');
    displayDayInfo(dashboardRowOne, userActivity.findMostRecentDay().minutesActive, 'Active Minutes');
    addImage(dashboardRowOne, './images/drink-water.png', 'Cartoon man drinking water', 'single');
    displayDayInfo(dashboardRowOne, userHydration.findOuncesByDay(userHydration.findMostRecentDay()), 'Ounces Drank');
}

function generateRowTwoWidgets() {
    dashboardRowTwo.innerHTML = ''
    displayDayInfo(dashboardRowTwo, userActivity.findMostRecentDay().numSteps, 'Steps');
    addImage(dashboardRowTwo, './images/steps.png', 'Cartoon man running really fast', 'single');
    displayDayInfo(dashboardRowTwo, userActivity.calculateMilesPerDay(userActivity.findMostRecentDay().date), 'Miles');
    displayWeekInfo(dashboardRowTwo, 'Ounces Last 7 Days', userHydration.findOuncesLastSevenDays(), 'numOunces');
}

function genterateRowThreeWidgets() {
    dashboardRowThree.innerHTML = ''
    addImage(dashboardRowThree, './images/running.png', 'Cartoon man going up steps', 'single')
    displayWeekInfo(dashboardRowThree, 'Hours Slept Last 7 Days', userSleep.findDetailByWeek('hoursSlept'), 'hoursSlept');
    displayDayInfo(dashboardRowThree, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'hoursSlept'), 'Hours Slept');
    addImage(dashboardRowThree, './images/wake-up.png', 'Cartoon man happy to be awake', 'single');
}

function genterateRowFourWidgets() {
    dashboardRowFour.innerHTML = ''
    displayDayInfo(dashboardRowFour, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'sleepQuality'), 'Sleep Quality');
    addImage(dashboardRowFour, './images/push-up.png', 'Cartoon man doing push-ups', 'double');
    displayWeekInfo(dashboardRowFour, 'Sleep Quality Last 7 Days', userSleep.findDetailByWeek('sleepQuality'), 'sleepQuality');

}

function setWelcome() {
    welcomeText.classList.add('hidden')
    welcomeHeading.innerText = `Welcome ${user.findFirstName()}!`;
};

function setUserDisplay() {
    userDemographicsDisplay.innerHTML = `
         <p>${user.name}</p>
        <p>${user.address}</p>
        <p>${user.email}</p>`;
};

function setUserGoals() {
    userGoalsDisplay.innerHTML = `
    <p>Stride length: ${user.strideLength}</p>
    <p>Step Goal: ${user.dailyStepGoal}</p>`;
}

function submitForm() {
    const newLog = {
        "userID": user.id,
        "date": ouncesFormDate.value,
        "numOunces": ouncesFormOunces.value
    }

    fetch('http://localhost:3001/api/v1/hydration', {
        method: 'POST',
        body: JSON.stringify(newLog),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            updateOuncesInformation(json)
            displaySuccessFeedback()
            resetForm()
        })
        .catch(err => {
            displayFailureFeedback()
            resetForm()
        });
}

function updateOuncesInformation(data) {
    userHydration.userHydrationLogs.push(data)
    generateRowOneWidgets()
    generateRowTwoWidgets()
}

function displaySuccessFeedback() {
    formFeedback.innerText = 'Glug! Glug! Nice work!';
}

function displayFailureFeedback() {
    formFeedback.innerText = 'Uh oh! Try again later!';
}

function clearFormFeeback() {
    formFeedback.innerHTML = ''
}

function resetForm() {
    ouncesFormOunces.value = ''
    setFormDate()
    setTimeout(clearFormFeeback, 2000)
}

function setFormDate() {
    const logToDate = new Date(userHydration.findMostRecentDay())
    const increasedDate = new Date(logToDate.getTime() + (24 * 60 * 60 * 1000))
    const increasedDateMonth = increasedDate.getMonth() + 1
    const increasedDateDay = increasedDate.getDate()

    let newStringMonth;
    if (increasedDateMonth.toString().length < 2) {
        newStringMonth = `0${increasedDateMonth}`
    } else {
        newStringMonth = increasedDateMonth
    }

    let newStringDay;
    if (increasedDateDay.toString().length < 2) {
        newStringDay = `0${increasedDateDay}`
    } else {
        newStringDay = increasedDateDay
    }

    const newDateToString = `${increasedDate.getFullYear()}/${newStringMonth}/${newStringDay}`

    ouncesFormDate.value = newDateToString
    ouncesFormDate.placeHolder = newDateToString
}

function displayDayInfo(location, amount, unit) {
    location.innerHTML += `
    <section class="day-info">
        <h2>${unit}</h2>
        <p>${amount}</p>
    </section>`;
};

function addImage(location, image, altText, stylingClass) {
    location.innerHTML += `
    <section>
        <image src="${image}" alt="${altText}" class= "dashboard-image ${stylingClass}" >
    </section>`;
};

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
        </section>`;
};

function getMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)

    return quotes[randomIndex]
}

function displayMotivationalQuote() {
    motivationalQuote.innerHTML = ''
    motivationalQuote.innerHTML = `<p>${getMotivationalQuote()}</p>`
}

function findMotivationSelection() {
    const selection = Array.from(motivationBtns).find(btn => {
        return btn.checked === true;
    })
    return selection.value;
}

function createNewWelcome(firstName) {
    let motivationLevel = findMotivationSelection()

    if (motivationLevel === 'stillInBed') {
        welcomeHeading.innerText = `Wake-up ${firstName}!`;
        welcomeText.innerText = `The world isn't going to conquer itself!`;

    } else if (motivationLevel === 'cantEven') {
        welcomeHeading.innerText = `Hustle up ${firstName}!`
        welcomeText.innerText = `The worms won't catch themselves!`

    } else if (motivationLevel === 'meh') {
        welcomeHeading.innerText = `Watchout ${firstName}!`
        welcomeText.innerText = `You are just warming up!`

    } else if (motivationLevel === 'given100') {
        welcomeHeading.innerText = `Buckle-up ${firstName}`
        welcomeText.innerText = `You are flying!`

    } else if (motivationLevel === 'lfg') {
        welcomeHeading.innerText = `${firstName} you did!`
        welcomeText.innerText = `BEAST MODE ACTIVATED!`
    }

    welcomeText.classList.remove('hidden')
}

function clearMotivationSelection() {
    motivationBtns.forEach((btn) => {
        btn.checked = false;
    })
}