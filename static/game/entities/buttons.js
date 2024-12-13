const sheetTexture = await PIXI.Assets.load('/static/game/assets/buttons/spritesheet.png');
PIXI.Assets.add({
    alias: 'atlas',
    src: '/static/game/assets/buttons/atlas.json',
    data: {texture: sheetTexture}
});

const spritesheet = await PIXI.Assets.load('atlas')

export default async function getButtonContainerByName(buttonName, x, y, scale, sizeX, sizeY = null, onClick = null) {
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

  let _text = null

  switch (buttonName) {
    case 'largeGreen':
      _text = "Roll!"
      break;

    case 'minus':
      _text = "-"
      break;

    case 'plus':
      _text = "+"
      break;

    default:
      break;
  }

  const buttonText = new PIXI.Text({
    text: _text,
    anchor: 0.5,
    style: {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: buttonName === 'plus'? 0xffffff : 0x787676,
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