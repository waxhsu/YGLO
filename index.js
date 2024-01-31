import { shopObj, mainAchievementsObj, upgradeAchievementsObj, randomEventPool, randomRejectionPool } from './data.js';

// Initialize variables
let timer = null;
let jobApplications = 0;
let motivation = 0;
let autoApplications = [];
let totalClicksPerSecond = 0;
let manualClick = 0;
let totalRejections = 0;
let goodRandomEvents = 0;
let badRandomEvents = 0;
let totalRandomEvents = 0;
let randomRejectInterval = 5000;
let randomEventInterval = 5000;
let clickValue = 1;

/////////// PLAY TEST INFO ////////
// document.getElementById('clickValueInfo').textContent = `clickValue = ${clickValue}`;
// document.getElementById('randomEventInfo').textContent = `randomEvent = ${randomEventInterval/1000} sec`;
// document.getElementById('rejectEventInfo').textContent = `rejectEvent = ${randomRejectInterval/1000} sec`;




////////////////////////////////////////////////////////////
///////////////////    MAIN GAMEPLAY   /////////////////////
////////////////////////////////////////////////////////////
  
// Define a variable to keep track of sound state (on or off)
let isSoundOn = false;

// Add an event listener to the sound toggle button
document.getElementById('soundToggleBtn').addEventListener('click', toggleSound);

// Function to toggle sound state and update button text
function toggleSound() {
  isSoundOn = !isSoundOn;
  updateButtonText();

  // You can add more logic here to stop playing sounds if the state is off
}

// Function to update button text based on sound state
function updateButtonText() {
  const buttonText = isSoundOn ? 'Sound On' : 'Sound Off';
  document.getElementById('soundToggleBtn').textContent = buttonText;
}

const clickSounds = [
  './sound/YGLOclick1.mov',
  './sound/YGLOclick2.mp3',
  './sound/YGLOclick3.mp3',
];

function playRandomClickSound() {
  if (isSoundOn) {
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const audio = new Audio(clickSounds[randomIndex]);
    audio.play();
  }
}

const inboxSounds = [
  './sound/YGLOnotification.mov',
];

function playRandomInboxSound() {
  if (isSoundOn) {
    const audio = new Audio(inboxSounds);
    audio.play();
  }
}


// Function to handle clicking and adding job applications
function clickForJobApplications() {
    motivation += 0.217 * clickValue;
    manualClick += 1;
    jobApplications += clickValue;
    updateJobApplications();
    updateMotivation();
    updateRejection();
    cycleJobPostings(); 
    updateJobPostings();
    playRandomClickSound();
}

// Add a click event listener to the button
const clickButton = document.getElementById("click-button");
clickButton.addEventListener("click", clickForJobApplications);


///////////////////////////////////////////////////////////
/////////////////  UPDATE STATS INFO  /////////////////////
///////////////////////////////////////////////////////////


function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to update the motivation count on the screen
function formatLargeNumberAll(value) {
  if (value < 1000000) {
    return formatNumberWithCommas(Math.round(value));
  } else {
    const million = 1000000;
    const billion = 1000000000;
    const trillion = 1000000000000;

    if (value < billion) {
      return `${(value / million).toFixed(3)} million`;
    } else if (value < trillion) {
      return `${(value / billion).toFixed(3)} billion`;
    } else {
      return `${(value / trillion).toFixed(3)} trillion`;
    }
  }
}

function updateJobApplications() {
  const jobApplicationsElement = document.getElementById("jobs-applied-value");
  const formattedValue = formatLargeNumberAll(jobApplications);
  jobApplicationsElement.textContent = formattedValue;
}

function updateAPSDisplay() {
  const apsElement = document.getElementById("aps-value");
  const formattedValue = formatLargeNumberAll(totalClicksPerSecond);
  apsElement.textContent = formattedValue;
}

function updateMotivation() {
  const motivationElement = document.getElementById("motivation-value");
  const formattedValue = formatLargeNumberAll(motivation);
  motivationElement.textContent = `Motivation: ${formattedValue}`;
}

