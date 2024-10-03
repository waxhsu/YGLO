import { shopObj, mainAchievementsObj, upgradeAchievementsObj, randomEventPool, randomRejectionPool, } from './data.js';
// import { cutsceneObj, minigameObj } from './storyObj.js';



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
let clickValue = 10;

let timerCountdown = 60;
let universalInterval = 500;


const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
  const tooltipText = tooltip.querySelector('.tooltipText');
  
  tooltip.addEventListener('mousemove', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    // Get the width and height of the tooltip text element
    const tooltipWidth = tooltipText.offsetWidth;
    const tooltipHeight = tooltipText.offsetHeight;
    const offsetX = 22;
    const offsetY = 25;

    // Calculate the maximum allowable positions to keep the tooltip on the page
    const maxX = window.innerWidth - tooltipWidth;
    const maxY = window.innerHeight - tooltipHeight;

    // Adjust the tooltip position to stay within the maximum allowable positions
    const adjustedX = Math.min(x, maxX);
    const adjustedY = Math.min(y, maxY);

    tooltipText.style.left = (adjustedX + offsetX) + 'px';
    tooltipText.style.top = (adjustedY + offsetY) + 'px';
  });
});


////////////////////////////////////////////////
////////////////////////////////////////////////
////// !!! UNCOMMENT AFTER LAUNCH //////////////
////////////////////////////////////////////////
////////////////////////////////////////////////


const loadingElement = document.getElementById("loading-screen");
const loadingContainer = document.getElementById("loading-container");

loadingContainer.addEventListener("click", clickToIntroVideo);

function clickToIntroVideo (){
  loadingContainer.parentNode.removeChild(loadingContainer);
videoElement.play();
  }



const videoElement = document.getElementById("intro-video");
const videoContainer = document.getElementById("video-container");
videoContainer.addEventListener("click", clickToSkipIntro);
videoElement.addEventListener("ended", clickToSkipIntro);
function clickToSkipIntro () {
  videoContainer.parentNode.removeChild(videoContainer);
}


const titleContainer = document.getElementById("title-container");
titleContainer.addEventListener("click", clickToSkipTitle);

function clickToSkipTitle () {
  titleContainer.parentNode.removeChild(titleContainer);
  playBackgroundMusic()
  ////////////////////////////////////////////////
////////////////////////////////////////////////
  updateShop();
  updateJobApplications();
  updateAPSDisplay();
  updateJobPostings();
  resetActivityTimer();

  setInterval(autoGenerateJobApplications, universalInterval);
  setInterval(checkMainAchievement, universalInterval);
  setTimeout(randomRejection, 15000);
  setTimeout(randomEvent, 55000);
}



////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////


////////////////////////////////////////////////////////////
////////////////////   minigame   //////////////////////////
////////////////////////////////////////////////////////////

// use similar code as cutscene~~~~~~~~~~~~~~~~~~

const minigameContainer = document.getElementById("minigame-container")
const minigameBackground = document.getElementById("minigame-background")


/// LOOK AT TOGGLE ACHIEVEMENTS PAGE TO MAKE UI APPEAR

function showMinigameNotification () {
  minigameContainer.style.display = (minigameContainer.style.display === "none") ? "flex" : "none";
  minigameBackground.style.display = (minigameBackground.style.display === "none") ? "flex" : "none";
  console.log("showMinigameNotification function works")

  // const iconElement = document.createElement("img");
  // iconElement.className = "bossIcon";
  // iconElement.src = bossIcon;

  // minigameContainer.appendChild(iconElement)
  
  // MAKE BOXES IF NEEDED AFTER UI IS DECIDE
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "nofade-close-button";
  closeButton.addEventListener("click", showMinigameNotification);
  minigameContainer.appendChild(closeButton)
}


function checkMinigame() {
// FUTURE: Make 3 different checks for subsequent minibosses
  if (jobApplications > 50) {
    showMinigameNotification();
    clearInterval(minigameInterval);
  }
}
/////////////////////////////////
/// !!! UNCOMMENT FOR GAME
/// !!! UNCOMMENT FOR GAME
/// !!! UNCOMMENT FOR GAME
/// !!! UNCOMMENT FOR GAME
// const minigameInterval = setInterval(checkMinigame, 1000);



// THANK YOU FOR PLAYING OUR DEMO SCREEN
// make a window popup and a close button 
// for the player to continue mindlessly play

const thankYouScreen = document.getElementById("thankYouScreen");
const thankYouScreenBackground = document.getElementById("thankYouScreenBackground");

