export default async function getBettingTable(x) {
  const wrapper = new PIXI.Container();

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
  text.x = x
  text.y = 30

  wrapper.addChild(text);
  return wrapper
}