function updateRejection() {
  const rejectionElement = document.getElementById("rejection-value");
  const formattedValue = formatLargeNumberAll(totalRejections);
  rejectionElement.textContent = formattedValue;
}







// Function to calculate the total clicks per second
function calculateTotalClicksPerSecond() {
  totalClicksPerSecond = 0;
  for (const app of shopObj) {
      totalClicksPerSecond += app.count * app.clicksPerSecond;
  }
}



////////////////////////////////////////////////////////////
///////////////////     SHOP STUFF    //////////////////////
////////////////////////////////////////////////////////////

function updateShop() {
  const shopElement = document.getElementById("shop");
  shopElement.innerHTML = ""; // Clear the previous shop items

  shopObj.forEach((shop, index) => {
    const iconElement = document.createElement("img");
    iconElement.src = shop.icon;
    iconElement.className = "shop-icon";

    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";

    const nameElement = document.createElement("div");
    nameElement.className = "item-name";
    nameElement.textContent = shop.name;

    const costElement = document.createElement("div");
    costElement.className = "item-cost";
    costElement.textContent = `Cost: -${shop.cost} Motivation`;

    const clicksPerSecondElement = document.createElement("div");
    clicksPerSecondElement.className = "item-aps";
    clicksPerSecondElement.textContent = `Apps/sec: +${shop.clicksPerSecond}`;

    const countElement = document.createElement("div");
    countElement.className = "item-count";
    countElement.textContent = `owned: ${shop.count}`;

    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(costElement);
    infoContainer.appendChild(clicksPerSecondElement);
    infoContainer.appendChild(countElement);

    shopItem.appendChild(iconElement);
    shopItem.appendChild(infoContainer);

    if (index === 0 || shopObj[index - 1].count >= 1) {
      // Display the first item or the item after the one with count >= 10
      shopItem.addEventListener("click", () => buyAutoApplication(shop));
      shopElement.appendChild(shopItem);
    } else {
      // Grey out and hide the items that don't meet the condition
      shopItem.classList.add("greyed-out");
      shopItem.style.display = "none";
    }
  });
}


// Function to buy an AutoApplication
function buyAutoApplication(app) {
  if (motivation >= app.cost) {
      motivation -= app.cost;
      app.count += 1;
      app.cost = Math.floor(app.cost * 1.1); // Cost scales exponentially
      playRandomClickSound();
      updateMotivation();
      updateShop();
      calculateTotalClicksPerSecond();
      updateAPSDisplay(); 
      updateShopUpgrades(); 
  }
}

// Create an array to store the shop upgrade variables
let shopUpgradeCount = autoApplications.map(app => app.count);

// Function to update shop upgrade variables
function updateShopUpgrades() {
  shopObj.forEach((app, index) => {
    shopUpgradeCount[index] = app.count;
  });
}


////////////////////////////////////////////////////////////
///////////////////    AUTOCLICKER    //////////////////////
////////////////////////////////////////////////////////////

function autoGenerateJobApplications() {
  jobApplications += totalClicksPerSecond;
  motivation += 0.1 * totalClicksPerSecond; 
  updateMotivation();
  updateRejection();
  updateJobApplications();
  updateAPSDisplay();
}

////////////////////////////////////////////////////////////
////////////////////   JOB POSTINGS   //////////////////////
////////////////////////////////////////////////////////////

import { jobPostingCycleObj } from './jobPostingCycleObj.js';

  // Shuffle the job postings array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(jobPostingCycleObj);
  
  let jobPostingsIndex = 0; // Track the current job posting index
  
  function cycleJobPostings() {
    // Remove the first job posting from the array
    const removedPosting = jobPostingCycleObj.shift();
    // Add it back to the end of the array
    jobPostingCycleObj.push(removedPosting);
  }
  

