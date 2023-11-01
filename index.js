// Initialize variables
let jobApplications = 0;
let motivation = 0
let autoApplications = [];
let clickValue = 1;
let totalClicksPerSecond = 0;
let motivationPerSecond = 0;
let manualClick = 0;
let totalRejections = 0

// Get HTML elements
const jobApplicationsElement = document.getElementById("job-applications");
const motivationElement = document.getElementById("motivation");
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
  cpsDisplay.textContent = `Apps per second: ${totalClicksPerSecond.toFixed(2)}`; // Display CPS rounded to 2 decimal places
}

// Function to update the motivation count on the screen
function updateMotivation() {
  motivationElement.textContent = `Motivation: ${Math.floor(motivation)}`;
}

// Function to update the motivation per second display
function updateMotivationPerSecond() {
  const mpsDisplay = document.getElementById("mps-display");
  mpsDisplay.textContent = `Motivation per second: ${motivationPerSecond.toFixed(1)}`; // Display MPS rounded to 2 decimal places
}

// Function to calculate the total clicks per second
function calculateTotalClicksPerSecond() {
  totalClicksPerSecond = 0;
  motivationPerSecond = 0; // Initialize motivation per second
  for (const app of autoApplications) {
      totalClicksPerSecond += app.count * app.clicksPerSecond;
      motivationPerSecond += app.count * (0.1 * app.clicksPerSecond); // Increase motivation per second based on AutoApplications
  }
  updateMotivationPerSecond(); // Update the MPS display
}

////////////////////////////////////////////////////////////
///////////////////     SHOP STUFF    //////////////////////
////////////////////////////////////////////////////////////


// Function to update the AutoApplications in the shop
function updateShop() {
  const shopElement = document.getElementById("shop");
  shopElement.innerHTML = ""; // Clear the previous shop items

  autoApplications.forEach(app => {
      const shopItem = document.createElement("div");
      shopItem.className = "shop-item";

      const nameElement = document.createElement("div");
      nameElement.className = "item-name";
      nameElement.textContent = app.name;

      const costElement = document.createElement("div");
      costElement.className = "item-cost";
      costElement.textContent = `Cost: -${app.cost} Motivation`;

      const clicksPerSecondElement = document.createElement("div");
      clicksPerSecondElement.className = "item-cps";
      clicksPerSecondElement.textContent = `Apps/sec: +${app.clicksPerSecond}`;

      const countElement = document.createElement("div");
      countElement.className = "item-count";
      countElement.textContent = `owned: ${app.count}`;

      shopItem.appendChild(nameElement);
      shopItem.appendChild(costElement);
      shopItem.appendChild(clicksPerSecondElement);
      shopItem.appendChild(countElement);

      shopItem.addEventListener("click", () => buyAutoApplication(app));
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
  }
}


////////////////////////////////////////////////////////////
///////////////////    AUTOCLICKER    //////////////////////
////////////////////////////////////////////////////////////


// Function to add job applications automatically based on CPS
function autoGenerateJobApplications() {
  jobApplications += totalClicksPerSecond;
  motivation += 0.1 * totalClicksPerSecond; // Increase motivation based on job applications clicked
  updateMotivation();
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
        id: 1,
        name: "Trying Harder",
        cost: 10,
        clicksPerSecond: 0.1,
        count: 0,
    },
    {
        id: 2,
        name: "LinkedIn Premium",
        cost: 50,
        clicksPerSecond: 1,
        count: 0,
    },
    {
        id: 3,
        name: "Outsource to Fiverr",
        cost: 100,
        clicksPerSecond: 5,
        count: 0,
    },
    {
        id: 4,
        name: "Severance",
        cost: 200,
        clicksPerSecond: 10,
        count: 0,
    },
    {
        id: 5,
        name: "Umemployment Benefits",
        cost: 300,
        clicksPerSecond: 20,
        count: 0,
    },
    {
        id: 4,
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
      
      const titleElement = document.createElement("div");
      titleElement.className = "job-title";
      titleElement.textContent = posting.title;
      
      const companyElement = document.createElement("div");
      companyElement.className = "job-company";
      companyElement.textContent = posting.company;
      
      jobPostingItem.appendChild(titleElement);
      jobPostingItem.appendChild(companyElement);
      
      jobPostingsElement.appendChild(jobPostingItem);
    });
  }
  
  jobPostingCycle = [
    {
      id: 1,
      title: "Executive Intern",
      company: "Interns Collective",
    },
    {
      id: 2,
      title: "Superb Internment",
      company: "Superb Owl Inc.",
    },
    {
      id: 3,
      title: "Junior Analyst [UNPAID]",
      company: "Boaty McBoatface",
    },
    {
      id: 4,
      title: "Analist Jr.",
      company: "Plug-In Solutions",
    },
    {
      id: 5,
      title: "Totally Real Role",
      company: "Indian Recruiter with American Name",
    },
    {
      id: 6,
      title: "Master of Improbable Events",
      company: "Infinite Improbability Corp.",
    },
    {
      id: 7,
      title: "Absurdity Apprentice",
      company: "Absurdity Architects, Inc.",
    },
    {
      id: 8,
      title: "Chief Penguin Plunger",
      company: "Penguin Plunge Productions",
    },
    {
      id: 9,
      title: "Chaos Coordinator",
      company: "Chaos Coasters, Ltd.",
    },
    {
      id: 10,
      title: "Wizarding Intern of Whimsy",
      company: "Whimsical Widget Wizards",
    },
    // Add more entries here
    {
      id: 11,
      title: "Lord of Laughter",
      company: "Giggle Galaxy, LLC",
    },
    {
      id: 12,
      title: "Surreal Sales Shaman",
      company: "Dreamscape Dealers",
    },
    {
      id: 13,
      title: "Crazy Cat-herder",
      company: "Feline Folly, Inc.",
    },
    {
      id: 14,
      title: "Master of Mischief",
      company: "Prankster Paradise Ltd.",
    },
    {
      id: 15,
      title: "Executive Eccentric",
      company: "Absurd Adventures, LLC",
    },
    {
      id: 16,
      title: "Clownish Content Creator",
      company: "Silly Stream Studios",
    },
    {
      id: 17,
      title: "Captain of Nonsense",
      company: "Ridiculous Realms Co.",
    },
    {
      id: 18,
      title: "Llama Lama Leader",
      company: "Llama Lovers United",
    },
    {
      id: 19,
      title: "Whacky Wizard of Woo",
      company: "Bizarre Business Wizards",
    },
    {
      id: 20,
      title: "Director of Doodles",
      company: "Artistic Antics, Inc.",
    },
    {
      id: 21,
      title: "Supreme Silly Scientist",
      company: "Absurd Alchemy Labs",
    },
    {
      id: 22,
      title: "Nonsensical Number Cruncher",
      company: "Chaos Calculations, Ltd.",
    },
    {
      id: 23,
      title: "Mirthful Marketing Maestro",
      company: "Comedy Campaign Creators",
    },
    {
      id: 24,
      title: "Jester of Jargon",
      company: "Witty Wordsmiths, LLC",
    },
    {
      id: 25,
      title: "Chuckle Captain",
      company: "Hilarious Hijinks, Inc.",
    },
  ];



