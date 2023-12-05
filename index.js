// Initialize variables
// let jobApplications = 0;
let motivation = 0
let autoApplications = [];
let clickValue = 10000;
let totalClicksPerSecond = 0;
let jobApplications = 0;
let manualClick = 0;
let totalRejections = 0


// Get HTML elements
const jobApplicationsElement = document.getElementById("job-applications");
const motivationElement = document.getElementById("motivation");
const rejectionElement = document.getElementById("rejection-display");
const clickButton = document.getElementById("click-button");
const shop = document.getElementById("shop");
const autoApplicationsElement = document.getElementById("autoApplications");
const jobPostingElement = document.getElementById("job-postings");


///////////////////////////////////////////////////////////
/////////////////  UPDATE STATS INFO  /////////////////////
///////////////////////////////////////////////////////////

// Function to update the job application count on the screen
function updateJobApplications() {
  jobApplicationsElement.textContent = `${Math.round(jobApplications)}`;
}

// Function to update the CPS (Clicks Per Second) display
function updateCPSDisplay() {
  const cpsDisplay = document.getElementById("cps-display");
  cpsDisplay.textContent = `Apps per sec: ${totalClicksPerSecond.toFixed(2)}`; // Display CPS rounded to 2 decimal places
}

// Function to update the motivation count on the screen
function updateMotivation() {
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
  for (const app of autoApplications) {
      totalClicksPerSecond += app.count * app.clicksPerSecond;
  }
}

////////////////////////////////////////////////////////////
///////////////////     SHOP STUFF    //////////////////////
////////////////////////////////////////////////////////////


// Function to update the AutoApplications in the shop
function updateShop() {
  const shopElement = document.getElementById("shop");
  shopElement.innerHTML = ""; // Clear the previous shop items

  autoApplications.forEach(shop => {
      const iconElement = document.createElement("img");
      iconElement.src = shop.icon;
      iconElement.className = "icon";
  
      const shopItem = document.createElement("div");
      shopItem.className = "shop-item";

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

      shopItem.appendChild(iconElement);
      shopItem.appendChild(nameElement);
      shopItem.appendChild(costElement);
      shopItem.appendChild(clicksPerSecondElement);
      shopItem.appendChild(countElement);

      shopItem.addEventListener("click", () => buyAutoApplication(shop));
      shopElement.appendChild(shopItem);
  });
}