function updateJobPostings() {
  const jobPostingsElement = document.getElementById("job-postings");
  jobPostingsElement.innerHTML = ""; // Clear the previous job postings

  const firstPosting = jobPostingCycleObj[0];

  jobPostingCycleObj.forEach((posting, index) => {
    const jobPostingItem = document.createElement("div");
    jobPostingItem.className = "job-listing-item";
    if (index === 0) {
      jobPostingItem.classList.add("first-posting");
    }

    const iconElement = document.createElement("img");
    iconElement.src = posting.icon;
    iconElement.className = "icon";
    iconElement.alt = "ICON";

    const titleElement = document.createElement("div");
    titleElement.className = "job-listing-title";
    titleElement.textContent = posting.title;

    const companyElement = document.createElement("div");
    companyElement.className = "job-listing-company";
    companyElement.textContent = posting.company;

    const locationElement = document.createElement("div");
    locationElement.className = "job-listing-location";
    locationElement.textContent = posting.location;

    const payElement = document.createElement("div");
    payElement.className = "job-listing-pay";
    payElement.textContent = posting.pay;

    const detailsElement = document.createElement("div");
    detailsElement.className = "job-listing-box";
    detailsElement.appendChild(titleElement);
    detailsElement.appendChild(companyElement);
    detailsElement.appendChild(locationElement);
    detailsElement.appendChild(payElement);

    jobPostingItem.appendChild(iconElement);
    jobPostingItem.appendChild(detailsElement);

    jobPostingsElement.appendChild(jobPostingItem);
  });

  // Populate the job details divs with content from the first posting
  document.getElementById("job-detail-title").textContent = firstPosting.title;
  document.getElementById("job-detail-place").textContent = `${firstPosting.company} · ${firstPosting.location}`;
  document.getElementById("job-detail-pay").textContent = firstPosting.pay;

  document.getElementById("job-detail-about").textContent = firstPosting.about;

  const responsibilitiesElement = document.getElementById("job-detail-responsibilities");
  responsibilitiesElement.innerHTML = "";

  const responsibilitiesList = document.createElement("ul");
  firstPosting.responsibilities.forEach(responsibility => {
    const listItem = document.createElement("li");
    listItem.textContent = responsibility;
    responsibilitiesList.appendChild(listItem);
  });

  responsibilitiesElement.appendChild(responsibilitiesList);

  const qualificationsElement = document.getElementById("job-detail-qualifications");
  qualificationsElement.innerHTML = "";

  const qualificationsList = document.createElement("ul");
  firstPosting.qualifications.forEach(qualification => {
    const listItem = document.createElement("li");
    listItem.textContent = qualification;
    qualificationsList.appendChild(listItem);
  });

  qualificationsElement.appendChild(qualificationsList);
}

updateJobPostings();


///////////////////////////////////////////////////////////
/////////////////////  ACHIEVEMENTS  //////////////////////
///////////////////////////////////////////////////////////

function checkMainAchievement() {
  for (const achievement of mainAchievementsObj) {
    const { clicks, apps, rejections, badEvents, goodEvents, totalRandom, displayed, message1, message2, icon } = achievement;
    if ((
      (clicks && manualClick >= clicks) ||
      (apps && jobApplications >= apps) ||
      (rejections && totalRejections >= rejections) || 
      (badEvents && badRandomEvents >= badEvents) ||
      (goodEvents && goodRandomEvents >= goodEvents) ||
      (totalRandom && totalRandomEvents >= totalRandom)
      ) 
    && !displayed) {
      showAchievement(message1, message2, icon);
      
      achievement.displayed = true;
    }
  }
}


// Function to check for UPGRADEachievementsObj
function checkUpgradeAchievement(index) {
  for (const achievement of upgradeAchievementsObj) {
    const upgradeKey = `upgrade${index}`;
    if (
      shopUpgradeCount[index] >= achievement[upgradeKey] &&
      !achievement.displayed
    ) {
      showAchievement(
        achievement.message1,
        achievement.message2,
        achievement.icon
      );
      achievement.displayed = true;
    }
  }
}

[0, 1, 2, 3, 4, 5].forEach(index => {
  setInterval(() => checkUpgradeAchievement(index), 1000);
});

