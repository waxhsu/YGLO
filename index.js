let points = 0;
let clickValue = 1;
let upgradeCost = 10;
let upgrades = 0;
let autoClickers = [
  { name: "AutoClicker 1", cost: 50, rate: 1 },
  { name: "AutoClicker 2", cost: 100, rate: 2 },
  { name: "AutoClicker 3", cost: 200, rate: 4 },
  { name: "AutoClicker 4", cost: 500, rate: 8 },
  { name: "AutoClicker 5", cost: 1000, rate: 16 },
];

let autoClickerRunning = false;

const pointsElement = document.getElementById("points");
const clickButton = document.getElementById("clickButton");
const buyUpgradeButton = document.getElementById("buyUpgrade");
const upgradesElement = document.getElementById("upgrades");
const shopElement = document.getElementById("shop");

clickButton.addEventListener("click", () => {
  points += clickValue;
  updatePointsDisplay();
});

buyUpgradeButton.addEventListener("click", () => {
  if (points >= upgradeCost) {
    points -= upgradeCost;
    clickValue += 1;
    upgrades += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updatePointsDisplay();
    updateUpgradesDisplay();

    if (!autoClickerRunning) {
      startAutoClickers();
      autoClickerRunning = true;
    }
  }
});

function updatePointsDisplay() {
  pointsElement.innerText = points;
}

function updateUpgradesDisplay() {
  upgradesElement.innerText = upgrades;
  buyUpgradeButton.innerText = `Buy Upgrade (Cost: ${upgradeCost} points)`;
}

function updateShopDisplay() {
  shopElement.innerHTML = "";
  autoClickers.forEach((autoClicker, index) => {
    const button = document.createElement("button");
    button.innerText = `${autoClicker.name} (Cost: ${autoClicker.cost} points, Rate: ${autoClicker.rate}/s)`;
    button.addEventListener("click", () => {
      if (points >= autoClicker.cost) {
        points -= autoClicker.cost;
        clickValue += autoClicker.rate;
        autoClickers[index].cost = Math.floor(autoClicker.cost * 1.5);
        updatePointsDisplay();
        updateShopDisplay();

        if (!autoClickerRunning) {
          startAutoClickers();
          autoClickerRunning = true;
        }
      }
    });
    shopElement.appendChild(button);
  });
}

function startAutoClickers() {
  setInterval(() => {
    autoClickers.forEach((autoClicker) => {
      points += autoClicker.rate;
    });
    updatePointsDisplay();
  }, 1000);
}

updatePointsDisplay();
updateUpgradesDisplay();
updateShopDisplay();
