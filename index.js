// Initialize variables
let motivation = -1;
let autoApplications = [];
let clickValue = 100;
let totalClicksPerSecond = 0;
let jobApplications = 0;
let manualClick = 0;
let totalRejections = 0


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

// Function to update the job application count on the screen
function updateJobApplications() {
  const jobApplicationsElement = document.getElementById("job-applied");
  jobApplicationsElement.textContent = `${Math.round(jobApplications)}`;
}

// Function to update the CPS (Clicks Per Second) display
function updateCPSDisplay() {
  const cpsDisplay = document.getElementById("cps-display");
  cpsDisplay.textContent = `Apps per sec: ${totalClicksPerSecond.toFixed(2)}`; // Display CPS rounded to 2 decimal places
}

// Function to update the motivation count on the screen
function updateMotivation() {
  const motivationElement = document.getElementById("motivation");
  motivationElement.textContent = `Motivation: ${Math.floor(motivation)}`;
}

// Function to update the rejection display
function updateRejection() {
  const rejectionDisplay = document.getElementById("rejection-display");
  rejectionDisplay.textContent = `Rejections: ${Math.floor(totalRejections)}`; // Display MPS rounded to 2 decimal places
}

// Function to calculate the total clicks per second
function calculateTotalClicksPerSecond() {
  totalClicksPerSecond = 0;
  motivationPerSecond = 0; // Initialize motivation per second
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
    clicksPerSecondElement.className = "item-cps";
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
      updateCPSDisplay(); // Update CPS when purchasing
      updateShopUpgrades(); // Update the shop upgrade variables
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


// Function to add job applications automatically based on CPS
function autoGenerateJobApplications() {
  jobApplications += totalClicksPerSecond;
  motivation += 0.1 * totalClicksPerSecond; // Increase motivation based on job applications clicked
  updateMotivation();
  updateRejection();
  updateJobApplications();
  updateCPSDisplay(); // Update CPS when generating
}


// Initialize the shop with AutoApplications
const shopObj = [
  {
    id: 0,
    icon: "./img/shopIcons/0_tryHarder.png",
    name: "Try Harder",
    cost: 10,
    clicksPerSecond: 0.1,
    count: 0,
  },
  {
    id: 1,
    icon: "./img/shopIcons/1_linkIndeed.png",
    name: "LinkIndeed Premium",
    cost: 50,
    clicksPerSecond: 1,
    count: 0,
  },
  {
    id: 2,
    icon: "./img/shopIcons/2_sixerr.png",
    name: "Outsource to Sixerr",
    cost: 100,
    clicksPerSecond: 5,
    count: 0,
  },
  {
    id: 3,
    icon: "./img/shopIcons/3_jobPortal.png",
    name: "Job Portal",
    cost: 200,
    clicksPerSecond: 10,
    count: 0,
  },
  {
    id: 4,
    icon: "./img/shopIcons/4_unemployment.png",
    name: "Unemployed on a Monday",
    cost: 300,
    clicksPerSecond: 20,
    count: 0,
  },
  {
    id: 5,
    icon: "./img/shopIcons/5_someGuy.png",
    name: "Some guy you know who works at career services",
    cost: 400,
    clicksPerSecond: 100,
    count: 0,
  },
];

////////////////////////////////////////////////////////////
////////////////////   JOB POSTINGS   //////////////////////
////////////////////////////////////////////////////////////

const jobCycleTitle = [
  "Executive Intern",
  "Totally Real Role",
  "Analyst Jr.",
  "Digital Dreamer",
  "Code Whisperer",
  "Social Media Sorcerer",
  "AI Wizard",
  "Space Explorer",
  "Robot Wrangler",
  "Time Traveling Troublemaker",
  "Unicorn Wrangler",
  "Master of Puns",
  "Wizard of Widgets",
  "Grand Poobah of Gizmos",
  "Chaos Coordinator",
  "Meme Maestro",
  "Reality Distortion Engineer",
  "Chief Emoji Officer",
  "Pixel Picasso",
];

const jobCycleCompany = [
  "Interns Collective",
  "Indian Guy named John Kyle",
  "Pen Island Solutions",
  "Unicorn Innovations",
  "Pixel Perfectionists",
  "Meme Magic Enterprises",
  "Quantum Quokka Technologies",
  "Galactic Gourmet Solutions",
  "Automaton Asylum",
  "Lunar Lemonade Co.",
  "Epic Emoji Emporium",
  "Wacky Widget Workshop",
  "Gizmo Galaxy",
  "Pun Paradise",
  "Meme Machine Co.",
  "Chaos Co.",
  "Emoji Extravaganza",
  "Pixel Pinnacle",
  "Universe Unleashed Ltd.",
];

const jobCycleLocation = [
  "New York, NY",
  "Springfield, MA",
  "Taipei, Taiwan",
  "San Francisco, CA",
  "Seattle, WA",
  "Los Angeles, CA",
  "Sydney, Australia",
  "Houston, TX",
  "Berlin, Germany",
  "Mars Metropolis",
  "Atlantis, Ocean Floor",
  "Wizarding World",
  "Galaxy Far Far Away",
  "Narnia",
  "Oz, Emerald City",
  "Middle-earth, Shire",
  "Neverland",
  "Hogwarts",
  "Pixel Paradise",
];

const iconFolderPath = "./img/jobPostingIcons/";

function getIconPath(index) {
  const maxIndex = 11; // Assuming you have images named 0.png to 9.png
  const actualIndex = index % (maxIndex + 1); // Use modulo to ensure it wraps around
  return `${iconFolderPath}${actualIndex}.png`;
}

function getRandomPayAndBenefits() {
  const minPay = Math.floor(Math.random() * 50) + 30; // Random pay between $30k and $80k
  const maxPay = minPay + Math.floor(Math.random() * 20) + 10; // Random benefits between 10 and 30
  return `$${minPay}k/yr - $${maxPay}k/yr · ${Math.floor(Math.random() * 5)} benefits`;
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

const jobPostingCycleObj = Array.from({ length: jobCycleTitle.length }, (_, id) => {
  const randomIconIndex = getRandomIndex(jobCycleTitle);
  const randomTitleIndex = getRandomIndex(jobCycleTitle);
  const randomCompanyIndex = getRandomIndex(jobCycleCompany);
  const randomLocationIndex = getRandomIndex(jobCycleLocation);

  return {
    id,
    icon: getIconPath(randomIconIndex),
    title: jobCycleTitle[randomTitleIndex],
    company: jobCycleCompany[randomCompanyIndex],
    location: jobCycleLocation[randomLocationIndex],
    pay: getRandomPayAndBenefits(),
  };
});

// Shuffle the job postings array
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// shuffleArray(jobCycleTitle);
// shuffleArray(jobCycleCompany);
// shuffleArray(jobCycleLocation);
// shuffleArray(jobPostingCycleObj);

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

  jobPostingCycleObj.forEach((posting, index) => {
    const jobPostingItem = document.createElement("div");
    jobPostingItem.className = "job-posting-item";
    if (index === 0) {
      jobPostingItem.classList.add("first-posting");
    }

    const iconElement = document.createElement("img");
    iconElement.src = posting.icon;
    iconElement.className = "icon";

    const titleElement = document.createElement("div");
    titleElement.className = "job-title";
    titleElement.textContent = posting.title;

    const companyElement = document.createElement("div");
    companyElement.className = "job-company";
    companyElement.textContent = posting.company;

    const locationElement = document.createElement("div");
    locationElement.className = "job-location";
    locationElement.textContent = posting.location;

    const payElement = document.createElement("div");
    payElement.className = "job-pay";
    payElement.textContent = posting.pay;

    const detailsElement = document.createElement("div");
    detailsElement.appendChild(titleElement);
    detailsElement.appendChild(companyElement);
    detailsElement.appendChild(locationElement);
    detailsElement.appendChild(payElement);

    jobPostingItem.appendChild(iconElement);
    jobPostingItem.appendChild(detailsElement);

    jobPostingsElement.appendChild(jobPostingItem);
  });
}


updateJobPostings();

// ////////////////////////////////////////////////////////
// ////////////////////    MUSIC   ////////////////////////
// ////////////////////////////////////////////////////////
  
// // START MUSIC
//   const bgMusic = document.getElementById("background-music");
//   const muteButton = document.getElementById("mute-button");
//   const volumeSlider = document.getElementById("volume-slider");

//   // Function to start playing the background music
//   function playBackgroundMusic() {
//       bgMusic.play();
//   }

//   // Function to toggle the background music (mute/unmute)
//   function toggleMute() {
//     if (bgMusic.muted) {
//         bgMusic.muted = false;
//         muteButton.textContent = "Mute";
//     } else {
//         bgMusic.muted = true;
//         muteButton.textContent = "Unmute";
//     }
//   }

//   // Function to handle volume change
//   function changeVolume() {
//     bgMusic.volume = volumeSlider.value;
//   }

//   volumeSlider.addEventListener("input", changeVolume);
//   muteButton.addEventListener("click", toggleMute);

//   // Add an event listener to start playing the music when the page loads
//   window.addEventListener("load", playBackgroundMusic);



///////////////////////////////////////////////////////////
/////////////////////  ACHIEVEMENTS  //////////////////////
///////////////////////////////////////////////////////////

const mainAchievementsObj = [
  // manual click achievements
  { 
    icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
    clicks: 1, 
    message1: "Your first click!",
    message2: "Hopefully this will lead to somewhere.. eventually",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
    clicks: 2,
    message1: "You manually applied to 2 jobs!",
    message2: "test2",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
    clicks: 3, 
    message1: "You manually applied to 3 jobs!", 
    message2: "test3",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
    clicks: 4, 
    message1: "You manually applied to 4 jobs!", 
    message2: "test4",
    displayed: false,
  },

  // job application achievements
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 69, 
    message1: "You applied to 69 jobs!",
    message2: "Nice",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 420, 
    message1: "You applied to 420 jobs!",
    message2: "Nice",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 6969,
    message1: "You applied to 6969 jobs!",
    message2: "Nice x 101",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 8000,
    message1: "You applied to 8000 jobs!",
    message2: "You feel kinda empty inside",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 10000,
    message1: "You applied to 10000 jobs!",
    message2: "You feel kinda empty inside",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 42069, 
    message1: "You applied to 42069 jobs!", 
    message2: "You blow a small puff of air out of your nostrils",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
    apps: 69420, 
    message1: "You applied to 69420 jobs!", 
    message2: "You blow a small puff of air out of your nostrils",
    displayed: false,
  },

  // rejection achievements
  { 
    icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
    rejections: 1, 
    message1: "1 rejection",
    message2: "your 1st rejection!",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
    rejections: 5,
    message1: "5 rejections",
    message2: "frick",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
    rejections: 10,
    message1: "10 rejections",
    message2: "fricky frick",
    displayed: false,
  },
];

