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
// TO DO set this with the token amount
const maxValue = 10

const GREYEDBUTTONHEX = 0x787676
const NORMALBUTTONHEX = 0xFFFFFF

const minusButtonChild1 = minusButton.children[0]  // the actual button sprite
const rollButtonChild1 = rollButton.children[0]    // the actual button sprite
const plusButtonChild1 = plusButton.children[0]    // the actual button sprite

const minusButtonChild2 = minusButton.children[1]  // the button's text
const rollButtonChild2 = rollButton.children[1]    // the button's text
const plusButtonChild2 = plusButton.children[1]    // the button's text

minusButtonChild1.tint = GREYEDBUTTONHEX
rollButtonChild1.tint = GREYEDBUTTONHEX

rollButtonChild1.eventMode = 'none';
minusButtonChild1.eventMode = 'none';

const updateButtonStatus = () => {
  if (currentValue === 0) {
    minusButtonChild1.tint = GREYEDBUTTONHEX;
    rollButtonChild1.tint = GREYEDBUTTONHEX;
    minusButtonChild2.style.fill = GREYEDBUTTONHEX
    rollButtonChild2.style.fill = GREYEDBUTTONHEX

    minusButtonChild1.eventMode = 'none';
    rollButtonChild1.eventMode = 'none';
  } else {
    minusButtonChild1.tint = NORMALBUTTONHEX;
    rollButtonChild1.tint = NORMALBUTTONHEX;
    minusButtonChild2.style.fill = NORMALBUTTONHEX
    rollButtonChild2.style.fill = NORMALBUTTONHEX

    minusButtonChild1.eventMode = 'static';
    rollButtonChild1.eventMode = 'static';
  }

  if (currentValue === maxValue) {
    plusButtonChild1.tint = GREYEDBUTTONHEX
    plusButtonChild2.style.fill = GREYEDBUTTONHEX
    plusButtonChild1.eventMode = 'none';
  } else {
    plusButtonChild1.tint = NORMALBUTTONHEX
    plusButtonChild2.style.fill = NORMALBUTTONHEX
    plusButtonChild1.eventMode = 'static';
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