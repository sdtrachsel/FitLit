import './css/styles.css';
import '../node_modules/js-datepicker/dist/datepicker.min.css';
import './images/drink-water.png';
import './images/steps.png';
import './images/running.png';
import './images/wake-up.png';
import './images/push-up.png';
import './images/gm-logo.png';
import datepicker from 'js-datepicker'
import { fetchAllData, postHydrationInfo } from './apiCalls';
import UserRepository from './UserRepository';
import User from './User';
import Sleep from './Sleep';
import Activity from './Activity';
import Hydration from './Hydration';
import motivations from './motivations';
import feedback from './feedback';
import motivationVideos from './motivation-videos';

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
const motivationForm = document.getElementById('motivationForm')
const motivationBtns = document.getElementsByName('motivation-level')
const montivationVideo = document.getElementById('videoHolder')
const motivationVideoDisplay = document.getElementById('motivationVideo')
const closeVideoDisplay = document.getElementById('closeVideo')
const ouncesForm = document.getElementById('ouncesForm')
const ouncesFormDate = document.getElementById('formLogDate')
const ouncesFormOunces = document.getElementById('formLogOunces')
const formFeedback = document.getElementById('formFeedback')
const picker = datepicker(ouncesFormDate, {
    formatter: (input, date) => {
        const value = date.toLocaleDateString()
        input.value = value
    }
});

// Event Listeners
ouncesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitOuncesForm()
});

motivationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    displayMoitivationResult(user.findFirstName(), findMotivationSelection())
    clearMotivationSelection()
})

closeVideoDisplay.addEventListener('click', stopVideo)

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
    welcomeHeading.innerText = `Welcome ${user.findFirstName()}!`
    welcomeText.classList.add('hidden')
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
    displayDayInfo(dashboardRowOne, userHydration.findOuncesByDay(userHydration.findMostRecentDay()), 'Ounces Drank', 'ozDay');
};

function generateRowTwoWidgets() {
    dashboardRowTwo.innerHTML = ''
    displayDayInfo(dashboardRowTwo, userActivity.findMostRecentDay().numSteps, 'Steps');
    addImage(dashboardRowTwo, './images/steps.png', 'Cartoon man running really fast', 'single');
    displayDayInfo(dashboardRowTwo, userActivity.calculateMilesPerDay(userActivity.findMostRecentDay().date), 'Miles');
    displayWeekInfo(dashboardRowTwo, 'Ounces Last 7 Days', userHydration.findOuncesLastSevenDays(), 'numOunces', 'ozWeek');
};

function genterateRowThreeWidgets() {
    dashboardRowThree.innerHTML = ''
    addImage(dashboardRowThree, './images/running.png', 'Cartoon man going up steps', 'single')
    displayWeekInfo(dashboardRowThree, 'Hours Slept Last 7 Days', userSleep.findDetailByWeek('hoursSlept'), 'hoursSlept');
    displayDayInfo(dashboardRowThree, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'hoursSlept'), 'Hours Slept');
    addImage(dashboardRowThree, './images/wake-up.png', 'Cartoon man happy to be awake', 'single');
};

function genterateRowFourWidgets() {
    dashboardRowFour.innerHTML = ''
    displayDayInfo(dashboardRowFour, userSleep.findDetailByDay(userSleep.findMostRecentDay(), 'sleepQuality'), 'Sleep Quality');
    addImage(dashboardRowFour, './images/push-up.png', 'Cartoon man doing push-ups', 'double');
    displayWeekInfo(dashboardRowFour, 'Sleep Quality Last 7 Days', userSleep.findDetailByWeek('sleepQuality'), 'sleepQuality');

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
};

function validateOunceFormOz() {
    const subOz = Number(ouncesFormOunces.value);

    if ((typeof subOz) === 'number' && subOz > 0 && subOz < 1001) {
        return true;
    } else {
        displayFormFeedback('invalidOz');
        return false;
    };
};

function validateOunceFormDate() {
    const subDate = formatFormSubDate(ouncesFormDate.value);
    const loggedDates = userHydration.userHydrationLogs.map(log => log.date);
    const date = new Date(subDate)

    if (loggedDates.includes(subDate)) {
        displayFormFeedback('logExists');
        return false;
    } else if (date.getTime() < Date.parse('2023/01/01')) {
        displayFormFeedback('tooEarly');
        return false;
    } else {
        return true
    }
};

