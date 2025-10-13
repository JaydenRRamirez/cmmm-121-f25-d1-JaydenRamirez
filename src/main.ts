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
let growthRate: number = 0;
const priceIncrease = 1.15;
const funUnit = "Hi-Five to Angel Gabby";

const upgradeFrancis = "Friend Francis";
const costFrancis = 10;
const rateFrancis = 0.1;
let countFrancis: number = 0;
let currentCostFrancis: number = costFrancis;

const upgradeZag = "Angel Zaggy";
const costZag = 100;
const rateZag = 2.0;
let countZag: number = 0;
let currentCostZag: number = costZag;

const upgradeFrancine = "Friend Francine";
const costFrancine = 1000;
const rateFrancine = 50.0;
let countFrancine: number = 0;
let currentCostFrancine: number = costFrancine;

const counterUI = document.createElement("div");
const rateUI = document.createElement("div");
const upgradeAUI = document.createElement("div");
const upgradeBUI = document.createElement("div");
const upgradeCUI = document.createElement("div");
const upgradeAbutton = document.createElement("button");
const upgradeBbutton = document.createElement("button");
const upgradeCbutton = document.createElement("button");
const title = document.createElement("h1");
title.textContent = "Angel Hare Clicker by Jayden Ramirez";
title.classList.add("game-title");

function calculateGrowthRate() {
  growthRate = countFrancis * rateFrancis + countZag * rateZag +
    countFrancine * rateFrancine;
}

function calculateCurrentCost() {
  currentCostFrancis = costFrancis * Math.pow(priceIncrease, countFrancis);
  currentCostZag = costZag * Math.pow(priceIncrease, countZag);
  currentCostFrancine = costFrancine * Math.pow(priceIncrease, countFrancine);
}

function UI() {
  calculateGrowthRate();
  calculateCurrentCost();

  counterUI.innerHTML = `${counter.toFixed(0)} ${funUnit}`;
  rateUI.innerHTML = `${
    growthRate.toFixed(1)
  } Casting Call/sec (${countFrancis} Francis helping, ${countZag} people Zag hired to help, ${countFrancine} files of documented help Francine has filed away)`;

  upgradeAUI.innerHTML = `Guide ${upgradeFrancis} for ${
    currentCostFrancis.toFixed(2)
  } (${countFrancis} tasks assigned)`;
  if (counter >= currentCostFrancis) {
    upgradeAbutton.disabled = false;
    upgradeAbutton.title = "Click to Purchase Francis!";
  } else {
    upgradeAbutton.disabled = true;
    upgradeAbutton.title = `Need ${
      costFrancis.toFixed(0)
    } Hi-Fives to purchase Francis.`;
  }

  upgradeBUI.innerHTML = `Hire ${upgradeZag} for ${
    currentCostZag.toFixed(2)
  } (${countZag} Zag Wyld's on the case(Wrong show!).)`;
  if (counter >= currentCostZag) {
    upgradeBbutton.disabled = false;
    upgradeBbutton.title = "Click to Purchase Zag!";
  } else {
    upgradeBbutton.disabled = true;
    upgradeBbutton.title = `Need ${
      costZag.toFixed(0)
    } Hi-Fives to purchase Zag.`;
  }

  upgradeCUI.innerHTML = `Give papers to ${upgradeFrancine} for ${
    currentCostFrancine.toFixed(2)
  } (${countFrancine} stacks of paper for Francine to file.)`;
  if (counter >= currentCostFrancine) {
    upgradeCbutton.disabled = false;
    upgradeCbutton.title = "Click to Purchase Francine!";
  } else {
    upgradeCbutton.disabled = true;
    upgradeCbutton.title = `Need ${
      costFrancine.toFixed(0)
    } Hi-Fives to purchase Francine.`;
  }
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

gameContainer.append(upgradeAUI, upgradeAbutton, document.createElement("hr"));
gameContainer.append(upgradeBUI, upgradeBbutton, document.createElement("hr"));
gameContainer.append(upgradeCUI, upgradeCbutton, document.createElement("hr"));

button.innerHTML =
  `<img src="${emoji}" alt="Fun Emoji" style="width: 240px; height: 240px;">`;

button.addEventListener("click", () => {
  counter += 1;
  UI();
});

upgradeAbutton.innerHTML =
  `<img src="${upgradeEmoji}" alt="Upgrade A" style="width: 60px; height: 60px;"><br>${upgradeFrancis}`;
upgradeAbutton.addEventListener("click", () => {
  if (counter >= currentCostFrancis) {
    counter -= currentCostFrancis;
    countFrancis += 1;
    UI();
  }
});

upgradeBbutton.innerHTML =
  `<img src="${upgradeEmoji2}" alt="Upgrade A" style="width: 60px; height: 60px;"><br>${upgradeZag}`;
upgradeBbutton.addEventListener("click", () => {
  if (counter >= currentCostZag) {
    counter -= currentCostZag;
    countZag += 1;
    UI();
  }
});

upgradeCbutton.innerHTML =
  `<img src="${upgradeEmoji3}" alt="Upgrade A" style="width: 60px; height: 60px;"><br>${upgradeFrancine}`;
upgradeCbutton.addEventListener("click", () => {
  if (counter >= currentCostFrancine) {
    counter -= currentCostFrancine;
    countFrancine += 1;
    UI();
  }
});

let timestamp: number = performance.now();

function ContinuousGrowth(current: number) {
  const unitRate = (current - timestamp) / 1000;

  const growth = growthRate * unitRate;

  counter += growth;

  UI();

  timestamp = current;

  requestAnimationFrame(ContinuousGrowth);
}

requestAnimationFrame(ContinuousGrowth);
