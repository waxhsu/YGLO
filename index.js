// Initialize variables
let jobApplications = 0;
let autoApplications = [];
let clickValue = 1;
let totalClicksPerSecond = 0;

// Get HTML elements
const jobApplicationsElement = document.getElementById("job-applications");
const clickButton = document.getElementById("click-button");
const shop = document.getElementById("shop");
const autoApplicationsElement = document.getElementById("autoApplications");

// Function to update the job application count on the screen
function updateJobApplications() {
    jobApplicationsElement.textContent = `${Math.round(jobApplications)} Job Applications`;
}

// Function to update the CPS (Clicks Per Second) display
function updateCPSDisplay() {
  const cpsDisplay = document.getElementById("cps-display");
  cpsDisplay.textContent = `CPS: ${totalClicksPerSecond.toFixed(2)}`; // Display CPS rounded to 2 decimal places
}


// Function to update the AutoApplications in the shop
function updateShop() {
    autoApplicationsElement.innerHTML = "";
    for (const app of autoApplications) {
        const buyButton = document.createElement("button");
        buyButton.textContent = `${app.name} || Cost: ${app.cost} Job Applications || CPS: ${app.clicksPerSecond}`;
        buyButton.addEventListener("click", () => buyAutoApplication(app));
        autoApplicationsElement.appendChild(buyButton);
    }
}

// Function to buy an AutoApplication
function buyAutoApplication(app) {
  if (jobApplications >= app.cost) {
      jobApplications -= app.cost;
      app.count += 1;
      app.cost = Math.floor(app.cost * 1.1); // Cost scales exponentially
      updateJobApplications();
      updateShop();
      calculateTotalClicksPerSecond();
      updateCPSDisplay(); // Update CPS when purchasing
  }
}

// Function to calculate the total clicks per second
function calculateTotalClicksPerSecond() {
    totalClicksPerSecond = 0;
    for (const app of autoApplications) {
        totalClicksPerSecond += app.count * app.clicksPerSecond;
    }
}

// Function to add job applications automatically based on CPS
function autoGenerateJobApplications() {
  jobApplications += totalClicksPerSecond;
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
        name: "Try Harder",
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
        cost: 1000,
        clicksPerSecond: 5,
        count: 0,
    },
];

// Initialize the game
updateShop();
updateJobApplications();
updateCPSDisplay(); // Display initial CPS
setInterval(autoGenerateJobApplications, 1000);