function checkIsDate(dateString) {
    const date = Date.parse(dateString);

    if (date) {
        return true;
    } else {
        displayFormFeedback('invalidDate');
        return false;
    }
};

function formatFormSubDate(formDate) {
    const date = formDate.split('/');
    let formDay = date[1];
    let formMonth = date[0];
    let formYear = date[2];

    if (formDay.length < 2) {
        formDay = '0' + formDay;
    };

    if (formMonth.length < 2) {
        formMonth = '0' + formMonth;
    };

    return (`${formYear}/${formMonth}/${formDay}`);
};

function submitOuncesForm() {
    if (checkIsDate(ouncesFormDate.value) && validateOunceFormDate() && validateOunceFormOz()) {
        var newLog = {
            "userID": user.id,
            "date": formatFormSubDate(ouncesFormDate.value),
            "numOunces": Number(ouncesFormOunces.value)

        };

        postHydrationInfo(newLog, assignNewHydrationLogs, displayFormFeedback, resetForm);
    }

};

function assignNewHydrationLogs(log) {
    userHydration.userHydrationLogs.push(log)
    userHydration.userHydrationLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    generateRowOneWidgets();
    generateRowTwoWidgets();
    addTempStyle('ozWeek', 'highlight');
    addTempStyle('ozDay', 'highlight');
}

function displayFormFeedback(type) {
    formFeedback.innerText = `${feedback[type]}`;
};

function clearFormFeeback() {
    formFeedback.innerHTML = '';
};

function resetForm() {
    ouncesFormOunces.value = '';
    setFormDate();
    setTimeout(clearFormFeeback, 3000);
};

function setFormDate() {
    ouncesFormDate.value = '';
    const logToDate = new Date(userHydration.findMostRecentDay());
    const increasedDate = new Date(logToDate.getTime() + (24 * 60 * 60 * 1000));
    picker.navigate(increasedDate);
};

function displayDayInfo(location, amount, unit, optId) {
    let divID;
    if (!optId) {
        divID = '';
    } else {
        divID = ` id= ${optId}`;
    }

    location.innerHTML += `
    <section class="day-info"${divID}>
        <h2>${unit}</h2>
        <p>${amount}</p>
    </section>`;
};

function displayWeekInfo(location, title, dataList, dataDetail, optId) {
    let divId;
    if (!optId) {
        divId = '';
    } else {
        divId = optId;
    }

    location.innerHTML += `
        <section class="week-info" id=${divId}>
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

function addImage(location, image, altText, stylingClass) {
    location.innerHTML += `
    <section>
        <image src="${image}" alt="${altText}" class= "dashboard-image ${stylingClass}" >
    </section>`;
};

function getMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * motivations.length);
    return motivations[randomIndex];
};

function displayMotivationalQuote() {
    motivationalQuote.innerHTML = '';
    motivationalQuote.innerHTML = `<p class="quote">${getMotivationalQuote()}</p>`;
};

function findMotivationSelection() {
    const selection = Array.from(motivationBtns).find(btn => {
        return btn.checked === true;
    })
    return selection.value;
};

function displayMoitivationResult(firstName, motivationType) {
    welcomeHeading.innerText = `${motivationVideos[motivationType].heading} ${firstName}!`;
    welcomeText.innerText = `${motivationVideos[motivationType].text}`;
    montivationVideo.innerHTML = motivationVideos[motivationType].video;

    welcomeText.classList.remove('hidden');
    userGoalsDisplay.classList.add('hidden');
    motivationVideoDisplay.classList.remove('hidden');
};

function stopVideo() {
    montivationVideo.innerHTML = '';
    userGoalsDisplay.classList.remove('hidden')
    motivationVideoDisplay.classList.add('hidden')
}

function addTempStyle(elId, styClass) {
    const element = document.getElementById(elId);

    element.classList.add(styClass);

    setTimeout(() => {
        removeStyle(elId, styClass);
    }, 4000);

}

function removeStyle(elId, styClass) {
    const element = document.getElementById(elId);
    element.classList.remove(styClass);
}

function clearMotivationSelection() {
    motivationBtns.forEach((btn) => {
        btn.checked = false;
    });
};
