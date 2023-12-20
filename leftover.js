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
const achievements = [
  // manual click achievements
  { 
    clicks: 100, 
    message1: "You manually applied to 10 jobs!",
    message2: "test1" 
  },
  { clicks: 101,
    message1: "You manually applied to 100 jobs!",
    message2: "test2" 
  },
  { clicks: 102, 
    message1: "You manually applied to 1000 jobs!", 
    message2: "test3" 
  },

  // job application achievements
  { 
    apps: 69, 
    message1: "You applied to 69 jobs!",
    message2: "Nice" 
  },
  { apps: 6969,
    message1: "You applied to 6969 jobs!",
    message2: "Very nice" 
  },
  { apps: 10000,
    message1: "You applied to 10000 jobs!",
    message2: "You feel kinda empty inside" 
  },
  { apps: 42069, 
    message1: "You applied to 42069 jobs!", 
    message2: "You blow a small puff of air out of your nostrils" 
  },

  // rejection achievements
  { 
    // color: "yellow",
    rejections: 1, 
    message1: "1 rejection",
    message2: "your 1st rejection!" 
  },
  { 
    // color: "yellow",
    rejections: 10,
    message1: "10 rejections",
    message2: "frick" 
  },

  // // upgrade achievements
  // { 
  //   upgrade1: 1, 
  //   message1: "Your first time actually trying!",
  //   message2: "Owning 1 Trying Harder"
  // },
  // { upgrade1: 5,
  //   message1: "Are you even trying?",
  //   message2: "Owning 5 Trying Harders" 
  // },



  // Add more achievements as needed
];

// Initialize an array to store achieved conditions
const achievedConditions = [];
//////////////////////////////////////////////////

// Function to check for achievements
function checkAchievements() {
  for (const achievement of achievements) {
      if ((manualClick >= achievement.clicks || jobApplications >= achievement.apps || totalRejections === achievement.rejections) &&
        !achievedConditions.includes(achievement.message1)) {
        showAchievement(achievement.message1, achievement.message2);
        achievedConditions.push(achievement.message1);
      }
    }
  }

// Function to display achievements in the notification box
function showAchievement(message1, message2, color) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = color; // Set background color based on the 'color' parameter

  const message1Element = document.createElement("div");
  message1Element.textContent = message1;
  message1Element.className = "achievement-message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = message2;
  message2Element.className = "achievement-message2";

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


///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////

// Define random events as an array of objects
const randomEventPool = [
  { 
      color: "red",
      effect_motivation: -10,
      message1: "You spilled coffee on yourself",
      message2: "-10 motivation"
  },
  { 
      color: "green",
      effect_motivation: 10,
      message1: "You find $2 on the floor",
      message2: "+10 motivation"
  }
];

let timer = null; // Initialize timer

// Function to trigger random events
function randomEvent() {
  const randomIndex = Math.floor(Math.random() * randomEvents.length);
  const event = randomEventPool[randomIndex];
  showRandomEvent(event);
  applyRandomEventEffects(event);
}

// Function to display random events in the notification box
function showRandomEvent(event) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = event.color; // Set background color based on the color in the event object

  const message1Element = document.createElement("div");
  message1Element.textContent = event.message1;
  message1Element.className = "event-message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = event.message2;
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

  setTimeout(() => {
    notificationBox.removeChild(notification);
  }, 5000);
}

// Function to apply the effects of the random event
function applyRandomEventEffects(event) {
  motivation += event.effect_motivation;
  updateMotivation();
}

// Set an interval to trigger random events every 60 seconds
setInterval(randomEvent, 60000);


////////////////////////////////////////////////////////////
//////////////////////   REJECTIONS   //////////////////////
////////////////////////////////////////////////////////////

// Define rejections with color, totalApps, and messages
const randomRejections = [
  {
    color: "grey",
    effect_motivation: -3,
    message1: "REJECTION",
    message2: "Thank you for your interest, unfortunately..",
  },
  {
    color: "grey",
    effect_motivation: -2,
    message1: "REJECTION",
    message2: "Your app was impressive, but..",
  }
  // Add more rejection events as needed
];