// Function to buy an AutoApplication
function buyAutoApplication(app) {
  if (motivation >= app.cost) {
      motivation -= app.cost;
      app.count += 1;
      app.cost = Math.floor(app.cost * 1.1); // Cost scales exponentially
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
  autoApplications.forEach((app, index) => {
    shopUpgradeCount[index] = app.count;
  });
}



////////////////////////////////////////////////////////////
///////////////////    AUTOCLICKER    //////////////////////
////////////////////////////////////////////////////////////


// Function to add job applications automatically based on CPS
function autoGenerateJobApplications() {
  jobApplications += totalClicksPerSecond;
  // totalRejections += 1 * totalClicksPerSecond;
  motivation += 0.1 * totalClicksPerSecond; // Increase motivation based on job applications clicked
  updateMotivation();
  updateRejection();
  updateJobApplications();
  updateCPSDisplay(); // Update CPS when generating
}

// Add a click event listener to the button
clickButton.addEventListener("click", () => {
    jobApplications += clickValue;
    updateJobApplications();
});

// Initialize the shop with AutoApplications
autoApplications = [
    {
        icon: "./img/icon_shop.png",
        name: "Trying Harder",
        cost: 10,
        clicksPerSecond: 0.1,
        count: 0,
    },
    {
        icon: "./img/icon_shop.png",
        name: "LinkedIn Premium",
        cost: 50,
        clicksPerSecond: 1,
        count: 0,
    },
    {
        icon: "./img/icon_shop.png",
        name: "Outsource to Fiverr",
        cost: 100,
        clicksPerSecond: 5,
        count: 0,
    },
    {
        icon: "./img/icon_shop.png",
        name: "Severance",
        cost: 200,
        clicksPerSecond: 10,
        count: 0,
    },
    {
        icon: "./img/icon_shop.png",
        name: "Umemployment Benefits",
        cost: 300,
        clicksPerSecond: 20,
        count: 0,
    },
    {
        icon: "./img/icon_shop.png",
        name: "Some guy you know who works at career services",
        cost: 400,
        clicksPerSecond: 100,
        count: 0,
    },
];

////////////////////////////////////////////////////////////
////////////////////   JOB POSTINGS   //////////////////////
////////////////////////////////////////////////////////////

// Initialize variables
let jobPostingsIndex = 0; // Track the current job posting index

// Function to cycle job postings
function cycleJobPostings() {
    // Remove the first job posting from the array
    const removedPosting = jobPostingCycle.shift();
    // Add it back to the end of the array
    jobPostingCycle.push(removedPosting);
}

// Function to update the job posting display
function updateJobPostings() {
    const jobPostingsElement = document.getElementById("job-postings");
    jobPostingsElement.innerHTML = ""; // Clear the previous job postings

    jobPostingCycle.forEach((posting, index) => {
      const jobPostingItem = document.createElement("div");
      jobPostingItem.className = "job-posting-item";
      if (index === 0) {
        jobPostingItem.classList.add("first-posting");
      }

        // Left column for icon
        const iconElement = document.createElement("img");

        // Set the path to your icon image file
        iconElement.src = posting.icon;
        iconElement.className = "icon";

        // Right column for job details
        const detailsElement = document.createElement("div");
        // detailsElement.className = "job-details";

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

        detailsElement.appendChild(titleElement);
        detailsElement.appendChild(companyElement);
        detailsElement.appendChild(locationElement);
        detailsElement.appendChild(payElement);

        jobPostingItem.appendChild(iconElement);
        jobPostingItem.appendChild(detailsElement);
      
      jobPostingsElement.appendChild(jobPostingItem);
    });
  }
  
  jobPostingCycle = [
    {
      icon: "./img/icon_jobposting.png",
      title: "Executive Intern",
      company: "Interns Collective",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Superb Internment",
      company: "Superb Owl Inc.",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Junior Analyst [UNPAID]",
      company: "Boaty McBoatface",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Analist Jr.",
      company: "Plug-In Solutions",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Totally Real Role",
      company: "Indian Recruiter with American Name",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Master of Improbable Events",
      company: "Infinite Improbability Corp.",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Absurdity Apprentice",
      company: "Absurdity Architects, Inc.",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Chief Penguin Plunger",
      company: "Penguin Plunge Productions",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Chaos Coordinator",
      company: "Chaos Coasters, Ltd.",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
    {
      icon: "./img/icon_jobposting.png",
      title: "Wizarding Intern of Whimsy",
      company: "Whimsical Widget Wizards",
      location: "random city",
      pay: "$69k/yr - $69.7k/yr · 0 benefits",
    },
  ];



////////////////////////////////////////////////////////////
///////////////////    MAIN GAMEPLAY   /////////////////////
////////////////////////////////////////////////////////////
  
const soundClips = ['./YGLOclick1.mov', 
// './YGLOclick2.mov'
];

function playRandomSound() {
  const randomIndex = Math.floor(Math.random() * soundClips.length);
  const audio = new Audio(soundClips[randomIndex]);
  audio.play();
}

// Function to handle clicking and adding job applications
function clickForJobApplications() {
    motivation += 0.217 * clickValue; // Increase motivation based on job applications clicked
    manualClick += 1;
    updateJobApplications();
    updateMotivation();
    updateRejection();
    cycleJobPostings(); // Cycle job postings on each click
    updateJobPostings();


    playRandomSound();
}

// Add a click event listener to the button
clickButton.addEventListener("click", clickForJobApplications);



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


////////////////////////////////////////////////////////////
////////////////////    NOTIFICATIONS   ////////////////////
////////////////////////////////////////////////////////////
  
const notificationBox = document.getElementById("notification-box"); // Add notification box

// Function to show a notification
function showNotification(message) {
  notificationText.textContent = message;
  notificationBox.style.display = "block";
}

// Function to close the notification
function closeNotification() {
  notificationBox.style.display = "none";
}


///////////////////////////////////////////////////////////
/////////////////////  ACHIEVEMENTS  //////////////////////
///////////////////////////////////////////////////////////


// Define achievement conditions as an array of objects
const mainAchievements = [
  // manual click achievements
  { 
    icon: "./img/icon_manualclick.png",
    clicks: 1, 
    message1: "Your first click!",
    message2: "Hopefully this will lead to somewhere.. eventually" 
  },
  { 
    icon: "./img/icon_manualclick.png",
    clicks: 2,
    message1: "You manually applied to 2 jobs!",
    message2: "test2" 
  },
  { 
    icon: "./img/icon_manualclick.png",
    clicks: 3, 
    message1: "You manually applied to 3 jobs!", 
    message2: "test3" 
  },
  { 
    icon: "./img/icon_manualclick.png",
    clicks: 4, 
    message1: "You manually applied to 4 jobs!", 
    message2: "test4" 
  },

  // job application achievements
  { 
    icon: "./img/icon_jobapp.png",
    apps: 69, 
    message1: "You applied to 69 jobs!",
    message2: "Nice" 
  },
  { 
    icon: "./img/icon_jobapp.png",
    apps: 6969,
    message1: "You applied to 6969 jobs!",
    message2: "Nice x 101" 
  },
  { 
    icon: "./img/icon_jobapp.png",
    apps: 8000,
    message1: "You applied to 8000 jobs!",
    message2: "You feel kinda empty inside" 
  },
  { 
    icon: "./img/icon_jobapp.png",
    apps: 10000,
    message1: "You applied to 10000 jobs!",
    message2: "You feel kinda empty inside" 
  },
  { 
    icon: "./img/icon_jobapp.png",
    apps: 42069, 
    message1: "You applied to 42069 jobs!", 
    message2: "You blow a small puff of air out of your nostrils" 
  },

  // rejection achievements
  { 
    icon: "./img/icon_rejection.png",
    rejections: 1, 
    message1: "1 rejection",
    message2: "your 1st rejection!",
  },
  { 
    icon: "./img/icon_rejection.png",
    rejections: 5,
    message1: "5 rejections",
    message2: "frick",
  },
  { 
    icon: "./img/icon_rejection.png",
    rejections: 10,
    message1: "10 rejections",
    message2: "fricky frick", 
  },
];

const upgradeAchievements = [
    // TRY HARDER [0]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 1, 
      message1: "Your first time actually trying!",
      message2: "Own 1 Trying Harder"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 2,
      message1: "condition met",
      message2: "Own 2 Trying Harders" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 3,
      message1: "condition met",
      message2: "Own 3 Trying Harders" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 4,
      message1: "condition met",
      message2: "Own 4 Trying Harders" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 5,
      message1: "condition met",
      message2: "Own 5 Trying Harders" 
    },

    // LINKEDIN PREMIUM [1]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 1, 
      message1: "$40 a month huh?",
      message2: "Own 1 LinkedIn Premium"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 2,
      message1: "Bill Gates thanks you",
      message2: "Own 2 LinkedIn Premiums" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 3,
      message1: "condition met",
      message2: "Own 3 LinkedIn Premiums" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 4,
      message1: "condition met",
      message2: "Own 4 LinkedIn Premiums" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 5,
      message1: "condition met",
      message2: "Own 5 LinkedIn Premiums" 
    },


    // OUTSOURCE TO FIVERR [2]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 1, 
      message1: "Thank you Mr. Patel!",
      message2: "First outsourced applier"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 2,
      message1: "TEST 2",
      message2: "Own 2 outsourced worker" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 3,
      message1: "condition met",
      message2: "Own 3 Fiverr outsources" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 4,
      message1: "condition met",
      message2: "Own 100 Fiverr outsources" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 5,
      message1: "condition met",
      message2: "Own 500 Fiverr outsources" 
    },



    //  SEVERANCES [3]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 1, 
      message1: "condition met",
      message2: "Own 1 severance"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 2,
      message1: "condition met",
      message2: "Own 2 severances" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 3,
      message1: "condition met",
      message2: "Own 25 upgrades" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 4,
      message1: "condition met",
      message2: "Own 100 upgrades" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 5,
      message1: "condition met",
      message2: "Own 500 upgrades" 
    },

  // ADD MORE WHEN NEEDED

    //  UNEMPLOYMENT [4]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 1, 
      message1: "condition met",
      message2: "Own 1 unemployment"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 2,
      message1: "condition met",
      message2: "Own 2 unemployment" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 3, 
      message1: "condition met",
      message2: "Own 3 unemployment"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 4,
      message1: "condition met",
      message2: "Own 4 unemployment" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 5,
      message1: "condition met",
      message2: "Own 5 unemployment" 
    },

    //  SOME GUY [5]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 1, 
      message1: "condition met",
      message2: "Know 1 guy who work in the unemployment office"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 2,
      message1: "condition met",
      message2: "Know 2 guys who work in the unemployment office" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 3, 
      message1: "condition met",
      message2: "Know 3 guys who work in the unemployment office"
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 4,
      message1: "condition met",
      message2: "Know 4 guys who work in the unemployment office" 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 5, 
      message1: "condition met",
      message2: "Know 5 guys who work in the unemployment office"
    },
];


