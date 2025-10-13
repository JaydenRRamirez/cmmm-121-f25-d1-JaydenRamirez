/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

Daisy was here for live share example
Diego was also here
*/

import upgradeEmoji3 from "./Fox_Francine.png";
import upgradeEmoji from "./Francis.png";
import "./style.css";
import emoji from "./tumblr_c016e4951490e803e0522d9d6ca08c35_3f750c1e_1280.png";
import upgradeEmoji2 from "./Zag.png";

let counter: number = 0;
const funUnit = "Hi-Five to Angel Gabby";

interface Item {
  name: string;
  baseCost: number;
  growthRate: number;
  image: string;
}

const availableItems: Item[] = [
  {
    name: "Friend Francis",
    baseCost: 10,
    growthRate: 0.1,
    image: upgradeEmoji,
  },
  { name: "Angel Zaggy", baseCost: 100, growthRate: 2.0, image: upgradeEmoji2 },
  {
    name: "Friend Francine",
    baseCost: 1000,
    growthRate: 50.0,
    image: upgradeEmoji3,
  },
];

const itemCount = new Array(availableItems.length).fill(0); // countFrancis, countZag, etc.
const priceMultiplier = 1.15;

const counterUI = document.createElement("div");
const rateUI = document.createElement("div");
const title = document.createElement("h1");
const upgradeUIElements: HTMLElement[] = [];
const upgradeButtons: HTMLButtonElement[] = [];
title.textContent = "Angel Hare Clicker by Jayden Ramirez";
title.classList.add("game-title");

function getCurrentCost(index: number): number {
  return availableItems[index].baseCost *
    Math.pow(priceMultiplier, itemCount[index]);
}

function getTotalGrowthRate(): number {
  return itemCount.reduce((total, count, i) => {
    return total + count * availableItems[i].growthRate;
  }, 0);
}

function UI() {
  const totalRate = getTotalGrowthRate();
  counterUI.innerHTML = `${counter.toFixed(0)} ${funUnit}`;
  rateUI.innerHTML = `${totalRate.toFixed(1)} Casting Call/sec`;

  upgradeUIElements.forEach((ui, i) => {
    const cost = getCurrentCost(i);
    ui.innerHTML = `Get ${availableItems[i].name} for ${cost.toFixed(2)} (${
      itemCount[i]
    } owned)`;
    upgradeButtons[i].disabled = counter < cost;
    upgradeButtons[i].title = counter >= cost
      ? "Click to buy!"
      : `Need ${cost.toFixed(2)} to buy`;
  });
}

UI();

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
      UI();
    }
  });

  gameContainer.append(ui, button, document.createElement("hr"));
});

let timestamp: number | null = null;

function ContinuousGrowth(current: number) {
  if (timestamp === null) {
    timestamp = current;
    requestAnimationFrame(ContinuousGrowth);
    return;
  }

  const unitRate = (current - timestamp) / 1000;
  const growth = getTotalGrowthRate() * unitRate;

  counter += growth;

  UI();

  timestamp = current;

  requestAnimationFrame(ContinuousGrowth);
}

requestAnimationFrame(ContinuousGrowth);