function showThankYou () {
  thankYouScreen.style.display = (thankYouScreen.style.display === "none") ? "flex" : "none";
  thankYouScreenBackground.style.display = (thankYouScreenBackground.style.display === "none") ? "flex" : "none";
  const thankYouBox = document.createElement("div");
  thankYouBox.className = "thankYouBox"


  const closeButton = document.createElement("button");
  closeButton.textContent = "Continue playing";
  closeButton.className = "nofade-close-button";
  closeButton.addEventListener("click", showThankYou);
  thankYouScreen.appendChild(closeButton)

}

function checkDemo() {
  if (jobApplications > 10000) {
    showThankYou();
    clearInterval(checkDemoInterval); // Clear the interval to stop the function from running again
  }
}
const checkDemoInterval = setInterval(checkDemo, 1000);



//////// CUTSCENE FUNCTION ////////

// function checkCutscene() {
//   for (const cutscene of cutsceneObj) {
//     const { clicksReq, file, displayed } = cutscene;
//     if ((
//       // add as many parameters needed for cutscene
//       (clicksReq && appliedWithoutCV >= clicksReq) 
//       ) 
//     && !displayed) {
//       showCutscene(file);
//       cutscene.displayed = true;
//     }
//   }
// }

// const cutsceneBox = document.getElementById("cutsceneBox");

// // Function to display cutscene on the main page
// function showCutscene(file) {
//   const cutsceneElement = document.getElementById("cutscene-container");
//   const cutsceneBackground = document.getElementById("cutscene-background");

//   cutsceneElement.style.display = (cutsceneElement.style.display === "none") ? "flex" : "none";
//   cutsceneBackground.style.display = (cutsceneBackground.style.display === "none") ? "flex" : "none";

//   cutsceneElement.innerHTML = "";

//   const cutsceneFileElement = document.createElement("img");
//   cutsceneFileElement.className = "cutscene-file";
//   cutsceneFileElement.src = file;

//   const closeButton = document.createElement("button");
//   closeButton.textContent = "X";
//   closeButton.className = "nofade-close-button";

//   closeButton.addEventListener("click", () => {
//     cutsceneElement.style.display = "none";
//     cutsceneBackground.style.display = "none";
//   });

//   cutsceneElement.appendChild(cutsceneFileElement);
//   cutsceneElement.appendChild(closeButton);
//   cutsceneBox.appendChild(cutsceneElement);
// }


// function checkCutscene() {
//   for (const cutscene of cutsceneObj) {
//     const { clicksReq, file, displayed } = cutscene;
//     if (
//       // Add as many parameters needed for cutscene
//       (clicksReq && appliedWithoutCV >= clicksReq) 
//       && !displayed
//     ) {
//       showCutscene(file);
//       cutscene.displayed = true;

//     }
//   }
// }

const cutsceneBox = document.getElementById("cutsceneBox");

// Function to display cutscene on the main page
function showCutscene(file) {

  if (isSoundOn) {
    bgMusic.pause();
    isSoundOn = false; // Set sound state to off
  }

  const cutsceneElement = document.getElementById("cutscene-container");
  const cutsceneBackground = document.getElementById("cutscene-background");
    cutsceneElement.style.display = (cutsceneElement.style.display === "none") ? "flex" : "none";
    cutsceneBackground.style.display = (cutsceneBackground.style.display === "none") ? "flex" : "none";
    cutsceneElement.innerHTML = "";

  const videoElement = document.createElement("video");
    videoElement.className = "cutscene-file";
    videoElement.src = file;
    videoElement.controls = true;
    videoElement.autoplay = true;

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.className = "nofade-close-button";


    closeButton.addEventListener("click", () => {
      cutsceneElement.style.display = "none";
      cutsceneBackground.style.display = "none";
      videoElement.pause(); // Pause the video when closing

      if (!isSoundOn) {
        bgMusic.play();
        isSoundOn = true; // Set sound state back to on
      }
    });

    cutsceneElement.appendChild(videoElement);
    cutsceneElement.appendChild(closeButton);
    cutsceneBox.appendChild(cutsceneElement);
}




// // if (bgMusic.muted = false){ 
// //   toggleMute();
// // };
// toggleSound();

////////////////////////////////////////////////
////////////////////////////////////////////////
////// !!! UNCOMMENT AFTER LAUNCH //////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
// setInterval(checkCutscene, 100);
// cutscene showing is tied to the totalManual clicks.
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////