// Function to trigger random REJECTION events
function randomRejection() {
  const randomIndex = Math.floor(Math.random() * randomRejections.length);
  const rejectionEvent = randomRejections[randomIndex];
  showRandomRejection(rejectionEvent);
  applyRandomRejectionEffects(rejectionEvent);
}


// Function to display achievements in the notification box
function showRandomRejection(rejectionEvent) {
  totalRejections += 1;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = rejectionEvent.color;

  
  const message1Element = document.createElement("div");
  message1Element.textContent = rejectionEvent.message1;
  message1Element.className = "rejection-message1";
  
  const message2Element = document.createElement("div");
  message2Element.textContent = rejectionEvent.message2;
  message2Element.className = "rejection-message2";
  
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

// Function to apply the effects of the rejection event
function applyRandomRejectionEffects(rejectionEvent) {
  motivation += rejectionEvent.effect_motivation;
  updateMotivation();
}

// Set an interval to trigger random events every 120 seconds
setInterval(randomRejection, 120000);





//////

////////////////////////////////////////////////////////
////////////////////    MUSIC   ////////////////////////
////////////////////////////////////////////////////////
  
// START MUSIC
const bgMusic = document.getElementById("background-music");
const muteButton = document.getElementById("mute-button");
const volumeSlider = document.getElementById("volume-slider");

// Function to start playing the background music
function playBackgroundMusic() {
  bgMusic.play();
}

// Function to toggle the background music (mute/unmute)
function toggleMute() {
if (bgMusic.muted) {
    bgMusic.muted = false;
    muteButton.textContent = "Mute";
} else {
    bgMusic.muted = true;
    muteButton.textContent = "Unmute";
}
}

// Function to handle volume change
function changeVolume() {

bgMusic.volume = volumeSlider.value;
}

volumeSlider.addEventListener("input", changeVolume);
muteButton.addEventListener("click", toggleMute);

// Add an event listener to start playing the music when the page loads
window.addEventListener("load", playBackgroundMusic);




/////// Create a function `randomEvent` and randomEvent will pull from the object below:

const randomEventPool1 = [
  { 
      color: "red",
      effect_motivation: -10,
      effect_apps: 0,
      message1: "You spilled coffee on yourself",
      message2: "-10 motivation"
  },
  { 
      color: "green",
      effect_motivation: 10,
      effect_apps: 0,
      message1: "You find $2 on the floor",
      message2: "+10 motivation"
  }
];

// randomEvent will be funneled into the showNotification function to show. make sure that the color in the object is used to change the color of the notification box





// TRYNA FIGURE OUT HOW OT PUT ICON ON THE LEFT

function updateJobPostings() {
    const jobPostingsElement = document.getElementById("job-postings");
    jobPostingsElement.innerHTML = ""; // Clear the previous job postings
    jobPostingCycle.forEach((posting, index) => {
      const jobPostingItem = document.createElement("div");
      jobPostingItem.className = "job-posting-item";
      if (index === 0) {
        jobPostingItem.classList.add("first-posting");
      }


      const jobInfoContainer = document.createElement("div"); // New div for messages
      jobInfoContainer.className = "job-text-container";


      
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
      
      jobInfoContainer.appendChild(titleElement);
      jobInfoContainer.appendChild(companyElement);
      jobInfoContainer.appendChild(locationElement);
      jobInfoContainer.appendChild(payElement);
      
      jobPostingsElement.appendChild(jobInfoContainer);
    });
  }










//////// ORIGINAL OBJECT ///////
// OBJECT IN OBJECT

const upgradeAchievements = [
    // TRY HARDER [0]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 1, 
      message1: "Your first time actually trying!",
      message2: "Own 1 Trying Harder",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 2,
      message1: "condition met",
      message2: "Own 2 Trying Harders",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 3,
      message1: "condition met",
      message2: "Own 3 Trying Harders",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 4,
      message1: "condition met",
      message2: "Own 4 Trying Harders",
      displayed: false, 
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade0: 5,
      message1: "condition met",
      message2: "Own 5 Trying Harders",
      displayed: false,
    },

    // LINKEDIN PREMIUM [1]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 1, 
      message1: "$40 a month huh?",
      message2: "Own 1 LinkedIn Premium",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 2,
      message1: "Bill Gates thanks you",
      message2: "Own 2 LinkedIn Premiums",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 3,
      message1: "condition met",
      message2: "Own 3 LinkedIn Premiums",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 4,
      message1: "condition met",
      message2: "Own 4 LinkedIn Premiums",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade1: 5,
      message1: "condition met",
      message2: "Own 5 LinkedIn Premiums",
      displayed: false,
    },
    

    // OUTSOURCE TO FIVERR [2]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 1, 
      message1: "Thank you Mr. Patel!",
      message2: "First outsourced applier",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 2,
      message1: "TEST 2",
      message2: "Own 2 outsourced worker",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 3,
      message1: "condition met",
      message2: "Own 3 Fiverr outsources",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 4,
      message1: "condition met",
      message2: "Own 100 Fiverr outsources",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade2: 5,
      message1: "condition met",
      message2: "Own 500 Fiverr outsources",
      displayed: false,
    },



    //  SEVERANCES [3]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 1, 
      message1: "condition met",
      message2: "Own 1 severance",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 2,
      message1: "condition met",
      message2: "Own 2 severances",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 3,
      message1: "condition met",
      message2: "Own 25 upgrades",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 4,
      message1: "condition met",
      message2: "Own 100 upgrades",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade3: 5,
      message1: "condition met",
      message2: "Own 500 upgrades",
      displayed: false,
    },

  // ADD MORE WHEN NEEDED

    //  UNEMPLOYMENT [4]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 1, 
      message1: "condition met",
      message2: "Own 1 unemployment",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 2,
      message1: "condition met",
      message2: "Own 2 unemployments",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 3, 
      message1: "condition met",
      message2: "Own 3 unemployments",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 4,
      message1: "condition met",
      message2: "Own 4 unemployments",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade4: 5,
      message1: "condition met",
      message2: "Own 5 unemployments",
      displayed: false,
    },

    //  SOME GUY [5]
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 1, 
      message1: "condition met",
      message2: "Know 1 guy who work in the unemployment office",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 2,
      message1: "condition met",
      message2: "Know 2 guys who work in the unemployment office",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 3, 
      message1: "condition met",
      message2: "Know 3 guys who work in the unemployment office",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 4,
      message1: "condition met",
      message2: "Know 4 guys who work in the unemployment office",
      displayed: false,
    },
    { 
      icon: "./img/icon_upgradeachievement.png",
      upgrade5: 5, 
      message1: "condition met",
      message2: "Know 5 guys who work in the unemployment office",
      displayed: false,
    },
];

