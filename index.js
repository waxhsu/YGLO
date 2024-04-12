import { shopObj, mainAchievementsObj, upgradeAchievementsObj, randomEventPool, randomRejectionPool } from './data.js';

// Initialize variables
let timer = null;
let jobApplications = 0;
let motivation = 0;
let autoApplications = [];
let totalClicksPerSecond = 0;

let appliedWithoutCV = 0;
let appliedWithCV = 0;
let totalApplied = 0;

let totalRejections = 0;
let goodRandomEvents = 0;
let badRandomEvents = 0;
let totalRandomEvents = 0;
let clickValue = 1;

let universalInterval = 1000;


/////////// INTRO SCREENS ////////
const videoElement = document.getElementById("intro-video");
const videoContainer = document.getElementById("video-container");
videoContainer.addEventListener("click", clickToSkipIntro)

videoElement.addEventListener("ended", clickToSkipIntro);

function clickToSkipIntro () {
  videoContainer.parentNode.removeChild(videoContainer);
}


const titleContainer = document.getElementById("title-container");
titleContainer.addEventListener("click", clickToSkipTitle)

function clickToSkipTitle () {
  titleContainer.parentNode.removeChild(titleContainer);
}

// ADD START TIME ON GAME AFTER CLICKTOSKIPTITLE



//////// CUTSCENE SCREEN ////////



/// TOOLTIP FUNCTION ///




// Function to start the game
// START MUSIC
const muteButton = document.getElementById("mute-button");
const volumeSlider = document.getElementById("volume-slider");

// Function to start playing the background music
let bgMusic = new Audio('./YGLO_bg_v3.mp3');

function playBackgroundMusic() {
  // Listen for the first user interaction event (e.g., click)
  document.addEventListener('click', initiateAudioPlayback, { once: true });
}

function initiateAudioPlayback() {
  // Unmute and play the audio
  bgMusic.muted = true;
  bgMusic.play();
}

// Call the playBackgroundMusic function somewhere in your code to start listening for user interaction
playBackgroundMusic();
// Function to toggle the background music (mute/unmute)
function toggleMute() {
if (bgMusic.muted) {
    bgMusic.muted = false;
    muteButton.textContent = "Music On";
} else {
    bgMusic.muted = true;
    muteButton.textContent = "Music Off";
}
}

// // Function to handle volume change
// function changeVolume() {

// bgMusic.volume = volumeSlider.value;
// }

// volumeSlider.addEventListener("input", changeVolume);
muteButton.addEventListener("click", toggleMute);

// Add an event listener to start playing the music when the page loads
window.addEventListener("load", playBackgroundMusic);



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

///////////////////////////////////////////////////////////
/////////////////  UPDATE STATS INFO  /////////////////////
///////////////////////////////////////////////////////////

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