////!REFACTOR SO IT TOGGLES WITH PROFILE PIC
//////// SOUND AND BGM /////////
const muteButton = document.getElementById("muteToggleBtn");
const muteIcon = document.getElementById("muteBGMIcon");
let bgMusic = new Audio('./bgm/bgm0_dungeon.mp3');
// let bgMusic = new Audio('./bgm/bgm1_feelgood.mp3');


const bgm = [
  {
    id: 0,
    file: "./bgm/bgm0_dungeon",
    profilePic: "./img/ppIcons/pp_sad.gif",
  },
  {
    id: 1,
    file: "./bgm/bgm1_feelgood",
    profilePic: "./img/ppIcons/pp_fire.gif",
    },
  // {
  //   id: 2,
  //   file: "./bgm/bgm2@@@@",
  //   profilePic: "./img/ppIcons/pp_idle.gif",
  // },
]



/////////////////////////////////////////////////
// Function to play background music and set up mute toggle
function playBackgroundMusic() {
  /////////////////////////////////////////////////
  ////// !!! UNCOMMENT bgMusic.play() FOR LAUNCH //////
  bgMusic.play();
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
    muteButton.addEventListener('click', toggleMute);
    console.log("music is playing")
}





function updateProfilePic () {

}
















// Function to toggle mute state and update mute icon
function toggleMute() {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        muteIcon.src = "./img/gameIcons/testOn.png";
    } else {
        bgMusic.muted = true;
        muteIcon.src = "./img/gameIcons/testOff.png";
    }
}

////////////////////////////////////////////////
////////////////////////////////////////////////
//// !!! CHANGE THIS TO TRUE AFTER LAUNCH //////
let isSoundOn = true;
////////////////////////////////////////////////
////////////////////////////////////////////////

const soundButton = document.getElementById('soundToggleBtn');
const soundIcon = document.getElementById('muteSoundIcon');
soundButton.addEventListener('click', toggleSound);

// Function to toggle sound state and update sound icon
function toggleSound() {
  if (isSoundOn) {
      // If sound is currently on, turn it off
      isSoundOn = false;
      soundIcon.src = "./img/gameIcons/testOff.png"; // Update icon to sound off
  } else {
      // If sound is currently off, turn it on
      isSoundOn = true;
      soundIcon.src = "./img/gameIcons/testOn.png"; // Update icon to sound on
  }
}

// Audio files for click sounds
const clickSounds = [
  './sound/YGLOclick1.mov',
  './sound/YGLOclick2.mp3',
  './sound/YGLOclick3.mp3',
];

// Function to play random click sound
function playRandomClickSound() {
  if (isSoundOn) {
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const audio = new Audio(clickSounds[randomIndex]);
    audio.play();
  }
}

// Audio files for inbox sounds
const inboxSounds = [
  './sound/YGLOnotification.mov',
];

// Function to play random inbox sound
function playRandomInboxSound() {
  if (isSoundOn) {
    const randomIndex = Math.floor(Math.random() * inboxSounds.length);
    const audio = new Audio(inboxSounds[randomIndex]);
    audio.play();
  }
}


////////////////////////////////////////////////////////////
///////////////////    MAIN GAMEPLAY   /////////////////////
////////////////////////////////////////////////////////////
  


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