function checkMainAchievement() {
  for (const achievement of mainAchievementsObj) {
    const { clicks, apps, rejections, displayed, message1, message2, icon } = achievement;
    if (
      ((clicks && manualClick >= clicks) ||
      (apps && jobApplications >= apps) ||
      (rejections && totalRejections >= rejections)) &&
      !displayed
    ) {
      showAchievement(message1, message2, icon);
      
      achievement.displayed = true;
    }
  }
}


const upgradeAchievementsObj = [
  // TRY HARDER [0]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 1, 
    message1: "Own 1 Try Harder",
    message2: "Your first time actually trying!",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 10,
    message1: "Own 10 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 50,
    message1: "Own 50 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 100,
    message1: "Own 100 Try Harders",
    message2: "insert funny excerpt",
    displayed: false, 
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 500,
    message1: "Own 500 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 1000,
    message1: "Own 1000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 2500,
    message1: "Own 2500 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 5000,
    message1: "Own 5000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 10000,
    message1: "Own 10000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
  },

  // LinkIndeed PREMIUM [1]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 1, 
    message1: "Own 1 LinkIndeed Premium",
    message2: "$40 a month huh?",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    message1: "Bill Gates thanks you",
    upgrade2: 10,
    message2: "Own 10 LinkIndeed Premiums",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 50,
    message1: "Own 50 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 100,
    message1: "Own 100 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 500,
    message1: "Own 500 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
  },
  

  // OUTSOURCE TO FIVERR [2]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 1, 
    message1: "First outsourced applier",
    message2: "Thank you Mr. Patel!",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 2,
    message1: "Own 2 outsourced worker",
    message2: "TEST 2",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 3,
    message1: "Own 3 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 4,
    message1: "Own 100 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 5,
    message1: "Own 500 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
  },



  //  SEVERANCES [3]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 1, 
    message1: "Own 1 severance",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 2,
    message1: "Own 2 severances",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 3,
    message1: "Own 25 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 4,
    message1: "Own 100 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 5,
    message1: "Own 500 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
  },