// Initialize an array to store achieved conditions
const achievedMainConditions = [];
const achievedUpgradeConditions = [];
//////////////////////////////////////////////////

// Function to check for MAINachievements
function checkMainAchievements() {
  for (const achievement of mainAchievements) {
      if ((manualClick >= achievement.clicks || jobApplications >= achievement.apps || totalRejections === achievement.rejections) &&
        !achievedMainConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedMainConditions.push(achievement.message1);
      }
  }
}

// function checkUpgradeAchievements(index) {
//   upgradeAchievements.forEach(achievement => {
//     if (
//       shopUpgradeCount[index] >= achievement[`upgrade${index}`] &&
//       !achievedUpgradeConditions.includes(achievement.message1)
//     ) {
//       showAchievement(achievement.message1, achievement.message2, achievement.icon);
//       achievedUpgradeConditions.push(achievement.message1);
//     }
//   });
// }


// [0, 1, 2, 3, 4, 5].forEach(index => {
//   setInterval(() => checkUpgradeAchievements(index), 1000);
// });

function checkUpgradeAchievements0() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[0] >= achievement.upgrade0) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}

function checkUpgradeAchievements1() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[1] >= achievement.upgrade1) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}

function checkUpgradeAchievements2() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[2] >= achievement.upgrade2) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}

