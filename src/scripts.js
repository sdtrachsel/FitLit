// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';


// An example of how you tell webpack to use a JS file

import userData from './data/users';


import SomeClassYouChangeTheName from './SomeClassYouChangeTheName';

import { fetchAllData } from './apiCalls';
import UserRepository from './UserRepository';
import User from './User';
import Sleep from './Sleep';
import Activity from './Activity';
// import Hydration from './Hydration';


const newClass = new SomeClassYouChangeTheName();