// UPDATED CHECKUPGRADE

// Function to check for UPGRADE achievements
function checkUpgradeAchievements(index) {
    const achievements = upgradeAchievements[`upgrade${index}`];
    for (const achievement of achievements) {
      if (
        shopUpgradeCount[index] >= achievement.amount &&
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
  
  // Use Object.keys to get the upgrade keys (0, 1, 2, 3, 4, 5)
  Object.keys(upgradeAchievements).forEach(index => {
    setInterval(() => checkUpgradeAchievements(index), 1000);
  });
  


/// UPDATED OBJECT
const upgradeAchievements1 = {
    // TRY HARDER [0]
    upgrade0: [
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 1,
            message1: "Your first time actually trying!",
            message2: "Own 1 Trying Harder",
            displayed: false,
        },
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "condition met",
            message2: "Own 2 Trying Harders",
            displayed: false,
        },
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 3 Trying Harders",
            displayed: false,
        },
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 4 Trying Harders",
            displayed: false,
        },
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 5 Trying Harders",
            displayed: false,
        },
    ],
  
    // LINKEDIN PREMIUM [1]
    upgrade1: [
        {
            icon: "./img/icon_upgradeachievement.png",
            amount: 1, 
            message1: "$40 a month huh?",
            message2: "Own 1 LinkedIn Premium",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "Bill Gates thanks you",
            message2: "Own 2 LinkedIn Premiums",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 3 LinkedIn Premiums",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 4 LinkedIn Premiums",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 5 LinkedIn Premiums",
            displayed: false,
        },
    ],
  
    // OUTSOURCE TO FIVERR [2]
    upgrade2: [
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 1, 
            message1: "Thank you Mr. Patel!",
            message2: "First outsourced applier",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "TEST 2",
            message2: "Own 2 outsourced worker",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 3 Fiverr outsources",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 100 Fiverr outsources",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 500 Fiverr outsources",
            displayed: false,
        },
    ],
  
  
    //  SEVERANCES [3]
    upgrade3: [
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 1, 
            message1: "condition met",
            message2: "Own 1 severance",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "condition met",
            message2: "Own 2 severances",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 25 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 100 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 500 upgrades",
            displayed: false,
        },
    ],
  
    //  UNEMPLOYMENT [4]
    upgrade4: [
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 1, 
            message1: "condition met",
            message2: "Own 1 severance",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "condition met",
            message2: "Own 2 severances",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 25 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 100 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 500 upgrades",
            displayed: false,
        },
    ],
  
    //  UMEMPLOYMENT [5]
    upgrade5: [
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 1, 
            message1: "condition met",
            message2: "Own 1 severance",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 2,
            message1: "condition met",
            message2: "Own 2 severances",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 3,
            message1: "condition met",
            message2: "Own 25 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 4,
            message1: "condition met",
            message2: "Own 100 upgrades",
            displayed: false,
        },
        { 
            icon: "./img/icon_upgradeachievement.png",
            amount: 5,
            message1: "condition met",
            message2: "Own 500 upgrades",
            displayed: false,
        },
    ],
  };








  /// UPDATED JOB POSTING//
  const jobTitles = [
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
  
  const jobCompanies = [
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
  
  const jobLocations = [
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
    const maxIndex = 10; // Assuming you have images named 0.png to 9.png
    const actualIndex = index % (maxIndex + 1); // Use modulo to ensure it wraps around
    return `${iconFolderPath}${actualIndex}.png`;
  }
  
  function getRandomPayAndBenefits() {
    const minPay = Math.floor(Math.random() * 50) + 30; // Random pay between $30k and $80k
    const maxPay = minPay + Math.floor(Math.random() * 20) + 10; // Random benefits between 10 and 30
    return `$${minPay}k/yr - $${maxPay}k/yr · ${Math.floor(Math.random() * 5)} benefits`;
  }
  
  const jobPostingCycleObj = Array.from({ length: jobTitles.length }, (_, id) => ({
    id,
    icon: getIconPath(id),
    title: jobTitles[id],
    company: jobCompanies[id],
    location: jobLocations[id],
    pay: getRandomPayAndBenefits(),
  }));
  
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





// OLD SHOP CODE
// Function to update the AutoApplications in the shop
// function updateShop() {
//   const shopElement = document.getElementById("shop");
//   shopElement.innerHTML = ""; // Clear the previous shop items

//   shopObj.forEach(shop => {
//       const iconElement = document.createElement("img");
//       iconElement.src = shop.icon;
//       iconElement.className = "shop-icon";
  
//       const shopItem = document.createElement("div");
//       shopItem.className = "shop-item";

//       const nameElement = document.createElement("div");
//       nameElement.className = "item-name";
//       nameElement.textContent = shop.name;

//       const costElement = document.createElement("div");
//       costElement.className = "item-cost";
//       costElement.textContent = `Cost: -${shop.cost} Motivation`;

//       const clicksPerSecondElement = document.createElement("div");
//       clicksPerSecondElement.className = "item-cps";
//       clicksPerSecondElement.textContent = `Apps/sec: +${shop.clicksPerSecond}`;

//       const countElement = document.createElement("div");
//       countElement.className = "item-count";
//       countElement.textContent = `owned: ${shop.count}`;

//       shopItem.appendChild(iconElement);
//       shopItem.appendChild(nameElement);
//       shopItem.appendChild(costElement);
//       shopItem.appendChild(clicksPerSecondElement);
//       shopItem.appendChild(countElement);

//       shopItem.addEventListener("click", () => buyAutoApplication(shop));
//       shopElement.appendChild(shopItem);
//   });
// }