function checkUpgradeAchievements3() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[3] >= achievement.upgrade3) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}
function checkUpgradeAchievements4() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[4] >= achievement.upgrade4) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}
function checkUpgradeAchievements5() {
  for (const achievement of upgradeAchievements) {
      if ((shopUpgradeCount[5] >= achievement.upgrade5) &&
        !achievedUpgradeConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2, achievement.icon);
        achievedUpgradeConditions.push(achievement.message1);
      }
  }
}

setInterval(checkUpgradeAchievements0, 1000);
setInterval(checkUpgradeAchievements1, 1000);
setInterval(checkUpgradeAchievements2, 1000);
setInterval(checkUpgradeAchievements3, 1000);
setInterval(checkUpgradeAchievements4, 1000);
setInterval(checkUpgradeAchievements5, 1000);


// Function to display achievements in the notification box
function showAchievement(message1, message2, icon) {
  const notification = document.createElement("div");
  notification.className = "notification";

  const iconElement = document.createElement("img");
  iconElement.className = "icon";
  iconElement.src = icon;
  iconElement.alt = "圖";
  // iconElement.className = "notification-icon";

  const messageContainer = document.createElement("div"); // New div for messages
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

  // Append elements to notification
  notification.appendChild(iconElement);
  notification.appendChild(messageContainer); // Append the messageContainer
  notification.appendChild(closeButton);

  notificationBox.appendChild(notification);
}

///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////

