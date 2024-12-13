const baseURL = "/static/game/assets/coin";

export default async function getCoinContainer(x, y, coinStopCallback) {
	const blank = await PIXI.Assets.load(`${baseURL}/Blank.png`);
	const star = await PIXI.Assets.load(`${baseURL}/Star.png`);

	const coin = PIXI.Sprite.from(blank);
	let isBlank = true;

	const wrapper = new PIXI.Container();
	wrapper.position = { x: x, y: y };
	wrapper.setSize(10);
	wrapper.addChild(coin);

	coin.setSize(64);
	coin.anchor.set(0.5);
	coin.rotation = 0;
	wrapper.eventMode = "static";
	wrapper.on("pointerdown", onCoinClick);
	wrapper.on("pointerenter", onCoinEnter);
	wrapper.on("pointerleave", onCoinLeave);

	function onCoinClick(e) {
		changeTexture()
		e.stopPropagation();
	}

  function changeTexture() {
    isBlank = !isBlank;

		coin.texture = isBlank ? star : blank;
  }

	function onCoinEnter() {
		wrapper.scale.set(1.1);
	}

	function onCoinLeave() {
		wrapper.scale.set(1);
	}

	// Variables para controlar el giro
	wrapper.spinning = false;
  let goingUp = false
  let goingDown = false

	const rotationSpeed = 0.1; // Velocidad de rotación

	// Método para iniciar el giro
	wrapper.startSpin = () => {
		wrapper.spinning = true;
    goingUp = true;
	};

	// Método para detener el giro
	wrapper.stopSpin = () => {
		wrapper.spinning = false;
    goingDown = false
    coinStopCallback("TODO")
	};

	// Método para actualizar la moneda (se llama en cada frame)
	wrapper.update = () => {
    // TO DO make the coin rotate
		if (wrapper.spinning) {
      if (goingUp) {
        wrapper.y = wrapper.y - 2.9

        if (wrapper.y < 84 && !goingDown) {
          goingUp = false
          goingDown = true
        }
      }

      if (goingDown) {
        if (wrapper.y > y) {
          wrapper.stopSpin()
        } else {
          wrapper.y = wrapper.y + 3.1
        }
      }
			// Aumentar la rotación
			//wrapper.rotation += rotationSpeed;

      // Simular el efecto de escala (opcional)
			//wrapper.scale.x = Math.sin(wrapper.rotation) * 0.5 + 1;
			//wrapper.scale.y = Math.cos(wrapper.rotation) * 0.5 + 1;
		}
	};

	return wrapper;
}
