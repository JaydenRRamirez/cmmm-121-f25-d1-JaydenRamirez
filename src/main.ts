import upgradeEmoji5 from "./Angel_Cammy.png";
import upgradeEmoji3 from "./Fox_Francine.png";
import upgradeEmoji from "./Francis.png";
import upgradeEmoji4 from "./Maddy.png";
import "./style.css";
import emoji from "./tumblr_c016e4951490e803e0522d9d6ca08c35_3f750c1e_1280.png";
import upgradeEmoji2 from "./Zag.png";

// Game State
let counter: number = 0;
const gameTitle = "Hi-Five to Angel Gabby";

// Upgrade Definitions
interface Item {
  name: string;
  baseCost: number;
  growthRate: number;
  image: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Friend Francis",
    baseCost: 10,
    growthRate: 0.1,
    image: upgradeEmoji,
    description:
      "Angel Gabby's friend, always wanting to help just as much as he needs help.",
  },
  {
    name: "Angel Zaggy(Zag to some)",
    baseCost: 100,
    growthRate: 2.0,
    image: upgradeEmoji2,
    description:
      "Originally from Wyld Hare, he's (begrudgingly) taken up a role in Angel Hare here, but always helps in his own way.",
  },
  {
    name: "Friend Francine",
    baseCost: 1000,
    growthRate: 50.0,
    image: upgradeEmoji3,
    description:
      "Zag Wyld's Secretary, now taken the form of a friend in Angel Hare here to help... doing the same thing she did in Wyld Hare.",
  },
  {
    name: "Maddy",
    baseCost: 5000,
    growthRate: 100.0,
    image: upgradeEmoji4,
    description:
      "They... hey wait... how'd they get here? Oh well, they're from Your Angel's Here, and probably helpful...",
  },
  {
    name: "Angel Cammy",
    baseCost: 15000,
    growthRate: 0.0, // Base rate is 0, growth is applied in ContinuousGrowth
    image: upgradeEmoji5,
    description:
      "Is your copy of Hyrax in the Rocks faulty? Well don't despair, that means this friend has arrived in Angel Hare.",
  },
];

const itemCount = new Array(availableItems.length).fill(0); // countFrancis, countZag, etc.
const maddyUpgradeIndex = availableItems.findIndex((item) =>
  item.name === "Maddy"
);
const cammyUpgradeIndex = availableItems.findIndex((item) =>
  item.name === "Angel Cammy"
);

let isMaddyBurnout: boolean = false;
const maddyRate = -200;
const maddyDebuff = "True intent";
const maddyDebuffDescription = "Ah... she's burning down the site...";
const priceMultiplier = 1.15;

// UI Elements
const counterUI = document.createElement("div");
const rateUI = document.createElement("div");
const title = document.createElement("h1");
const upgradeUIElements: HTMLElement[] = [];
const upgradeButtons: HTMLButtonElement[] = [];
title.textContent = "Angel Hare Clicker by Jayden Ramirez";
title.classList.add("game-title");

function UI() {
  const totalRate = getTotalGrowthRate();
  counterUI.innerHTML = `${counter.toFixed(0)} ${gameTitle}`;
  rateUI.innerHTML = `${totalRate.toFixed(1)} Casting Call/sec`;

  upgradeUIElements.forEach((ui, i) => {
    const item = availableItems[i];
    const cost = getCurrentCost(i);

    if (i === maddyUpgradeIndex && isMaddyBurnout) {
      ui.innerHTML = `<span class="tricky-item">${maddyDebuff} for ${
        cost.toFixed(
          2,
        )
      } (${
        itemCount[i]
      } owned)<br>Description: ${maddyDebuffDescription}</span>`;
      upgradeButtons[i].innerHTML =
        `<img src="${item.image}" alt="${maddyDebuff}" style="width: 60px; height: 60px;"><br>${maddyDebuff}`;
    } else {
      ui.innerHTML = `Get ${item.name} for ${cost.toFixed(2)} (${
        itemCount[i]
      } owned)<br>Description: ${item.description}`;
    }

    upgradeButtons[i].disabled = counter < cost;
    upgradeButtons[i].title = counter >= cost
      ? `Click to buy!`
      : `Need ${cost.toFixed(2)} to buy`;
  });
}
UI();

function getCurrentCost(index: number): number {
  return availableItems[index].baseCost *
    Math.pow(priceMultiplier, itemCount[index]);
}

function getTotalGrowthRate(): number {
  return itemCount.reduce((total, count, i) => {
    if (i === maddyUpgradeIndex && isMaddyBurnout && count > 0) {
      return total + maddyRate;
    }

    return total + availableItems[i].growthRate * count;
  }, 0);
}

// Event Listeners
const button = document.createElement("button");
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
gameContainer.prepend(title);
document.body.appendChild(gameContainer);
gameContainer.append(counterUI);
gameContainer.append(rateUI);
gameContainer.append(document.createElement("hr"));

gameContainer.append(button);

gameContainer.append(document.createElement("br"));
gameContainer.append(document.createElement("br"));

button.innerHTML =
  `<img src="${emoji}" alt="Fun Emoji" style="width: 240px; height: 240px;">`;

button.addEventListener("click", () => {
  counter += 1;
  UI();
});

availableItems.forEach((item, i) => {
  const ui = document.createElement("div");
  const button = document.createElement("button");

  button.innerHTML =
    `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px;"><br>${item.name}`;

  upgradeUIElements.push(ui);
  upgradeButtons.push(button);

  button.addEventListener("click", () => {
    const cost = getCurrentCost(i);
    if (counter >= cost) {
      counter -= cost;
      itemCount[i]++;

      if (i === maddyUpgradeIndex) {
        if (itemCount[maddyUpgradeIndex] === 1) {
          isMaddyBurnout = true;
          availableItems[i].name = maddyDebuff;
          availableItems[i].description = maddyDebuffDescription;
          availableItems[i].growthRate = maddyRate;
        }
      }

      UI();
    }
  });

  gameContainer.append(ui, button, document.createElement("hr"));
});

let timestamp: number | null = null;
let lastRandomGrowthUpdate: number | null = null;
const RANDOM_UPDATE_INTERVAL_MS = 1000;

// Core Game Loop
function ContinuousGrowth(current: number) {
  if (timestamp === null) {
    timestamp = current;
    lastRandomGrowthUpdate = current;
    requestAnimationFrame(ContinuousGrowth);
    return;
  }

  const unitRate = (current - timestamp) / 1000;
  const deterministicGrowthRate = getTotalGrowthRate();
  const deterministicGrowth = deterministicGrowthRate * unitRate;
  counter += deterministicGrowth;

  if (
    cammyUpgradeIndex !== -1 &&
    itemCount[cammyUpgradeIndex] > 0 &&
    (lastRandomGrowthUpdate === null ||
      current - lastRandomGrowthUpdate >= RANDOM_UPDATE_INTERVAL_MS)
  ) {
    const count = itemCount[cammyUpgradeIndex];
    const randomIncrease = Math.floor(Math.random() * (count + 1));
    counter += randomIncrease;

    lastRandomGrowthUpdate = current;
  }

  UI();
  timestamp = current;
  requestAnimationFrame(ContinuousGrowth);
}

requestAnimationFrame(ContinuousGrowth);
