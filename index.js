// Initialize variables
let motivation = 0
let autoApplications = [];
let clickValue = 1000;
let totalClicksPerSecond = 0;
let jobApplications = 0;
let manualClick = 0;
let totalRejections = 0


////////////////////////////////////////////////////////////
///////////////////    MAIN GAMEPLAY   /////////////////////
////////////////////////////////////////////////////////////
  
// Define a variable to keep track of sound state (on or off)
let isSoundOn = true;

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

// Function to update the AutoApplications in the shop
function updateShop() {
  const shopElement = document.getElementById("shop");
  shopElement.innerHTML = ""; // Clear the previous shop items

  shopObj.forEach(shop => {
      const iconElement = document.createElement("img");
      iconElement.src = shop.icon;
      iconElement.className = "shop-icon";
  
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
  // totalRejections += 1 * totalClicksPerSecond;
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

const jobPostingCycleObj = [
  {
    id: 0,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    // title: "111111111111111",
    title: "Executive Intern",
    company: "Interns Collective",
    location: "New York, NY",
    pay: "$0k/yr - $0.7k/yr · 0 benefits",
  },
  {
    id: 1,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    // title: "222222222222",
    title: "Totally Real Role",
    company: "Indian Guy named John Kyle",
    location: "Springfield, MA",
    pay: "$69k/yr - $69.7k/yr · 10 benefits",
  },
  {
    id: 2,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    // title: "3333333333",
    title: "Analist Jr.",
    company: "Pen Island Solutions",
    location: "Taipei, Taiwan",
    pay: "$12k/yr - $30k/yr · 3 benefits",
  },
  {
    id: 3,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    // title: "444444444444",
    title: "Digital Dreamer",
    company: "Unicorn Innovations",
    location: "San Francisco, CA",
    pay: "$55k/yr - $65k/yr · 5 benefits",
  },
  {
    id: 4,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Code Whisperer",
    company: "Pixel Perfectionists",
    location: "Seattle, WA",
    pay: "$45k/yr - $55k/yr · 4 benefits",
  },
  {
    id: 5,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Social Media Sorcerer",
    company: "Meme Magic Enterprises",
    location: "Los Angeles, CA",
    pay: "$40k/yr - $50k/yr · 3 benefits",
  },
  {
    id: 6,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "AI Wizard",
    company: "Quantum Quokka Technologies",
    location: "Sydney, Australia",
    pay: "$60k/yr - $69k/yr · 6 benefits",
  },
  {
    id: 7,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Space Explorer",
    company: "Galactic Gourmet Solutions",
    location: "Houston, TX",
    pay: "$50k/yr - $60k/yr · 5 benefits",
  },
  {
    id: 8,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Robot Wrangler",
    company: "Automaton Asylum",
    location: "Berlin, Germany",
    pay: "$35k/yr - $45k/yr · 2 benefits",
  },
  {
    id: 9,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Crypto Crusader",
    company: "Blockchain Buccaneers",
    location: "Singapore",
    pay: "$25k/yr - $35k/yr · 1 benefit",
  },
  {
    id: 10,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Data Diviner",
    company: "Byte Mystic Guild",
    location: "Toronto, Canada",
    pay: "$30k/yr - $40k/yr · 3 benefits",
  },
  {
    id: 11,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Virtual Visionary",
    company: "VR Wonderland Enterprises",
    location: "Tokyo, Japan",
    pay: "$55k/yr - $65k/yr · 4 benefits",
  },
  {
    id: 12,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "E-commerce Enchanter",
    company: "Magical Marketplace Co.",
    location: "London, UK",
    pay: "$40k/yr - $50k/yr · 2 benefits",
  },
  {
    id: 13,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Data Dinosaur Tamer",
    company: "Jurassic Analytics Ltd.",
    location: "Denver, CO",
    pay: "$30k/yr - $40k/yr · 1 benefit",
  },
  {
    id: 14,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Cybernetic Maestro",
    company: "Bit Symphony Solutions",
    location: "Austin, TX",
    pay: "$45k/yr - $55k/yr · 3 benefits",
  },
  {
    id: 15,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Augmented Reality Artisan",
    company: "Virtual Canvas Creations",
    location: "Barcelona, Spain",
    pay: "$50k/yr - $60k/yr · 4 benefits",
  },
  {
    id: 16,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Quantum Questmaster",
    company: "Nebula Navigators Inc.",
    location: "Mumbai, India",
    pay: "$35k/yr - $45k/yr · 2 benefits",
  },
  {
    id: 17,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Machine Learning Maven",
    company: "Algorithm Alchemists",
    location: "Paris, France",
    pay: "$60k/yr - $69k/yr · 5 benefits",
  },
  {
    id: 18,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Innovation Instigator",
    company: "Disruptive Dynamics Co.",
    location: "New York, NY",
    pay: "$50k/yr - $60k/yr · 4 benefits",
  },
  {
    id: 19,
    icon: "./img/jobPostingIcons/icon_jobposting.png",
    title: "Game Dev Guru",
    company: "Pixel Play Studios",
    location: "Osaka, Japan",
    pay: "$45k/yr - $55k/yr · 3 benefits",
  },
];

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
    message1: "Your first time actually trying!",
    message2: "Own 1 Try Harder",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 10,
    message1: "condition met",
    message2: "Own 10 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 50,
    message1: "condition met",
    message2: "Own 50 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 100,
    message1: "condition met",
    message2: "Own 100 Try Harders",
    displayed: false, 
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 500,
    message1: "condition met",
    message2: "Own 500 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 1000,
    message1: "condition met",
    message2: "Own 1000 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 2500,
    message1: "condition met",
    message2: "Own 2500 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 5000,
    message1: "condition met",
    message2: "Own 5000 Try Harders",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade0: 10000,
    message1: "condition met",
    message2: "Own 10000 Try Harders",
    displayed: false,
  },

  // LinkIndeed PREMIUM [1]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 1, 
    message1: "$40 a month huh?",
    message2: "Own 1 LinkIndeed Premium",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 10,
    message1: "Bill Gates thanks you",
    message2: "Own 10 LinkIndeed Premiums",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 50,
    message1: "condition met",
    message2: "Own 50 LinkIndeed Premiums",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 100,
    message1: "condition met",
    message2: "Own 100 LinkIndeed Premiums",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade1: 500,
    message1: "condition met",
    message2: "Own 500 LinkIndeed Premiums",
    displayed: false,
  },
  

  // OUTSOURCE TO FIVERR [2]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 1, 
    message1: "Thank you Mr. Patel!",
    message2: "First outsourced applier",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 2,
    message1: "TEST 2",
    message2: "Own 2 outsourced worker",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 3,
    message1: "condition met",
    message2: "Own 3 Fiverr outsources",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 4,
    message1: "condition met",
    message2: "Own 100 Fiverr outsources",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade2: 5,
    message1: "condition met",
    message2: "Own 500 Fiverr outsources",
    displayed: false,
  },



  //  SEVERANCES [3]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 1, 
    message1: "condition met",
    message2: "Own 1 severance",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 2,
    message1: "condition met",
    message2: "Own 2 severances",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 3,
    message1: "condition met",
    message2: "Own 25 upgrades",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 4,
    message1: "condition met",
    message2: "Own 100 upgrades",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade3: 5,
    message1: "condition met",
    message2: "Own 500 upgrades",
    displayed: false,
  },