// ADD MORE WHEN NEEDED

  //  UNEMPLOYMENT [4]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 1, 
    message1: "Own 1 unemployment",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 2,
    message1: "Own 2 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 3, 
    message1: "Own 3 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 4,
    message1: "Own 4 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 5,
    message1: "Own 5 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
  },

  //  SOME GUY [5]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 1, 
    message1: "Know 1 guy who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 2,
    message1: "Know 2 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 3, 
    message1: "Know 3 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 4,
    message1: "Know 4 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 5, 
    message1: "Know 5 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
  },
];

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
      iconImage.alt = "Achievement Icon";

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
      questionMark.src = "./img/icon_questionMark.png";
      questionMark.alt = "?";
      achievementListDiv.appendChild(questionMark);
    }

    // Append the achievement div to the achievements page
    achievementsList.appendChild(achievementListDiv);
  });
}



// Add an event listener for the "keydown" event on the document
document.addEventListener("keydown", function(event) {
  // Check if the pressed key is the "Esc" key
  if (event.key === "a") {
    // Call the toggleAchievementsPage function to close the achievements page
    toggleAchievementsPage();
  }
});




///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////

const randomEventPool = [
// Random NEGATIVE events
  {
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    message1: "randomEventBad",
  },


// Random POSITIVE events
{
  icon: "./img/randomIcons/icon_randomevent_good.png",
  color: "green",
  message1: "randomEventGood",
},

];

