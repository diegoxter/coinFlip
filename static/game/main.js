import { getCoin } from "./entities/coin.js";
import { getButtonSpriteByName } from "./entities/buttons.js";

const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;

const screenWidth = isMobile.phone? window.innerWidth - (window.innerWidth / 20) : 640
const screenHeight = isMobile.phone? window.innerHeight - (window.innerHeight / 5) : 360

await app.init({ width: screenWidth, height: screenHeight, backgroundColor: 0xbdcbe3 });
const appContainer = document.getElementById("app-container")
appContainer.appendChild(app.canvas);

const coin = await getCoin(app.screen.width / 2, app.screen.height - (app.screen.height / 3.14))
const rollButton = await getButtonSpriteByName('largeGreen', app.screen.width / 2, app.screen.height - (app.screen.height / 7.20), 1.3, 64, 32, onRollClick)
const minusButton = await getButtonSpriteByName('minus', app.screen.width / 3.16, app.screen.height - (app.screen.height / 7.20), 1.3, 32, null, onMinusClick)
const plusButton = await getButtonSpriteByName('plus', app.screen.width / 1.48, app.screen.height - (app.screen.height / 7.20), 1.3, 32, null, onPlusClick)

app.stage.addChild(coin)
app.stage.addChild(rollButton)
app.stage.addChild(minusButton)
app.stage.addChild(plusButton)

let currentValue = 0
const maxValue = 10

const GREYEDBUTTONHEX = 0x787676
const NORMALBUTTONHEX = 0xFFFFFF

const minusButtonChild = minusButton.children[0]
const rollButtonChild = rollButton.children[0]
const plusButtonChild = plusButton.children[0]

minusButtonChild.tint = GREYEDBUTTONHEX
rollButtonChild.tint = GREYEDBUTTONHEX

rollButtonChild.eventMode = 'none';
minusButtonChild.eventMode = 'none';

const updateButtonStatus = () => {
  if (currentValue === 0) {
    minusButtonChild.tint = GREYEDBUTTONHEX;
    rollButtonChild.tint = GREYEDBUTTONHEX;
    minusButtonChild.eventMode = 'none';
    rollButtonChild.eventMode = 'none';
  } else {
    minusButtonChild.tint = NORMALBUTTONHEX;
    rollButtonChild.tint = NORMALBUTTONHEX;
    minusButtonChild.eventMode = 'static';
    rollButtonChild.eventMode = 'static';
  }

  if (currentValue === maxValue) {
    plusButtonChild.tint = GREYEDBUTTONHEX
    plusButtonChild.eventMode = 'none';
  } else {
    plusButtonChild.tint = NORMALBUTTONHEX
    plusButtonChild.eventMode = 'static';
  }
}

function onPlusClick() {
  currentValue += 1
  updateButtonStatus()
}

function onMinusClick() {
  currentValue -= 1
  updateButtonStatus()
}

function onRollClick() {
  currentValue = 0
  updateButtonStatus()
}

if (currentValue === maxValue) {
  const sprite = plusButton.children[0]
  sprite.tint = GREYEDBUTTONHEX
}


// let elapsed = 0.0;
// // Tell our application's ticker to run a new callback every frame, passing
// // in the amount of time that has passed since the last tick
// app.ticker.add((ticker) => {
//   // Add the time to our total elapsed time
//   elapsed += ticker.deltaTime;
//   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
//   // by 50 to slow the animation down a bit...
//   coin.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
// });