// ADD MORE WHEN NEEDED

  //  UNEMPLOYMENT [4]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 1, 
    message1: "condition met",
    message2: "Own 1 unemployment",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 2,
    message1: "condition met",
    message2: "Own 2 unemployments",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 3, 
    message1: "condition met",
    message2: "Own 3 unemployments",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 4,
    message1: "condition met",
    message2: "Own 4 unemployments",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade4: 5,
    message1: "condition met",
    message2: "Own 5 unemployments",
    displayed: false,
  },

  //  SOME GUY [5]
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 1, 
    message1: "condition met",
    message2: "Know 1 guy who work in the unemployment office",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 2,
    message1: "condition met",
    message2: "Know 2 guys who work in the unemployment office",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 3, 
    message1: "condition met",
    message2: "Know 3 guys who work in the unemployment office",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 4,
    message1: "condition met",
    message2: "Know 4 guys who work in the unemployment office",
    displayed: false,
  },
  { 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    upgrade5: 5, 
    message1: "condition met",
    message2: "Know 5 guys who work in the unemployment office",
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
    // Check if the achievement is displayed
    if (achievement.displayed) {
      // Display the icon
      const iconImage = document.createElement("img");
      iconImage.src = achievement.icon;
      iconImage.alt = "Achievement Icon";

      // Create a tooltip div for message2
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = achievement.message1;

      // Append the tooltip to the icon
      
      // Append the icon to the achievementListDiv
      achievementListDiv.appendChild(iconImage);
      achievementListDiv.appendChild(tooltip);
      
    } else {
      // Display "?" for not achieved
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











///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////

const randomEventPool = [
// Random NEGATIVE events
  {
    id: 0,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -9,
    effect_apps: -2,
    message1: "You spilled ketchup on your interview outfit",
    message2: "-9 motivation, -2 applications",
  },
  {
    id: 1,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -7,
    effect_apps: -4,
    message1: "You accidentally sent a cat meme to recruiters",
    message2: "-7 motivation, -4 applications",
  },
  {
    id: 2,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -8,
    effect_apps: -3,
    message1: "You mistook the CEO for the janitor during a networking event",
    message2: "-8 motivation, -3 applications",
  },
  {
    id: 3,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -10,
    effect_apps: -1,
    message1: "You said 'mic drop' after answering an interview question",
    message2: "-10 motivation, -1 application",
  },
  {
    id: 4,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -6,
    effect_apps: -5,
    message1: "You applied for a job at your own company",
    message2: "-6 motivation, -5 applications",
  },
  {
    id: 5,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -9,
    effect_apps: -2,
    message1: "You spoke in memes during a serious phone interview",
    message2: "-9 motivation, -2 applications",
  },
  {
    id: 6,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -7,
    effect_apps: -4,
    message1: "You mentioned your ex-boss's ghost as a reference",
    message2: "-7 motivation, -4 applications",
  },
  {
    id: 7,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -8,
    effect_apps: -3,
    message1: "You wore pajamas to a video job interview",
    message2: "-8 motivation, -3 applications",
  },
  {
    id: 8,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -10,
    effect_apps: -1,
    message1: "You dropped your resume into the virtual trash can",
    message2: "-10 motivation, -1 application",
  },
  {
    id: 9,
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    effect_motivation: -6,
    effect_apps: -5,
    message1: "You attached a cat video instead of a cover letter",
    message2: "-6 motivation, -5 applications",
  },

// random POSITIVE events
  {
    id: 10,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 3,
    effect_apps: 2,
    message1: "Recruiters mistook you for a genius prodigy",
    message2: "+3 motivation, +2 applications",
  },
  {
    id: 11,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 7,
    effect_apps: 3,
    message1: "Your resume became an internet sensation overnight",
    message2: "+7 motivation, +3 applications",
  },
  {
    id: 12,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 10,
    effect_apps: 0,
    message1: "LinkIndeed awarded you 'Most Employable Person' title",
    message2: "+10 motivation",
  },
  // {
  //   id: 13,
  //   icon: "./img/randomIcons/icon_randomevent_good.png",
  //   color: "green",
  //   effect_motivation: 9,
  //   effect_apps: 1,
  //   message1: "Interviewers hailed you as the 'Answer Guru'",
  //   message2: "+9 motivation, +1 application",
  // },
  {
    id: 14,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 6,
    effect_apps: 4,
    message1: "Your cover letter became a viral motivational speech",
    message2: "+6 motivation, +4 applications",
  },
  // {
  //   id: 15,
  //   icon: "./img/randomIcons/icon_randomevent_good.png",
  //   color: "green",
  //   effect_motivation: 5,
  //   effect_apps: 5,
  //   message1: "Received fan mail for your incredible resume design",
  //   message2: "+5 motivation, +5 applications",
  // },
  {
    id: 16,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 7,
    effect_apps: 3,
    message1: "Recruiters mistakenly thought you invented the internet",
    message2: "+7 motivation, +3 applications",
  },
  // {
  //   id: 17,
  //   icon: "./img/randomIcons/icon_randomevent_good.png",
  //   color: "green",
  //   effect_motivation: 8,
  //   effect_apps: 2,
  //   message1: "A unicorn appeared during your virtual interview",
  //   message2: "+8 motivation, +2 applications",
  // },
  {
    id: 18,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 6,
    effect_apps: 4,
    message1: "Your resume was declared a national treasure",
    message2: "+6 motivation, +4 applications",
  },
  {
    id: 19,
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    effect_motivation: 9,
    effect_apps: 1,
    message1: "Career fair attendees mistook you for the CEO",
    message2: "+9 motivation, +1 application",
  },

];

let timer = null; // Initialize timer

// Function to trigger random events
function randomEvent() {
  const randomIndex = Math.floor(Math.random() * randomEventPool.length);
  const event = randomEventPool[randomIndex];
    showRandomEvent(event);
    applyRandomEventEffect(event);
  
}

// Function to display random events in the notification box
function showRandomEvent(randomEvent) {
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
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);


//   setTimeout(() => {
//     notificationBox.removeChild(notification);
// }, 15000);
}

// Function to apply the effects of the random event
function applyRandomEventEffect(event) {
  motivation += event.effect_motivation;
  jobApplications += event.effect_apps;
  updateMotivation();
  updateJobApplications();
}



////////////////////////////////////////////////////////////
///////////////////   RANDOM REJECTIONS   //////////////////
////////////////////////////////////////////////////////////

const randomRejectionPool = [
  {
    id: 0,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -2,
    message1: "Thank you for your interest, unfortunately..",
    message2: "-2 motivation",
  },
  {
    id: 1,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -1,
    message1: "Your app was impressive, but..",
    message2: "-1 motivation",
  },
  {
    id: 2,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -4,
    message1: "We appreciate your effort, but..",
    message2: "-4 motivation",
  },
  {
    id: 3,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -3,
    message1: "Despite your skills, unfortunately..",
    message2: "-3 motivation",
  },
  {
    id: 4,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -5,
    message1: "Regrettably, your submission falls short..",
    message2: "-5 motivation",
  },
  {
    id: 5,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -2,
    message1: "We regret to inform you, but..",
    message2: "-2 motivation",
  },
  {
    id: 6,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -1,
    message1: "Your application was considered, however..",
    message2: "-1 motivation",
  },
  {
    id: 7,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -3,
    message1: "Despite your potential, we must..",
    message2: "-3 motivation",
  },
  {
    id: 8,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -4,
    message1: "We regretfully inform you that..",
    message2: "-4 motivation",
  },
  {
    id: 9,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -5,
    message1: "Despite your efforts, we must..",
    message2: "-5 motivation",
  },
  {
    id: 10,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -2,
    message1: "We appreciate your interest, however..",
    message2: "-2 motivation",
  },
  {
    id: 11,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -3,
    message1: "Your skills are commendable, but..",
    message2: "-3 motivation",
  },
  {
    id: 12,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -4,
    message1: "We regret to inform you that..",
    message2: "-4 motivation",
  },
  {
    id: 13,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -1,
    message1: "Despite your dedication, unfortunately..",
    message2: "-1 motivation",
  },
  {
    id: 14,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -5,
    message1: "Regrettably, your application did not meet..",
    message2: "-5 motivation",
  },
  {
    id: 15,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -3,
    message1: "We regretfully inform you that..",
    message2: "-3 motivation",
  },
  {
    id: 16,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -2,
    message1: "Despite your potential, we must..",
    message2: "-2 motivation",
  },
  {
    id: 17,
    icon: "./img/randomIcons/icon_rejection.png",
    color: "grey",
    effect_motivation: -4,
    message1: "Thank you for your submission, unfortunately..",
    message2: "-4 motivation",
  },
  // Add more rejection events as needed
];

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
  notification.appendChild(messageContainer);
  notification.appendChild(closeButton);
  notificationBox.appendChild(notification);

//   setTimeout(() => {
//     notificationBox.removeChild(notification);
// }, 15000);
}

// Function to apply the effects of the rejection event
function applyRandomRejectionEffects(rejectionEvent) {
  motivation += rejectionEvent.effect_motivation;
  updateMotivation();
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
setInterval(randomRejection, 14000);
// Set an interval to trigger random events every 60 seconds
setInterval(randomEvent, 13000);