let timer = null; // Initialize timer

// Function to trigger random events
function randomEvent() {
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
    message2Element.textContent = `${Math.ceil(motivationRandomCalc)} motivation`;
  }
  message2Element.className = "message2";

  const message3Element = document.createElement("div");
  if (Math.round(jobAppRandomCalc) === 0) {
    message3Element.textContent = `You need to apply more`;
  } else {
    if (Math.round(jobAppRandomCalc) === 1) {
      message3Element.textContent = `${Math.round(jobAppRandomCalc)} job app`;
    } else if (Math.round(jobAppRandomCalc) === -1) {
      message3Element.textContent = `-1 job app`;
    } else {
      message3Element.textContent = `${Math.round(jobAppRandomCalc)} job apps`;
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
    message2Element.textContent = `+${Math.round(motivationRandomCalc)} motivation`;
  }
  message2Element.className = "message2";

  const message3Element = document.createElement("div");
  if (Math.round(jobAppRandomCalc) === 0) {
    message3Element.textContent = `You are compelled to apply more`;
  } else {
    if (Math.round(jobAppRandomCalc) === 1) {
      message3Element.textContent = `${Math.round(jobAppRandomCalc)} job app`;
    } else {
      message3Element.textContent = `+${Math.round(jobAppRandomCalc)} job apps`;
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

const randomRejectionPool = [
  {
    id: 0,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Thank you for your interest, unfortunately..",
  },
  {
    id: 1,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Your app was impressive, but..",
  },
  {
    id: 2,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We appreciate your effort, but..",
  },
  {
    id: 3,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Despite your skills, unfortunately..",
  },
  {
    id: 4,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Regrettably, your submission falls short..",
  },
  {
    id: 5,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We regret to inform you, but..",
  },
  {
    id: 6,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Your application was considered, however..",
  },
  {
    id: 7,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Despite your potential, we must..",
  },
  {
    id: 8,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We regretfully inform you that..",
  },
  {
    id: 9,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Despite your efforts, we must..",
  },
  {
    id: 10,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We appreciate your interest, however..",
  },
  {
    id: 11,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Your skills are commendable, but..",
  },
  {
    id: 12,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We regret to inform you that..",
  },
  {
    id: 13,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Despite your dedication, unfortunately..",
  },
  {
    id: 14,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Regrettably, your application did not meet..",
  },
  {
    id: 15,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "We regretfully inform you that..",
  },
  {
    id: 16,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Despite your potential, we must..",
  },
  {
    id: 17,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    message1: "Thank you for your submission, unfortunately..",
  },
  // Add more rejection events as needed
];

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
    message2Element.textContent = `${Math.round(motivationRejectCalc)} motivation`;
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





// Initialize the game
updateShop();
updateJobApplications();
updateCPSDisplay();
// updateJobPostings();
setInterval(autoGenerateJobApplications, 1000);
setInterval(checkMainAchievement, 1000);

// Set an interval to trigger random event
setInterval(randomRejection, 15000);
// Set an interval to trigger random events every 60 seconds
setInterval(randomEvent, 14000);