/////////////////////////////////////////////////////////
/////////////////   SHOW ACHIEVEMENTS   /////////////////
/////////////////////////////////////////////////////////

// Function to display achievements in the notification box
function showAchievement(message1, message2, icon) {
  playRandomInboxSound();
  const notification = document.createElement("div");
  notification.className = "notification";

  const iconElement = document.createElement("img");
  iconElement.className = "icon";
  iconElement.src = icon;

  const messageContainer = document.createElement("div"); 
  messageContainer.className = "message-container";

  const message1Element = document.createElement("div");
  message1Element.textContent = message1;
  message1Element.className = "message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = message2;
  message2Element.className = "message2";

  // Append message1 and message2 to messageContainer
  messageContainer.appendChild(message1Element);
  messageContainer.appendChild(message2Element);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  
  closeButton.addEventListener("click", () => {
    notificationBox.removeChild(notification);
  });

  notification.appendChild(iconElement);
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);
}


////////////////////////////////////////////////////////////
///////////////////   ACHIEVEMENTS PAGE   //////////////////
////////////////////////////////////////////////////////////

const achievementsPage = document.getElementById("achievements-page");

function toggleAchievementsPage() {
  achievementsPage.style.display = (achievementsPage.style.display === "none") ? "flex" : "none";

  // Clear the content of the achievements-list div
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";

  // Display icons or "?" based on achievements
  displayAchievements(mainAchievementsObj);
  displayAchievements(upgradeAchievementsObj);
}


function displayAchievements(achievementsArray) {
  const achievementsList = document.getElementById("achievements-list");
  achievementsArray.forEach((achievement) => {
    const achievementListDiv = document.createElement("div");
    achievementListDiv.className = "achievement-item";

    if (achievement.displayed) {
      // Display the icon
      const iconImage = document.createElement("img");
      iconImage.src = achievement.icon;
      iconImage.className = "achievement-item";

      // Create a tooltip div for message2
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = achievement.message1;

      // Append the icon to the achievementListDiv
      achievementListDiv.appendChild(iconImage);

      // Append the tooltip as a sibling to the iconImage
      achievementListDiv.appendChild(tooltip);
    } else {
      const questionMark = document.createElement("img");
      questionMark.className = "question-mark";
      questionMark.src = achievement.iconFalse;
      questionMark.alt = "?";
      achievementListDiv.appendChild(questionMark);
    }

    // Append the achievement div to the achievements page
    achievementsList.appendChild(achievementListDiv);
  });
}



// Add an event listener for the "keydown" event on the document
document.addEventListener("keydown", function(event) {
  if (event.key === "a") {
    toggleAchievementsPage();
  }
});




///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////



// Function to trigger random events
function randomEvent() {
  totalRandomEvents += 1;
  const randomIndex = Math.floor(Math.random() * randomEventPool.length);
  const event = randomEventPool[randomIndex];
  const { motivationRandomCalc, jobAppRandomCalc } = applyRandomEventEffect(event);
  const goodOrBad = event.color

  if (goodOrBad === 'red'){
    showBadRandomEvent(event, motivationRandomCalc, jobAppRandomCalc);
  } else if (goodOrBad === 'green') {
    showGoodRandomEvent(event, motivationRandomCalc, jobAppRandomCalc);
  }
}


function applyRandomEventEffect(event) {
  let effect_motivation, effect_apps;
  /////////////////////////////////////////////////////////
  // ADD MATH EQUATION FOR A PROPER GAME PROGRESSION VALUES
  /////////////////////////////////////////////////////////
  if (event.color === 'red') {
    // Generate random values within the specified range for 'red'
    effect_motivation = getRandomInRange(-0.321, -0.197);
    effect_apps = getRandomInRange(-0.148, -0.121);
  } else if (event.color === 'green') {
    // Generate random values within the specified range for 'green'
    effect_motivation = getRandomInRange(0.0027, 0.0151);
    effect_apps = getRandomInRange(0.0111, 0.0121);
  }
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  if (event.color === 'green' && motivation < ((shopObj[0].cost))) {
    motivation += 1;
    return { motivationRandomCalc: 0, jobAppRandomCalc: effect_apps * jobApplications};
  } else if (event.color === 'red' && motivation > 0) {
    motivation -= 1;
  }
  // if (jobApplications <= 0) {
  //   return { motivationRandomCalc: 0, jobAppRandomCalc: 0 };
  // }

  let motivationRandomCalc = effect_motivation * motivation;
  let jobAppRandomCalc = effect_apps * jobApplications;

  motivation += motivationRandomCalc;
  jobApplications += jobAppRandomCalc;
  updateMotivation();
  updateJobApplications();

  return { motivationRandomCalc, jobAppRandomCalc };
}