// 
function formatLargeNumberWithDecimals(value) {
  if (value < 100) {
    // Return the value rounded to 3 decimal places
    return value.toFixed(2);
  } else if (value < 1000000) {
    // Return the formatted number if it's below a million
    return formatNumberWithCommas(Math.round(value));
  } else {
    // Determine whether it's in millions, billions, or trillions and return accordingly
    const million = 1e6;
    const billion = 1e9;
    const trillion = 1e12;

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
///////////////////   ATTENTION ELEMENT   //////////////////
////////////////////////////////////////////////////////////


function createAttentionElement() {
  const attentionElement = document.createElement("img");
  attentionElement.className = "attention";
  attentionElement.src = './img/gameIcons/attention.gif';
  return attentionElement;
}






////////////////////////////////////////////////////////////
///////////////////     SHOP STUFF    //////////////////////
////////////////////////////////////////////////////////////



const shopElement = document.getElementById("shop");

// Delegate event handling to the parent element
shopElement.addEventListener('mousemove', function(event) {
    const target = event.target.closest('.shop-item');
    if (target) {
        const tooltipText = target.querySelector('.tooltipText');
        const x = event.clientX;
        const y = event.clientY;
        const offsetX = 22;
        const offsetY = 25;

        tooltipText.style.left = (x + offsetX) + 'px';
        tooltipText.style.top = (y + offsetY) + 'px';
    }
});

function updateShop() {
  shopElement.innerHTML = "";

  shopObj.forEach((shop, index) => {
    const iconElement = document.createElement("img");
    iconElement.src = shop.icon;
    iconElement.className = "shop-icon";

    const shopItem = document.createElement("div");
    shopItem.className = `shop-item tooltip ${motivation < shop.cost ? 'greyed-out' : ''}`;
    
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
    clicksPerSecondElement.className = "item-aps tooltipText";
    if (index === 0) {
      clicksPerSecondElement.textContent = `+${shop.clickValue} click power`;
    } else {
      clicksPerSecondElement.textContent = `+${shop.clicksPerSecond} apps/s`;
    }
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


    if (motivation >= shop.cost && !shop.unlocked) {
      if (!shopItem.querySelector('.attention')) {
        const attentionElement = createAttentionElement();
        shopItem.appendChild(attentionElement);
      }
    }

    if (shop.count === 1 && !shop.displayed && !shop.unlocked){
      showCutscene(shop.file);
      shop.displayed = true;
    }

    shopItem.addEventListener("click", () => {
      buyAutoApplication(shop);
      shop.unlocked = true;  // Mark as unlocked
      const attention = shopItem.querySelector('.attention');
      if (attention) {
        attention.remove();  // Remove attention element on click
      }
    });


    // THIS IS WHERE YOU CHANGE THE SHOP UNLOCK REQUIREMENTS
    if (index <= 0 || shopObj[index - 1].count >= 5) {
      // Display the first item or the item after the one with count >= 10
      shopItem.addEventListener("click", () => buyAutoApplication(shop));
      shopElement.appendChild(shopItem);
    } else {
      shopItem.style.display = "none";
    }

  });
}


// Function to buy an AutoApplication
function buyAutoApplication(app) {
// TRY HARDER ITEM
  if (app.id === 0) {
    if (motivation >= app.cost) {

      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///

      app.cost = Math.floor(app.cost * 1.15);
      motivation -= app.cost;
      app.count += 1;

      // app.clickValue += app.clickValue;
      clickValue = clickValue + app.clickValue;

      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///
      /// FIGURE OUT MATH ///


      playRandomClickSound();
      updateMotivation();
      updateShop();
      calculateTotalClicksPerSecond();
      updateAPSDisplay();
      updateShopCount(); 
      applyParticle(`+1`, event.clientX, event.clientY, "shop-item");
    }
  } else {
  // EVERYTHING ELSE IN THE SHOP
    if (motivation >= app.cost) {
      app.cost = Math.floor(app.cost * 1.25);
      motivation -= app.cost;
      app.count += 1;
      playRandomClickSound();
      updateMotivation();
      updateShop();
      calculateTotalClicksPerSecond();
      updateAPSDisplay();
      updateShopCount(); 
      applyParticle(`+1`, event.clientX, event.clientY, "shop-item");
    }
  }
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
  updateShop(); 
}

////////////////////////////////////////////////////////////
////////////////////   CLICK BUTTON   //////////////////////
////////////////////////////////////////////////////////////

function applyJobApplication() {
  motivation += clickValue * 1.0000012;
  // motivation += clickValue * 0.0000012^((jobApplications*0.00005)/10);
  appliedWithoutCV += 1;
  totalApplied += 1;
  jobApplications += clickValue
  updateJobApplications();
  updateMotivation();
  updateShop();
  cycleJobPostings();
  updateJobPostings();
  playRandomClickSound();
  unlockAttachPage();

  
  // makes sure that autoGenerateApps return to the same value
  calculateTotalClicksPerSecond();
  resetActivityTimer();

  
  console.log(`____________`);
  console.log(`click value ${clickValue}`);
  // console.log(`currency: ${motivation += clickValue * 1.0000012^(jobApplications*0.00005)/10}`);
  // console.log(`jobapps: ${(jobApplications*1.00005)/10}`)
  // console.log(`jobapps: ${jobApplications}`)

  

  currentLetterIndex = 0;
  currentParagraphIndex = 0;

  textBox.value = "";
  
  displayNextJobDetail();
  // applyParticle(`+${formatLargeNumberAll(clickValue)}`, event.clientX, event.clientY, "apply-button");
  applyParticle(`+${formatLargeNumberWithDecimals(clickValue)}`, event.clientX, event.clientY, "apply-button");
}
// ADD IF/THEN STATEMENT IF VALUE IS LESS THAN 100 TO USE formatLargeNumberWithDecimals


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

function unlockAttachPage() {
  if (appliedWithoutCV === 1) {
    attachButton.addEventListener("click", toggleAttachPage);
    attachButton.classList.remove("greyed-out");
    /////////////////////////////////////////
    ///// USE IN OTHER ATTENTION ITEMS //////
    /////////////////////////////////////////
    if (!attachButton.querySelector('.attention')) {
      const attentionElement = createAttentionElement();
      attachButton.appendChild(attentionElement);
    }
    /////////////////////////////////////////
    /////////////////////////////////////////
    /////////////////////////////////////////
    
  }
}


let currentLetterIndex = 0;
let currentParagraphIndex = 0;
let isDisplayingLetter = false;

function toggleAttachPage() {
  attachPage.style.display = (attachPage.style.display === "none") ? "flex" : "none";
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";
    /////////////////////////////////////////
    ///// USE IN OTHER ATTENTION ITEMS //////
    /////////////////////////////////////////
  const attentionElement = attachButton.querySelector('.attention');
  if (attentionElement) {
    attachButton.removeChild(attentionElement);
  }
    /////////////////////////////////////////
    /////////////////////////////////////////
    /////////////////////////////////////////
    



  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "nofade-close-button";
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


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    shuffleArray(jobPostingCycleObj);
    
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
    const { clicks, apps, rejections, badEvents, goodEvents, totalRandom, testHarders, displayed, message1, message2, icon } = achievement;
    if ((
      (clicks && appliedWithoutCV >= clicks) ||
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

let shopUpgradeCount = autoApplications.map(app => app.count);

function updateShopCount() {
  shopObj.forEach((app, index) => {
    shopUpgradeCount[index] = app.count;
  });
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
  // notification.style.backgroundColor = "#83ffd6"

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

  achievementsButton.appendChild(attentionElement);
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
  closeButton.className = "nofade-close-button";
  closeButton.addEventListener("click", toggleAchievementsPage);
  

  achievementsPage.appendChild(closeButton)

  displayAchievements(mainAchievementsObj);
  displayAchievements(upgradeAchievementsObj);

  const attentionElement = achievementsButton.querySelector('.attention');
  if (attentionElement) {
    achievementsButton.removeChild(attentionElement);
  }
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
      tooltip.className = "achievementTooltip";
      tooltip.textContent = achievement.message1;

      achievementListDiv.appendChild(iconImage);
      achievementListDiv.appendChild(tooltip);

      iconImage.appendChild(attentionElement);
      
      
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
  // notification.style.backgroundColor = randomEvent.color;

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


  // Calculate the random increase in totalRejections depending on the amount of jobApplications
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
  // notification.style.backgroundColor = rejectionEvent.color;
  
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
//////////////////// ATTENTION TO UNLOCKS //////////////////
////////////////////////////////////////////////////////////

const attentionElement = document.createElement("img");
attentionElement.className = "attention";
attentionElement.src = './img/gameIcons/attention.gif'

// function checkAttention () {
//   if (appliedWithoutCV === 5) {
//     attachButton.appendChild(attentionElement)
//   }
// }






////////////////////////////////////////////////////////////
//////////////////// INACTIVE PUNISHMENT //////////////////
////////////////////////////////////////////////////////////


let timeRemaining = timerCountdown;

function resetActivityTimer() {
  clearInterval(timer);  // Clear any existing timer
  timeRemaining = timerCountdown;    // Reset the timer to 60 seconds
  updateTimerDisplay();  // Immediately update the display
  timer = setInterval(activityTimer, 1000);  // Start the timer
}

// Function that runs every second for the countdown
function activityTimer() {
  timeRemaining--;

  if (timeRemaining <= -1) {
    timeRemaining = 0;  // Ensure the timer stays at 0
    setMotivationToZero();  // Keep setting motivation to zero
    clearInterval(timer);  // Stop the countdown
  } else {
    updateTimerDisplay();  // Update the displayed timer value
    
  }
}

// Function to set motivation to zero when the timer reaches 0
function setMotivationToZero() {
  motivation = 0;
  totalClicksPerSecond = 0;
  updateMotivation();  // Update the motivation display if necessary
}

// Function to update the HTML display of the timer
function updateTimerDisplay() {
  const timerElement = document.getElementById("timer-value");
  timerElement.textContent = timeRemaining;
}




// Initialize the game
////////////////////////////////////////////////
////////////////////////////////////////////////
/// !!! BRING THIS UP TO function skipTitleScreen ///
