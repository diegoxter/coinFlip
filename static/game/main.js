import {
	getCoinContainer,
	getButtonContainerByName,
	getBettingTableContainer,
} from "./entities/index.js";

// TO DO put all of this in a game.js to better organize stuff
const app = new PIXI.Application();
globalThis.__PIXI_APP__ = app;

const screenWidth = isMobile.phone
	? window.innerWidth - window.innerWidth / 20
	: 640;
const screenHeight = isMobile.phone
	? window.innerHeight - window.innerHeight / 5
	: 360;

await app.init({
	width: screenWidth,
	height: screenHeight,
	backgroundColor: 0x000000,
});
const appContainer = document.getElementById("app-container");
appContainer.appendChild(app.canvas);

const coinContainer = await getCoinContainer(
	app.screen.width / 2,
	app.screen.height - app.screen.height / 3.14,
  coinStopCallback
);

const minusButtonXFactor = isMobile.phone ? 6.32 : 3.16;
const plusButtonXFactor = isMobile.phone ? 1.2 : 1.48;

const rollButtonContainer = await getButtonContainerByName(
	"largeGreen",
	{ text: "Roll!", color: 0x787676 },
	app.screen.width / 2,
	app.screen.height - app.screen.height / 7.2,
	1.3,
	64,
	32,
	onRollClick,
);

const minusButtonContainer = await getButtonContainerByName(
	"bluePent",
	{ text: "-", color: 0x787676 },
	app.screen.width / minusButtonXFactor,
	app.screen.height - app.screen.height / 7.2,
	1.3,
	32,
	null,
	onMinusClick,
);

const plusButtonContainer = await getButtonContainerByName(
	"bluePent",
	{ text: "+", color: 0xffffff },
	app.screen.width / plusButtonXFactor,
	app.screen.height - app.screen.height / 7.2,
	1.3,
	32,
	null,
	onPlusClick,
);

let currentValue = 0;
// TO DO set this with the token amount
const maxValue = 10;

const bettingTextContainer = await getBettingTableContainer(
	app.screen.width / 2,
);

app.stage.addChild(bettingTextContainer);
app.stage.addChild(coinContainer);
app.stage.addChild(rollButtonContainer);
app.stage.addChild(minusButtonContainer);
app.stage.addChild(plusButtonContainer);

const GREYEDBUTTONHEX = 0x787676;
const NORMALBUTTONHEX = 0xffffff;

const bettingText = bettingTextContainer.children[1];

const disableButtons = (buttonContainerList) => {
  for (const buttonContainer of buttonContainerList) {
    buttonContainer.children[0].tint = GREYEDBUTTONHEX;
    buttonContainer.eventMode = "none";
    buttonContainer.children[1].style.fill = GREYEDBUTTONHEX;
  }
}

disableButtons([minusButtonContainer, rollButtonContainer])

function enableButtons(buttonContainerList) {
  for (const buttonContainer of buttonContainerList) {
    buttonContainer.children[0].tint = NORMALBUTTONHEX;
    buttonContainer.eventMode = "static";
    buttonContainer.children[1].style.fill = NORMALBUTTONHEX;
  }
}

const updateButtonStatus = () => {
  if (coinContainer.spinning) {
    bettingText.text = "Spinning...";

    disableButtons([minusButtonContainer, rollButtonContainer, plusButtonContainer])
  } else {
    if (currentValue === 0) {
      disableButtons([minusButtonContainer, rollButtonContainer])

      bettingText.text = "Not betting anything!";
    } else {
      enableButtons([minusButtonContainer, rollButtonContainer])

      bettingText.text = `Now betting: ${currentValue}`;
    }

    if (currentValue === maxValue) {
      disableButtons([plusButtonContainer])
    } else {
      enableButtons([plusButtonContainer])
    }
  }
};

function onPlusClick() {
  if (!coinContainer.spinning && currentValue < maxValue) {
    currentValue += 1;
    bettingText.text = `Now betting: ${currentValue}`;
    updateButtonStatus();
  }
}

function onMinusClick() {
  if (!coinContainer.spinning && currentValue >= 0) {
    currentValue -= 1;
    updateButtonStatus();
  }
}

function onRollClick() {
  if (!coinContainer.spinning && currentValue > 0) {
    currentValue = 0;
    coinContainer.startSpin();

    updateButtonStatus();
  }
}

function coinStopCallback(res) {
  disableButtons([minusButtonContainer, rollButtonContainer])

  bettingText.text = `You ${res}!`

  setTimeout(() => {
    bettingText.text = "Not betting anything!";
    enableButtons([plusButtonContainer])
  }, 1250);
}

if (currentValue === maxValue) {
  disableButtons([plusButtonContainer])
}

// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add(() => {
  // Add the time to our total elapsed time
  // Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
  coinContainer.update();
});