// Helper function to get a random number within a specified range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to display random events in the notification box
function showBadRandomEvent(randomEvent, motivationRandomCalc, jobAppRandomCalc) {
  playRandomInboxSound();
  badRandomEvents += 1;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = randomEvent.color;

  const iconElement = document.createElement("img");
  iconElement.className = "icon";
  iconElement.src = randomEvent.icon;

  const messageContainer = document.createElement("div"); // New div for messages
  messageContainer.className = "message-container";

  const message1Element = document.createElement("div");
  message1Element.textContent = randomEvent.message1;
  message1Element.className = "message1";

  const message2Element = document.createElement("div");
  if (motivation === 0 || motivation < 0) {  
    message2Element.textContent = `You've hit motivation rock bottom`;
  } else if (Math.ceil(motivationRandomCalc) === 0) {
    message2Element.textContent = `-1 motivation`;
  } else {
    message2Element.textContent = `${formatLargeNumberAll(Math.ceil(motivationRandomCalc))} motivation`;
  }
  message2Element.className = "message2";

  const message3Element = document.createElement("div");
  if (Math.round(jobAppRandomCalc) === 0) {
    message3Element.textContent = `You need to apply more`;
  } else {
    if (Math.round(jobAppRandomCalc) === 1) {
      message3Element.textContent = `${formatLargeNumberAll(Math.round(jobAppRandomCalc))} job app`;
    } else if (Math.round(jobAppRandomCalc) === -1) {
      message3Element.textContent = `-1 job app`;
    } else {
      message3Element.textContent = `${formatLargeNumberAll(Math.round(jobAppRandomCalc))} job apps`;
    }
  }
  message3Element.className = "message3";

  messageContainer.appendChild(message1Element);
  messageContainer.appendChild(message2Element);
  messageContainer.appendChild(message3Element);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  closeButton.addEventListener("click", () => {
  notificationBox.removeChild(notification);
  });

  notification.appendChild(iconElement);
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);
}
    

function showGoodRandomEvent(randomEvent, motivationRandomCalc, jobAppRandomCalc) {
  playRandomInboxSound();
  goodRandomEvents += 1;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = randomEvent.color;

  const iconElement = document.createElement("img");
  iconElement.className = "icon";
  iconElement.src = randomEvent.icon;

  const messageContainer = document.createElement("div"); // New div for messages
  messageContainer.className = "message-container";

  const message1Element = document.createElement("div");
  message1Element.textContent = randomEvent.message1;
  message1Element.className = "message1";

  const message2Element = document.createElement("div");
  if (Math.round(motivationRandomCalc) === 0) {
    message2Element.textContent = `You feel a tiny bit more motivated`;
  } else {
    message2Element.textContent = `+${formatLargeNumberAll(Math.round(motivationRandomCalc))} motivation`;
  }
  message2Element.className = "message2";

  const message3Element = document.createElement("div");
  if (Math.round(jobAppRandomCalc) === 0) {
    message3Element.textContent = `You are compelled to apply more`;
  } else {
    if (Math.round(jobAppRandomCalc) === 1) {
      message3Element.textContent = `${formatLargeNumberAll(Math.round(jobAppRandomCalc))} job app`;
    } else {
      message3Element.textContent = `+${formatLargeNumberAll(Math.round(jobAppRandomCalc))} job apps`;
    }
  }
  message3Element.className = "message3";

  messageContainer.appendChild(message1Element);
  messageContainer.appendChild(message2Element);
  messageContainer.appendChild(message3Element);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  closeButton.addEventListener("click", () => {
  notificationBox.removeChild(notification);
  });

  notification.appendChild(iconElement);
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);
}



