
const baseURL = '/static/game/assets/coin'

export async function getCoin(x, y) {
  const blank = await PIXI.Assets.load(`${baseURL}/Blank.png`)
  const star = await PIXI.Assets.load(`${baseURL}/Star.png`)

  const coin = PIXI.Sprite.from(blank);
  let isBlank = true

  const wrapper = new PIXI.Container();
  // let starSprite = PIXI.Sprite.from(`${baseURL}/Star.png`);
  wrapper.position = {x: x, y: y};
  wrapper.setSize(10);
  wrapper.addChild(coin);

  coin.setSize(64);
  coin.anchor.set(0.5);
  coin.rotation = 0;
  wrapper.eventMode = 'static';
  wrapper.on('pointerdown', onCoinClick);
  wrapper.on('pointerenter', onCoinEnter);
  wrapper.on('pointerleave', onCoinLeave);

  function onCoinClick(e) {
    isBlank = !isBlank;

    coin.texture = isBlank ? star : blank;
    e.stopPropagation();
  }

  function onCoinEnter() {
    wrapper.scale.set(1.1)
  }

  function onCoinLeave() {
    wrapper.scale.set(1)
  }

  // Variables para controlar el giro
  let spinning = false;
  const rotationSpeed = 0.1; // Velocidad de rotación

  // Método para iniciar el giro
  coin.startSpin = () => {
      spinning = true;
  };

  // Método para detener el giro
  coin.stopSpin = () => {
      spinning = false;
  };

  // Método para actualizar la moneda (se llama en cada frame)
  coin.update = () => {
      if (spinning) {
          // Aumentar la rotación
          coin.rotation += rotationSpeed;

          // Simular el efecto de escala (opcional)
          coin.scale.x = Math.sin(coin.rotation) * 0.5 + 1;
          coin.scale.y = Math.cos(coin.rotation) * 0.5 + 1;
      }
  };

  return wrapper
}