const randomEventPool = [
// Random motivation modifiers
  { 
    icon: "./img/icon_randomevent.png",
    color: "red",
    effect_motivation: -10,
    effect_apps: 0,
    message1: "You spilled coffee on yourself",
    message2: "-10 motivation"
  },
  { 
    icon: "./img/icon_randomevent.png",
    color: "green",
    effect_motivation: 10,
    effect_apps: 0,
    message1: "You find $2 on the floor",
    message2: "+10 motivation"
  },


// Random application modifiers
  { 
    icon: "./img/icon_randomevent.png",
    color: "pink",
    effect_motivation: -2,
    effect_apps: -10,
    message1: "your apps were never actually sent",
    message2: "-10 applications"
  },
  { 
    icon: "./img/icon_randomevent.png",
    color: "lightgreen",
    effect_motivation: 4,
    effect_apps: 2,
    message1: "you found more apps in your old jacket",
    message2: "+2 apps"
  },
];

let timer = null; // Initialize timer

// Function to trigger random events
function randomEvent() {
  const randomIndex = Math.floor(Math.random() * randomEventPool.length);
  const event = randomEventPool[randomIndex];
    showRandomEvent(event);
    applyRandomEventEffects(event);
  
}

// Function to display random events in the notification box
function showRandomEvent(randomEvent) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = randomEvent.color;

  const messageContainer = document.createElement("div"); // New div for messages
  messageContainer.className = "message-container";

  // Left column for icon
  const iconElement = document.createElement("img");
  iconElement.src = randomEvent.icon;
  iconElement.className = "icon";

  const message1Element = document.createElement("div");
  message1Element.textContent = randomEvent.message1;
  message1Element.className = "message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = randomEvent.message2;
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
  notification.appendChild(closeButton);
  notification.appendChild(messageContainer); // Append the messageContainer
  notificationBox.appendChild(notification);

  setTimeout(() => {
    notificationBox.removeChild(notification);
}, 5000);
}

// Function to apply the effects of the random event
function applyRandomEventEffects(event) {
  motivation += event.effect_motivation;
  jobApplications += event.effect_apps;
  updateMotivation();
  updateJobApplications();
}

// Set an interval to trigger random events every 60 seconds
setInterval(randomEvent, 60000);


////////////////////////////////////////////////////////////
///////////////////   RANDOM REJECTIONS   //////////////////
////////////////////////////////////////////////////////////

// Define rejections with color, totalApps, and messages
const randomRejectionPool = [
  {
    icon: "./img/email.png",
    color: "grey",
    effect_motivation: -2,
    message1: "REJECTION",
    message2: "Thank you for your interest, unfortunately..",
  },
  {
    icon: "./img/email.png",
    color: "grey",
    effect_motivation: -1,
    message1: "REJECTION",
    message2: "Your app was impressive, but..",
  }
  // Add more rejection events as needed
];

// Function to trigger random REJECTION events
function randomRejection() {
  if (jobApplications >= 100){
  const randomIndex = Math.floor(Math.random() * randomRejectionPool.length);
  const rejectionEvent = randomRejectionPool[randomIndex];
  showRandomRejection(rejectionEvent);
  applyRandomRejectionEffects(rejectionEvent);
  }
}


// Function to display achievements in the notification box
function showRandomRejection(rejectionEvent) {
  totalRejections += 1;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = rejectionEvent.color;

  const messageContainer = document.createElement("div"); // New div for messages
  messageContainer.className = "message-container";

  // Left column for icon
  const iconElement = document.createElement("img");
  iconElement.src = rejectionEvent.icon;
  iconElement.className = "icon";

  const message1Element = document.createElement("div");
  message1Element.textContent = rejectionEvent.message1;
  message1Element.className = "message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = rejectionEvent.message2;
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
  notification.appendChild(closeButton);
  notification.appendChild(messageContainer); // Append the messageContainer
  notificationBox.appendChild(notification);

  setTimeout(() => {
    notificationBox.removeChild(notification);
}, 5000);
}


// Function to apply the effects of the rejection event
function applyRandomRejectionEffects(rejectionEvent) {
  motivation += rejectionEvent.effect_motivation;
  updateMotivation();
}

// Set an interval to trigger random event
setInterval(randomRejection, 60000);


// Initialize the game
updateShop();
updateJobApplications();
updateCPSDisplay(); // Display initial CPS
updateJobPostings(); // Display initial job posting
setInterval(autoGenerateJobApplications, 1000);
setInterval(checkMainAchievements, 1000);