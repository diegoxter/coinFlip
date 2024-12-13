const sheetTexture = await PIXI.Assets.load('/static/game/assets/buttons/spritesheet.png');
PIXI.Assets.add({
    alias: 'atlas',
    src: '/static/game/assets/buttons/atlas.json',
    data: {texture: sheetTexture}
});

const spritesheet = await PIXI.Assets.load('atlas')

export async function getButtonContainerByName(buttonName, btnData, x, y, scale, sizeX, sizeY = null, onClick = null) {
  const buttonSprite = new PIXI.Sprite(spritesheet.textures[`${buttonName}Up`]);

  const wrapper = new PIXI.Container();
  wrapper.position = {x: x, y: y};
  wrapper.addChild(buttonSprite);
  wrapper.eventMode = 'static';
  wrapper.on('pointerdown', onButtonClick);
  wrapper.on('pointerenter', onButtonEnter);
  wrapper.on('pointerleave', onButtonLeave);

  function onButtonClick() {
    if (onClick) {
      onClick()
    }
  }

  const buttonText = new PIXI.Text({
    text: btnData.text,
    anchor: 0.5,
    style: {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: btnData.color,
      align: 'center',
    }
  });
  wrapper.addChild(buttonText)

  function onButtonEnter() {
    wrapper.scale.set(scale+0.05)
  }

  function onButtonLeave() {
    wrapper.scale.set(scale)
  }

  if (sizeY) {
    buttonSprite.setSize(sizeX, sizeY);
    wrapper.width = sizeX;
    wrapper.height = sizeY;
  } else {
    buttonSprite.setSize(sizeX);
  }

  buttonText.y = -5

  buttonSprite.anchor.set(0.5);
  buttonSprite.rotation = 0;

  wrapper.scale.set(scale)

  return wrapper
}

export async function getBettingTableContainer(x) {
  const wrapper = new PIXI.Container();
  const tableSprite = new PIXI.Sprite(spritesheet.textures.bettingTable);
  tableSprite.anchor.set(0.5);
  tableSprite.rotation = 0;
  tableSprite.setSize(256, 42);

  wrapper.addChild(tableSprite);
  wrapper.width = 256;
  wrapper.height = 32;

  const text = new PIXI.Text({
    text: "Not betting anything!",
    anchor: 0.5,
    style: {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xffffff,
      align: 'center',
    }
  });
  // text.x = x
  // text.y = 30
  wrapper.addChild(text);

  wrapper.position = {x: x, y: 30};
  wrapper.scale.set(1)

  return wrapper
}