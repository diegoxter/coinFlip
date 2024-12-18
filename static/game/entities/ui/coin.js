const baseURL = "/static/game/assets/coin";

export default async function getCoinContainer(x, y, coinStopCallback, upSpeed, downSpeed) {
	const blank = await PIXI.Assets.load(`${baseURL}/Blank.png`);
	const star = await PIXI.Assets.load(`${baseURL}/Star.png`);
	const btc = await PIXI.Assets.load(`${baseURL}/BTC.png`);

	const coin = PIXI.Sprite.from(blank);
	// let isBlank = true;

	const wrapper = new PIXI.Container();
	wrapper.position = { x: x, y: y };
	wrapper.setSize(10);
	wrapper.addChild(coin);

	coin.setSize(64);
	coin.anchor.set(0.5);
	coin.rotation = 0;
	wrapper.eventMode = "static";
	// wrapper.on("pointerdown", onCoinClick);
	wrapper.on("pointerenter", onCoinEnter);
	wrapper.on("pointerleave", onCoinLeave);

	// function onCoinClick(e) {
	// 	changeTexture()
	// 	e.stopPropagation();
	// }

  function changeTexture(newTexture) {
		coin.texture = newTexture;
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
  let direction = 1;
  let scaleX = 1;
  let scaleY = 1;
	const rotationSpeed = 0.3; // Velocidad de rotación
  const flipSpeed = 0.22;  // Controla la velocidad de "achatado"

	// Método para iniciar el giro
	wrapper.startSpin = () => {
		wrapper.spinning = true;
    goingUp = true;
	};

	// Método para detener el giro
	wrapper.stopSpin = () => {
    wrapper.scale.x = 1;
    wrapper.scale.y = 1;
    wrapper.rotation = 0
		wrapper.spinning = false;

    goingDown = false
    coinStopCallback("TODO")

    changeTexture(btc)

    setTimeout(() => {
      changeTexture(blank)
    }, 1250);
	};

  wrapper.update = () => {
		if (wrapper.spinning) {
      if (direction === 1) {
        scaleX = Math.max(0.2, scaleX - flipSpeed);  // Reducir el tamaño en X (achatando la moneda)
        scaleY = Math.min(1.5, scaleY + flipSpeed);  // Aumentar el tamaño en Y para darle un efecto de profundidad
      } else {
        scaleX = Math.min(1, scaleX + flipSpeed);  // Regresar al tamaño original
        scaleY = Math.max(1, scaleY - flipSpeed);  // Regresar a la escala original
      }

      wrapper.scale.x = scaleX;
      wrapper.scale.y = scaleY;

      wrapper.rotation += rotationSpeed;

      // Control de dirección: cuando se llega al límite, cambiar de dirección
      if (scaleX <= 0.2 && direction === 1) {
        direction = -1;  // Hacer que la moneda vuelva a su forma original
      } else if (scaleX >= 1 && direction === -1) {
        direction = 1;  // Hacer que la moneda se "aplane" de nuevo
      }

      if (goingUp) {
        wrapper.y = wrapper.y - upSpeed

        if (wrapper.y < 95 && !goingDown) {
          goingUp = false
          goingDown = true
        }
      }

      if (goingDown) {
        if (wrapper.y > y) {
          wrapper.stopSpin()
        } else {
          wrapper.y = wrapper.y + downSpeed
        }
      }
		}
	};

	return wrapper;
}
