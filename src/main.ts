/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

Daisy was here for live share example
Diego was also here
*/
import "./style.css";
import emoji from "./tumblr_c016e4951490e803e0522d9d6ca08c35_3f750c1e_1280.png";
import upgradeEmoji from "./Francis.png";

let counter: number = 0;
let growthRate: number = 0;
const funUnit = "Hi-Five to Angel Gabby";
const cost: number = 10;

const counterUI = document.createElement("div");
const rateUI = document.createElement("div");
const upgradeUI = document.createElement("div");
const upgradeButton = document.createElement("button");

function UI() {
  counterUI.innerHTML = `${counter.toFixed(0)} ${funUnit}`;

  rateUI.innerHTML = `${growthRate.toFixed(0)} Francis helping.`;

  upgradeUI.innerHTML = `Purchase a Friend Francis for ${cost}`;

  if (counter >= cost) {
    upgradeButton.disabled = false;

    upgradeButton.title = "Click to Purchase!";
  } else {
    upgradeButton.disabled = true;

    upgradeButton.title = `Need ${cost.toFixed(0)} Hi-Fives to purchase.`;
  }
}

UI();

const button = document.createElement("button");

button.innerHTML =
  `<img src="${emoji}" alt="Fun Emoji" style="width: 240px; height: 240px;">`;
document.body.append(button);

document.body.append(counterUI, button);

button.addEventListener("click", () => {
  counter += 1;
  UI();
});

upgradeButton.innerHTML =
  `<img src="${upgradeEmoji}" alt="Upgrade Francis" style="width: 60px; height: 60px;"><br>PURCHASE`;

upgradeButton.addEventListener("click", () => {
  if (counter >= cost) {
    counter -= cost;
    growthRate += 1;
  }
});

document.body.append(counterUI, rateUI, document.createElement("hr")); // Separator
document.body.append(
  button,
  document.createElement("br"),
  document.createElement("br"),
);
document.body.append(upgradeUI, upgradeButton);
/*
setInterval(() => {
  counter += 1;
  UI();
}, 1000);
*/
/*
let timestamp: number = 0;
const frames = 1 / 1000;

function ContinuousGrowth() {
  const current = performance.now();

  if (timestamp === 0) {
    timestamp = current;
  }

  const unitRate = current - timestamp;

  const growth = unitRate * frames;

  counter += growth;

  UI();

  timestamp = current;

  requestAnimationFrame(ContinuousGrowth);
}

requestAnimationFrame(ContinuousGrowth);
*/

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
