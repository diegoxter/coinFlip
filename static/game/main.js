import { getCoinContainer, getButtonContainerByName, getBettingTableContainer } from "./entities/index.js"

const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;

const screenWidth = isMobile.phone? window.innerWidth - (window.innerWidth / 20) : 640
const screenHeight = isMobile.phone? window.innerHeight - (window.innerHeight / 5) : 360

await app.init({ width: screenWidth, height: screenHeight, backgroundColor: 0xbdcbe3 });
const appContainer = document.getElementById("app-container")
appContainer.appendChild(app.canvas);

const coinContainer = await getCoinContainer(app.screen.width / 2, app.screen.height - (app.screen.height / 3.14))

const minusButtonXFactor = isMobile.phone? 6.32  : 3.16
const plusButtonXFactor = isMobile.phone? 1.20 : 1.48

const rollButtonContainer = await getButtonContainerByName('largeGreen', "Roll!", app.screen.width / 2, app.screen.height - (app.screen.height / 7.20), 1.3, 64, 32, onRollClick)

const minusButtonContainer = await getButtonContainerByName('bluePent', "-", app.screen.width / minusButtonXFactor, app.screen.height - (app.screen.height / 7.20), 1.3, 32, null, onMinusClick)

const plusButtonContainer = await getButtonContainerByName('bluePent', "+", app.screen.width / plusButtonXFactor, app.screen.height - (app.screen.height / 7.20), 1.3, 32, null, onPlusClick)

let currentValue = 0
// TO DO set this with the token amount
const maxValue = 10

const bettingTextContainer = await getBettingTableContainer(app.screen.width / 2)

app.stage.addChild(bettingTextContainer)
app.stage.addChild(coinContainer)
app.stage.addChild(rollButtonContainer)
app.stage.addChild(minusButtonContainer)
app.stage.addChild(plusButtonContainer)

const GREYEDBUTTONHEX = 0x787676
const NORMALBUTTONHEX = 0xFFFFFF

const minusButton = minusButtonContainer.children[0]
const rollButton = rollButtonContainer.children[0]
const plusButton = plusButtonContainer.children[0]

const minusButtonText = minusButtonContainer.children[1]
const rollButtonText = rollButtonContainer.children[1]
const plusButtonText = plusButtonContainer.children[1]
const bettingText = bettingTextContainer.children[1]

minusButton.tint = GREYEDBUTTONHEX
rollButton.tint = GREYEDBUTTONHEX

rollButton.eventMode = 'none';
minusButton.eventMode = 'none';

const updateButtonStatus = () => {
  if (currentValue === 0) {
    minusButton.tint = GREYEDBUTTONHEX;
    rollButton.tint = GREYEDBUTTONHEX;
    minusButtonText.style.fill = GREYEDBUTTONHEX
    rollButtonText.style.fill = GREYEDBUTTONHEX

    minusButton.eventMode = 'none';
    rollButton.eventMode = 'none';
    bettingText.text = "Not betting anything!"
  } else {
    minusButton.tint = NORMALBUTTONHEX;
    rollButton.tint = NORMALBUTTONHEX;
    minusButtonText.style.fill = NORMALBUTTONHEX
    rollButtonText.style.fill = NORMALBUTTONHEX

    minusButton.eventMode = 'static';
    rollButton.eventMode = 'static';
    bettingText.text = `Now betting: ${currentValue}`
  }

  if (currentValue === maxValue) {
    plusButton.tint = GREYEDBUTTONHEX
    plusButtonText.style.fill = GREYEDBUTTONHEX
    plusButton.eventMode = 'none';
  } else {
    plusButton.tint = NORMALBUTTONHEX
    plusButtonText.style.fill = NORMALBUTTONHEX
    plusButton.eventMode = 'static';
  }
}

function onPlusClick() {
  currentValue += 1
  bettingText.text = `Now betting: ${currentValue}`
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