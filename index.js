// Initialize variables
// let jobApplications = 0;
let motivation = 0
let autoApplications = [];
let clickValue = 1;
let totalClicksPerSecond = 0;
let motivationPerSecond = 0;
let jobApplications = 0;
let manualClick = 0;
let totalRejections = 0
// let manualClick = 0;

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
  for (const app of autoApplications) {
      totalClicksPerSecond += app.count * app.clicksPerSecond;
      motivationPerSecond += app.count * (0.1 * app.clicksPerSecond); // Increase motivation per second based on AutoApplications
  }
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
  // jobApplications += clickValue;
  motivation += 0.1 * clickValue;
  manualClick += 1;
  updateJobApplications();
  updateMotivation();
  cycleJobPostings();
  calculateTotalClicksPerSecond();
}

// Add a click event listener to the button
clickButton.addEventListener("click", clickForJobApplications);


////////////////////////////////////////////////////////////
////////////////////    NOTIFICATION   /////////////////////
////////////////////////////////////////////////////////////
  
const notificationBox = document.getElementById("notification-box"); // Add notification box

// Modify showNotification to include notification color
function showNotification(message, color) {
  notificationText.textContent = message;
  notificationBox.style.display = "block";
  notificationBox.style.backgroundColor = color;
}

// Function to close the notification
function closeNotification() {
  notificationBox.style.display = "none";
}


///////////////////////////////////////////////////////////
/////////////////////  ACHIEVEMENT  ///////////////////////
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
/////////////////////  RANDOM EVENT  //////////////////////
///////////////////////////////////////////////////////////

// Random event pool
const randomEventPool = [
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


// Function to generate a random event
function randomEvent() {
  const randomIndex = Math.floor(Math.random() * randomEventPool.length);
  return randomEventPool[randomIndex];
}

// Function to show a random event notification
function showRandomEvent() {
  const event = randomEvent();
  const message = `${event.message1}\n${event.message2}`;
  showNotification(message, event.color);
}

// Function to apply the effects of a random event
function applyEffect(event) {
  motivation += event.effect_motivation;
  jobApplications += event.effect_apps;

  // Ensure motivation and jobApplications are non-negative
  motivation = Math.max(0, motivation);
  jobApplications = Math.max(0, jobApplications);

  // Update the displays
  updateJobApplications();
  updateMotivation();
}


// Function to trigger a random event every 1 second
setInterval(() => {
  // Show a random event with a chance of 20%
  if (Math.random() < 0.2) {
      showRandomEvent();
  }
}, 1000);


////////////////////////////////////////////////////////////
///////////////////   RANDOM REJECTION   ///////////////////
////////////////////////////////////////////////////////////



// Initialize the game
updateShop();
updateJobApplications();;
updateCPSDisplay(); // Display initial CPS
updateJobPostings(); // Display initial job posting
setInterval(autoGenerateJobApplications, 1000);