////////////////////////////////////////////////////////////
///////////////////    MAIN GAMEPLAY   /////////////////////
////////////////////////////////////////////////////////////
  
  
// Function to handle clicking and adding job applications
function clickForJobApplications() {
    motivation += 0.217 * clickValue; // Increase motivation based on job applications clicked
    manualClick += 1;
    updateJobApplications();
    updateMotivation();
    cycleJobPostings(); // Cycle job postings on each click
    updateJobPostings();
    checkAchievements();
}

// Add a click event listener to the button
clickButton.addEventListener("click", clickForJobApplications);



////////////////////////////////////////////////////////////
////////////////////////    MUSIC   ////////////////////////
////////////////////////////////////////////////////////////
  
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
    clicks: 10, 
    message1: "You manually applied to 10 jobs!",
    message2: "You feel good about yourself!" 
  },
  { clicks: 100,
    message1: "You manually applied to 100 jobs!",
    message2: "You're kinda tired, but it's okay!" 
  },
  { clicks: 1000, 
    message1: "You manually applied to 1000 jobs!", 
    message2: "You wonder if you'll hear back from any of them" 
  },


  // rejection achievements
  { 
    rejections: 1, 
    message1: "You first rejection letter!",
    message2: "Frickin whatever!" 
  },
  { rejections: 5,
    message1: "5 rejection letters!",
    message2: "All good, it's a numbers game!" 
  },

  // upgrade achievements
  { 
    upgrade1: 1, 
    message1: "Your first time actually trying!",
    message2: "Owning 1 Trying Harder"
  },
  { upgrade1: 5,
    message1: "Are you even trying?",
    message2: "Owning 5 Trying Harders" 
  },



  // Add more achievements as needed
];

// Function to check for achievements
function checkAchievements() {
  for (const achievement of achievements) {
      if (manualClick === achievement.clicks) {
          showAchievement(achievement.message1, achievement.message2);
      } if (totalRejections === achievements.rejections) {
          showAchievement(achievement.message1, achievement.message2);

          // try harder
      } if (autoApplications[0].count === achievements.upgrade1) {
        showAchievement(achievement.message1, achievement.message2);

      }
  }
}

// Function to display achievements in the notification box
function showAchievement(message1, message2) {
  const notification = document.createElement("div");
  notification.className = "notification";
  
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
const randomEvents = [
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
  const event = randomEvents[randomIndex];
  showRandomEvent(event);
  applyRandomEventEffects(event);
}

// Function to display random events in the notification box
function showRandomEvent(event) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = event.color;

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
const rejections = [
  {
      color: "grey",
      totalApps: 100,
      message1: "REJECTION",
      message2: "Thank you for your interest, unfortunately..",
  },
  {
      color: "grey",
      totalApps: 500,
      message1: "REJECTION",
      message2: "Your app was impressive, but..",
  }
  // Add more rejection events as needed
];

// Initialize the rejection counter
let rejectionsCount = 0;

// Function to check for rejections
function checkRejections() {
  for (const rejection of rejections) {
      if (jobApplications >= rejection.totalApps && rejectionsCount < rejection.totalApps) {
          showRejection(rejection);
          rejectionsCount = rejection.totalApps;
      }
  }
}

// Function to display rejection notifications in the notification box
function showRejection(rejection) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.backgroundColor = rejection.color;

  const message1Element = document.createElement("div");
  message1Element.textContent = rejection.message1;
  message1Element.className = "event-message1";

  const message2Element = document.createElement("div");
  message2Element.textContent = rejection.message2;
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

// Set an interval to check for rejections
setInterval(checkRejections, 1000); // Adjust the interval as needed



// Initialize the game
updateShop();
updateJobApplications();
updateCPSDisplay(); // Display initial CPS
updateJobPostings(); // Display initial job posting
setInterval(autoGenerateJobApplications, 1000);