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

let counter: number = 0;
const funUnit = "Hi Five to Angel Gabby";

const counterUI = document.createElement("div");

function UI() {
  counterUI.innerHTML = `${counter.toFixed(0)} ${funUnit}`;
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
/*
setInterval(() => {
  counter += 1;
  UI();
}, 1000);
*/

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