////////////////////////////////////////////////////////////
///////////////////   RANDOM REJECTIONS   //////////////////
////////////////////////////////////////////////////////////


function randomRejection() {
  if (jobApplications >= 100) {
    const randomIndex = Math.floor(Math.random() * randomRejectionPool.length);
    const rejectionEvent = randomRejectionPool[randomIndex];
    const { motivationRejectCalc } = applyRandomRejectionEffects(rejectionEvent);
    showRandomRejection(rejectionEvent, motivationRejectCalc);
  }
}

// Function to apply the effects of the rejection event
function applyRandomRejectionEffects() {
  /////////////////////////////////////////////////////////
  // ADD MATH EQUATION FOR A PROPER GAME PROGRESSION VALUES
  /////////////////////////////////////////////////////////
  effect_motivation = getRandomInRange(-0.121, -0.097);
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  let motivationRejectCalc = effect_motivation * motivation;
  motivation += motivationRejectCalc;
  updateMotivation();
  return { motivationRejectCalc }; // Return an object with motivationRejectCalc property
}


// Function to display achievements in the notification box
function showRandomRejection(rejectionEvent, motivationRejectCalc) {
  playRandomInboxSound();
  totalRejections += 1;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = rejectionEvent.color;
  
  const iconElement = document.createElement("img");
  iconElement.className = "icon";
  iconElement.src = rejectionEvent.icon;
  
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
 
  const message1Element = document.createElement("div");
  message1Element.textContent = rejectionEvent.message1;
  message1Element.className = "message1";
  
  const message2Element = document.createElement("div");
  if (Math.round(motivationRejectCalc) === 0) {
    message2Element.textContent = `You've hit motivation rock bottom`;
  } else {
    message2Element.textContent = `${formatLargeNumberAll(Math.round(motivationRejectCalc))} motivation`;
  }
  message2Element.className = "message2";
  
  // Append message1 and message2 to messageContainer
  messageContainer.appendChild(message1Element);
  messageContainer.appendChild(message2Element);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  closeButton.addEventListener("click", () => {
  notificationBox.removeChild(notification);
  });

  notification.appendChild(iconElement);
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);
}


////////////////////////////////////////////////////////////
////////////////////   SHOW NOTIFICATIONS   ////////////////
////////////////////////////////////////////////////////////

const notificationBox = document.getElementById("notification-box");

// Function to show a notification
function showNotification(message, icon) {
  playRandomInboxSound();
  const notification = document.createElement("div");
  notification.className = "notification";
  

  // Adding an icon if provided
  if (icon) {
    const iconElement = document.createElement("img");
    iconElement.src = icon;
    iconElement.className = "notification-icon";
    notification.appendChild(iconElement);
  }

  const message1Element = document.createElement("div");
  message1Element.textContent = message.message1;
  message1Element.className = "event-message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = message.message2;
  message2Element.className = "event-message2";

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";
  closeButton.addEventListener("click", () => {
    notificationBox.removeChild(notification);
  });

  notification.appendChild(message1Element);
  notification.appendChild(message2Element);
  notification.appendChild(closeButton);

  notificationBox.appendChild(notification);
  
}
// Function to close the notification
function closeNotification() {
  notificationBox.style.display = "none";

}



////////////////////////////////////////////////////////////
////////////////////   TIME TRACKING CODE   ////////////////
////////////////////////////////////////////////////////////


// Initialize the game
updateShop();
updateJobApplications();
updateAPSDisplay();
// updateJobPostings();
setInterval(autoGenerateJobApplications, 1000);
setInterval(checkMainAchievement, 1000);

// Set an interval to trigger random event
setInterval(randomRejection, randomRejectInterval);
// Set an interval to trigger random events every 60 seconds
setInterval(randomEvent, randomEventInterval);