function formatLargeNumberWithDecimals(value) {
  if (value < 100) {
    // Return the value rounded to 3 decimal places
    return value.toFixed(2);
  } else if (value < 1000000) {
    // Return the formatted number if it's below a million
    return formatNumberWithCommas(Math.round(value));
  } else {
    // Determine whether it's in millions, billions, or trillions and return accordingly
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



function updateAPSDisplay() {
  const apsElement = document.getElementById("aps-value");
  const formattedValue = formatLargeNumberAll(totalClicksPerSecond);
  apsElement.textContent = formattedValue;
}

function updateJobApplications() {
  const jobApplicationsElement = document.getElementById("jobs-value");
  const formattedValue = formatLargeNumberAll(jobApplications);
  jobApplicationsElement.textContent = formattedValue;
}

function updateMotivation() {
  const motivationElement = document.getElementById("motivation-value");
  const formattedValue = formatLargeNumberAll(motivation);
  motivationElement.textContent = formattedValue;
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

const tryHarder = {
  name: "Try Harder",
  icon: "./img/shopIcons/0_tryHarder.png",
  cost: 15,
  clickValue: 1.1,
  count: 0,
};

function updateTryHarder() {
  // const tryHarderElement = document.getElementById("tryHarder");
  // tryHarderElement.classList.toggle('greyed-out', motivation < tryHarder.cost);

  const costElement = document.getElementById("tryHarder-cost");
  const formattedCostValue = formatLargeNumberAll(tryHarder.cost);
  costElement.textContent = `cost: ${formattedCostValue}`;

  const apsElement = document.getElementById("tryHarder-aps");
  const formattedClickValue = formatLargeNumberWithDecimals(tryHarder.clickValue);
  apsElement.textContent = `+${formattedClickValue} apps`;

  const countElement = document.getElementById("tryHarder-count");
  countElement.textContent = `x${tryHarder.count}`;

  
}

function buyTryHarder() {
  if (motivation >= tryHarder.cost) {
    tryHarder.cost = Math.floor(tryHarder.cost * 1.125);
    motivation -= tryHarder.cost;
    tryHarder.count += 1;

    // FIGURE OUT THE MATH FOR THIS
    tryHarder.clickValue = tryHarder.clickValue * 1.15;
    clickValue = tryHarder.clickValue;
    playRandomClickSound();
    updateMotivation();
    updateTryHarder();
    applyParticle("+1", event.clientX, event.clientY, "try-harder");

  }
}

const tryHarderButton = document.getElementById("tryHarder");
tryHarderButton.addEventListener("click", buyTryHarder);


function updateShop() {
  const shopElement = document.getElementById("shop");
  shopElement.innerHTML = "";

  shopObj.forEach((shop, index) => {
    const iconElement = document.createElement("img");
    iconElement.src = shop.icon;
    iconElement.className = "shop-icon";

    const shopItem = document.createElement("div");
    shopItem.className = `shop-item ${motivation < shop.cost ? 'greyed-out' : ''}`;
    
    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";

    const detailContainer = document.createElement("div");
    detailContainer.className = "detail-container";

    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";

    const nameElement = document.createElement("div");
    nameElement.className = "item-name";
    nameElement.textContent = shop.name;

    const costElement = document.createElement("div");
    costElement.className = "item-cost";
    const formattedValue = formatLargeNumberAll(shop.cost);
    costElement.textContent = `cost: ${formattedValue}`;

    const clicksPerSecondElement = document.createElement("div");
    clicksPerSecondElement.className = "item-aps";
    clicksPerSecondElement.textContent = `+${shop.clicksPerSecond} apps/s`;

    const countElement = document.createElement("div");
    countElement.className = "item-count";
    countElement.textContent = `x${shop.count}`;
    
    titleContainer.appendChild(nameElement)
    detailContainer.appendChild(iconElement)
    detailContainer.appendChild(infoContainer)
    

    infoContainer.appendChild(costElement);
    infoContainer.appendChild(clicksPerSecondElement);
    infoContainer.appendChild(countElement);


    shopItem.appendChild(titleContainer);
    shopItem.appendChild(detailContainer);

    if (index <= 1 || shopObj[index - 1].count >= 1) {
      // Display the first item or the item after the one with count >= 10
      shopItem.addEventListener("click", () => buyAutoApplication(shop));
      shopElement.appendChild(shopItem);
    } else {
      // Grey out and hide the items that don't meet the condition
      shopItem.style.display = "none";
    }

  });
}


// Function to buy an AutoApplication
function buyAutoApplication(app) {
  if (motivation >= app.cost) {
    app.cost = Math.floor(app.cost * 1.15);
    motivation -= app.cost;
    app.count += 1;
    // totalAutoApplications += 1;
    playRandomClickSound();
    updateMotivation();
    updateShop();
    calculateTotalClicksPerSecond();
    updateAPSDisplay(); 
    updateShopUpgrades(); 
    applyParticle(`+1`, event.clientX, event.clientY, "shop-item");
  }
}

let shopUpgradeCount = autoApplications.map(app => app.count);

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
  motivation += 1 * totalClicksPerSecond; 
  updateMotivation();
  updateRejection();
  updateJobApplications();
  updateAPSDisplay();
}

////////////////////////////////////////////////////////////
////////////////////   CLICK BUTTON   //////////////////////
////////////////////////////////////////////////////////////

function applyJobApplication() {
  motivation += clickValue * 1.12^(jobApplications*0.05);
  appliedWithoutCV += 1;
  totalApplied += 1;
  jobApplications += clickValue
  updateJobApplications();
  updateMotivation();
  updateRejection();
  cycleJobPostings(); //wtf
  updateJobPostings();
  playRandomClickSound();

  currentLetterIndex = 0;
  currentParagraphIndex = 0;

  textBox.value = "";
  
  displayNextJobDetail();
  applyParticle(`+${formatLargeNumberAll(clickValue)}`, event.clientX, event.clientY, "apply-button");
}


function applyParticle(textContent, x, y, targetElementId) {
  const targetElement = document.getElementById(targetElementId);
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.position = "fixed";
  particleContainer.style.top = `${y}px`;
  particleContainer.style.left = `${x}px`;
  document.body.appendChild(particleContainer);

  const particle = document.createElement("div");
  particle.className = "particle";
  particle.textContent = textContent;
  particleContainer.appendChild(particle);

  const animation = particle.animate(
    [
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-100px)', opacity: 0 }
    ],
    { duration: 1000, easing: 'ease-out' }
  );

  animation.onfinish = () => {
    particleContainer.remove();
  };
}

const applyButton = document.getElementById("apply-button");
applyButton.addEventListener("click", applyJobApplication);


function displayNextJobDetail() {
  const jobPostingsElement = document.getElementById("job-postings");
  const currentClickedIndex = Array.from(jobPostingsElement.children).findIndex(postingItem => postingItem.classList.contains("clicked-posting"));
  const nextIndex = (currentClickedIndex + 1) % jobPostingCycleObj.length;

  // Display the details for the next index
  displayJobDetail(nextIndex);
}

////////////////////////////////////////////////////////////
///////////////////   ATTACHMENTS  PAGE   //////////////////
////////////////////////////////////////////////////////////

import { coverLetterPool } from './coverLetterPool.js';

const attachPage = document.getElementById("attach-page");
const attachButton = document.getElementById("attach-button");
attachButton.addEventListener("click", toggleAttachPage);

let currentLetterIndex = 0;
let currentParagraphIndex = 0;
let isDisplayingLetter = false;

function toggleAttachPage() {
  attachPage.style.display = (attachPage.style.display === "none") ? "flex" : "none";
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "div-close-button";
  closeButton.addEventListener("click", toggleAttachPage);
  attachPage.appendChild(closeButton);


  // Get the textBox element
  const textBox = document.getElementById("textBox");

  // Make the textbox read-only
  textBox.readOnly = true;

  // Add keypress event listener
  document.addEventListener("keypress", showNextLetter);
}

function showNextLetter() {
  const textBox = document.getElementById("textBox");
  const currentParagraph = coverLetterPool[currentParagraphIndex].letter;

  if (!isDisplayingLetter) {
    // Display the next letter in the current paragraph
    textBox.value += currentParagraph[currentLetterIndex];

    // Move to the next letter index
    currentLetterIndex++;

    // Check if all letters in the current paragraph are displayed
    if (currentLetterIndex === currentParagraph.length) {
      currentLetterIndex = 0; // Reset letter index
      currentParagraphIndex++; // Move to the next paragraph
      textBox.value += '\n'; // Move to the next line for the next paragraph
    }

    // Check if all paragraphs are displayed
    if (currentParagraphIndex === coverLetterPool.length) {
      // Remove the keypress event listener when all paragraphs are displayed
      document.removeEventListener("keypress", showNextLetter);
    }
    
    isDisplayingLetter = true;

    // Delay before allowing the next keypress to display the next letter
    setTimeout(() => {
      isDisplayingLetter = false;
    }, 1);
  }
}


const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", applyJobApplicationWithCV);

function applyJobApplicationWithCV() {
  motivation += 0.817 * 1.15^(jobApplications*0.5);
  appliedWithCV += 1;
  totalApplied += 1;
  jobApplications += clickValue*10;
  updateJobApplications();
  updateMotivation();
  updateRejection();
  cycleJobPostings(); //wtf
  updateJobPostings();
  playRandomClickSound();
  toggleAttachPage();

  currentLetterIndex = 0;
  currentParagraphIndex = 0;

  textBox.value = "";
  applyParticle(`+${formatLargeNumberWithDecimals(clickValue*10)}`, event.clientX, event.clientY, "submit-button");
  displayNextJobDetail();
}

// function clearTextBox () {
//   const clearTextBox = document.getElementById("textBox");
//   clearTextBox.value = "";
// }
// clearTextBox();

////////////////////////////////////////////////////////////
////////////////////   JOB POSTINGS   //////////////////////
////////////////////////////////////////////////////////////


















// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//     }
    
//     shuffleArray(jobPostingCycleObj);
    
import { jobPostingCycleObj } from './jobPostingCycleObj.js';

function updateJobPostings() {
  const jobPostingsElement = document.getElementById("job-postings");
  jobPostingsElement.innerHTML = "";

  jobPostingCycleObj.forEach((posting, index) => {
    const jobPostingItem = document.createElement("div");
    jobPostingItem.className = "job-posting-item";

    const jobPostingIcon = document.createElement("img");
    jobPostingIcon.src = posting.icon;
    jobPostingIcon.className = "icon";
    jobPostingIcon.alt = "ICON";

    const jobPostingTitle = document.createElement("div");
    jobPostingTitle.className = "job-posting-title";
    jobPostingTitle.textContent = posting.title;

    const jobPostingCompany = document.createElement("div");
    jobPostingCompany.className = "job-posting-company";
    jobPostingCompany.textContent = posting.company;

    const jobPostingLocation = document.createElement("div");
    jobPostingLocation.className = "job-posting-location";
    // jobPostingLocation.textContent = posting.location;

    const jobPostingPay = document.createElement("div");
    jobPostingPay.className = "job-posting-pay";
    jobPostingPay.textContent = posting.pay;

    const jobPostingInfo = document.createElement("div");
    jobPostingInfo.className = "job-posting-box";
    jobPostingInfo.appendChild(jobPostingTitle);
    jobPostingInfo.appendChild(jobPostingCompany);
    jobPostingInfo.appendChild(jobPostingLocation);
    jobPostingInfo.appendChild(jobPostingPay);
    jobPostingItem.appendChild(jobPostingIcon);
    jobPostingItem.appendChild(jobPostingInfo);

    jobPostingItem.addEventListener("click", function () {
      // Call the displayJobDetail function when a job posting item is clicked
      displayJobDetail(index);
    });

    jobPostingsElement.appendChild(jobPostingItem);
  });
}

// displayJobDetail();

function displayJobDetail(index) {

  const centerUIStart = document.getElementById("centerUIStart");
  const centerUI = document.getElementById("centerUI");
  
  centerUIStart.style.display = "none";
  centerUI.style.display = "flex";

  const jobPostingsItems = document.querySelectorAll(".job-posting-item");
  jobPostingsItems.forEach(postingItem => {
    postingItem.classList.remove("clicked-posting");
  });

  jobPostingsItems[index].classList.add("clicked-posting");

  const clickedPosting = jobPostingCycleObj[index];
  
  document.getElementById("job-detail-title").textContent = clickedPosting.title;
  document.getElementById("job-detail-place").textContent = `${clickedPosting.company} · ${clickedPosting.location}`;
  document.getElementById("job-detail-pay").textContent = clickedPosting.pay;
  document.getElementById("job-detail-about").textContent = clickedPosting.about;
  document.getElementById("job-detail-pay").textContent = clickedPosting.pay;
  document.getElementById("job-detail-employee").textContent = `${clickedPosting.employee} employees`;
  // document.getElementById("job-detail-alumni").textContent = `${clickedPosting.alumni} alumni work here`;
  document.getElementById("job-detail-skill").textContent = `Skills: ${clickedPosting.skill}, and more`;
  // document.getElementById("job-detail-reviewTime").textContent = `${clickedPosting.reviewTime}`;


  const responsibilitiesElement = document.getElementById("job-detail-responsibilities");
  responsibilitiesElement.innerHTML = "";

  const responsibilitiesList = document.createElement("ul");
  clickedPosting.responsibilities.forEach(responsibility => {
    const listItem = document.createElement("li");
    listItem.textContent = responsibility;
    responsibilitiesList.appendChild(listItem);
  });

  responsibilitiesElement.appendChild(responsibilitiesList);

  const qualificationsElement = document.getElementById("job-detail-qualifications");
  qualificationsElement.innerHTML = "";

  const qualificationsList = document.createElement("ul");
  clickedPosting.qualifications.forEach(qualification => {
    const listItem = document.createElement("li");
    listItem.textContent = qualification;
    qualificationsList.appendChild(listItem);
  });

  qualificationsElement.appendChild(qualificationsList);

  
}


function cycleJobPostings() {
  const jobPostingsElement = document.getElementById("job-postings");
  const clickedPostingIndex = Array.from(jobPostingsElement.children).findIndex(postingItem => postingItem.classList.contains("clicked-posting"));

  if (clickedPostingIndex !== -1) {
    // Remove the clicked posting from the array
    const removedPosting = jobPostingCycleObj.splice(clickedPostingIndex, 1)[0];

    // Add the removed posting to the end of the array
    jobPostingCycleObj.push(removedPosting);
  }

}



















///////////////////////////////////////////////////////////
/////////////////////  ACHIEVEMENTS  //////////////////////
///////////////////////////////////////////////////////////

function checkMainAchievement() {
  for (const achievement of mainAchievementsObj) {
    const { clicks, apps, rejections, badEvents, goodEvents, totalRandom, tryHarders, displayed, message1, message2, icon } = achievement;
    if ((
      (clicks && appliedWithoutCV >= clicks) ||
      (apps && jobApplications >= apps) ||
      (rejections && totalRejections >= rejections) || 
      (badEvents && badRandomEvents >= badEvents) ||
      (goodEvents && goodRandomEvents >= goodEvents) ||
      (totalRandom && totalRandomEvents >= totalRandom) ||
      (tryHarders && tryHarder.count >= tryHarders)
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

const notificationBox = document.getElementById("notification-box");

// Function to display achievements in the notification box
function showAchievement(message1, message2, icon) {
  playRandomInboxSound();
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = "#83ffd6"

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
const achievementsButton = document.getElementById("profile-picture");
achievementsButton.addEventListener("click", toggleAchievementsPage);

function toggleAchievementsPage() {
  achievementsPage.style.display = (achievementsPage.style.display === "none") ? "flex" : "none";
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";


  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "div-close-button";
  closeButton.addEventListener("click", toggleAchievementsPage);
  

  achievementsPage.appendChild(closeButton)

  displayAchievements(mainAchievementsObj);
  displayAchievements(upgradeAchievementsObj);
}


function displayAchievements(achievementsArray) {
  const achievementsList = document.getElementById("achievements-list");
  achievementsArray.forEach((achievement) => {
    const achievementListDiv = document.createElement("div");
    achievementListDiv.className = "achievement-item";

    if (achievement.displayed) {
      const iconImage = document.createElement("img");
      iconImage.src = achievement.icon;
      iconImage.className = "achievement-item";

      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = achievement.message1;

      achievementListDiv.appendChild(iconImage);
      achievementListDiv.appendChild(tooltip);
    } else {
      const questionMark = document.createElement("img");
      questionMark.className = "question-mark";
      questionMark.src = achievement.iconFalse;
      questionMark.alt = "?";
      achievementListDiv.appendChild(questionMark);
    }

    achievementsList.appendChild(achievementListDiv);
    
  });
}


// document.addEventListener("keydown", function(event) {
//   if (event.key === "a") {
//     toggleAchievementsPage();
//   }
// });



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

  if (goodOrBad === '#ff5aff'){
    showBadRandomEvent(event, motivationRandomCalc, jobAppRandomCalc);
  } else if (goodOrBad === '#73ddff') {
    showGoodRandomEvent(event, motivationRandomCalc, jobAppRandomCalc);
  }

  // Calculate the random interval between 3 to 6 seconds
  const randomInterval = Math.floor(Math.random() * (59000 - 45000 + 1)) + 45000;

  // Reset the interval with the new random interval
  setTimeout(randomEvent, randomInterval);
}


function applyRandomEventEffect(event) {
  let effect_motivation, effect_apps;
  /////////////////////////////////////////////////////////
  // ADD MATH EQUATION FOR A PROPER GAME PROGRESSION VALUES
  /////////////////////////////////////////////////////////
  if (event.color === '#ff5aff') {
    // Generate random values within the specified range for '#ff5aff'
    effect_motivation = getRandomInRange(-0.321, -0.197);
    effect_apps = getRandomInRange(-0.00001, -0.000002);
  } else if (event.color === '#73ddff') {
    // Generate random values within the specified range for '#73ddff'
    effect_motivation = getRandomInRange(0.0027, 0.0151);
    effect_apps = getRandomInRange(0.0111, 0.0121);
  }
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  if (event.color === '#73ddff' && motivation < ((shopObj[0].cost))) {
    motivation += 1;
    return { motivationRandomCalc: 0, jobAppRandomCalc: effect_apps * jobApplications};
  } else if (event.color === '#ff5aff' && motivation > 0) {
    motivation -= 1;
  }

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
    message2Element.textContent = `You hit motivation rock bottom`;
  } else if (Math.ceil(motivationRandomCalc) === 0) {
    message2Element.textContent = `-1 motivation`;
  } else {
    message2Element.textContent = `${formatLargeNumberAll(Math.ceil(motivationRandomCalc))} motivation`;
  }
  message2Element.className = "message2";

  const message3Element = document.createElement("div");
  if (Math.round(jobAppRandomCalc) === 0) {
    // message3Element.textContent = `You need to apply more`;
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
    // message3Element.textContent = `You are compelled to apply more`;
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


// function randomRejection() {
//   if (jobApplications >= 100) {
//     const randomIndex = Math.floor(Math.random() * randomRejectionPool.length);
//     const rejectionEvent = randomRejectionPool[randomIndex];
//     const { motivationRejectCalc } = applyRandomRejectionEffects(rejectionEvent);
//     showRandomRejection(rejectionEvent, motivationRejectCalc);
//   }
// }

function randomRejection() {
  // Set a probability threshold based on the number of jobApplications
  const probabilityThreshold = jobApplications / 50; // Adjust as needed

  // Check if the random value is below the probability threshold
  if (Math.random() < probabilityThreshold) {
    const randomIndex = Math.floor(Math.random() * randomRejectionPool.length);
    const rejectionEvent = randomRejectionPool[randomIndex];
    const { motivationRejectCalc } = applyRandomRejectionEffects(rejectionEvent);
    showRandomRejection(rejectionEvent, motivationRejectCalc);
  }

  // Calculate the random interval between 3 to 6 seconds
  const randomInterval = Math.floor(Math.random() * (58000 - 45000 + 1)) + 45000;


  // Calculate the random increase in totalRejections
  const minIncrease = Math.round(jobApplications * 0.15); // 15% of jobApplications
  const maxIncrease = Math.round(jobApplications * 0.25); // 25% of jobApplications
  const randomIncrease = Math.floor(Math.random() * (maxIncrease - minIncrease + 1)) + minIncrease;

  totalRejections += randomIncrease;

  // Reset the interval with the new random interval
  setTimeout(randomRejection, randomInterval); 
}

// Function to apply the effects of the rejection event
function applyRandomRejectionEffects() {
  /////////////////////////////////////////////////////////
  // ADD MATH EQUATION FOR A PROPER GAME PROGRESSION VALUES
  /////////////////////////////////////////////////////////
  const effect_motivation = getRandomInRange(-0.121, -0.097);
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
    message2Element.textContent = `You hit motivation rock bottom`;
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


// document.addEventListener("keydown", function (event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     console.log("Enter key is disabled in this game.");
//   }
// });


////////////////////////////////////////////////////////////
/////////////////   close all notifications   //////////////
////////////////////////////////////////////////////////////

function closeElement(element) {
  // Your close button logic here
  element.click(); // Assuming a click event is used to close the element
}

// Function to close all elements with the specified class
function closeAllElements(className) {
  const closeButtons = document.querySelectorAll("." + className);
  closeButtons.forEach(closeElement);
}

// Event listener for the "Close All" button
document.getElementById("close-all").addEventListener("click", function () {
  closeAllElements("close-button"); // Replace "close-button" with the actual class of your close buttons
});




////////////////////////////////////////////////////////////
////////////////////   TIME TRACKING CODE   ////////////////
////////////////////////////////////////////////////////////


// Initialize the game
updateShop();
updateJobApplications();
updateAPSDisplay();
updateJobPostings();

setInterval(autoGenerateJobApplications, universalInterval);
setInterval(checkMainAchievement, universalInterval);
setInterval(updateShop, universalInterval);

setTimeout(randomRejection, 15000);
setTimeout(randomEvent, 55000);

