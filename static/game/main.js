const app = new PIXI.Application();

await app.init({ width: 640, height: 360, backgroundColor: 0xbdcbe3 });

document.body.appendChild(app.canvas);