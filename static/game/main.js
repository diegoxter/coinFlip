import { getCoin } from "./entities/coin.js";

const app = new PIXI.Application();

const screenWidth = isMobile.phone? window.innerWidth - (window.innerWidth / 20) : 640
const screenHeight = isMobile.phone? window.innerHeight - (window.innerHeight / 5) : 360

await app.init({ width: screenWidth, height: screenHeight, backgroundColor: 0xbdcbe3 });
const appContainer = document.getElementById("app-container")
appContainer.appendChild(app.canvas);

const coin = await getCoin(app.screen.width / 2, app.screen.height - (app.screen.height / 3.14))

app.stage.addChild(coin)

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