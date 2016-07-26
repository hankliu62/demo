console.log(PIXI);

var renderer = PIXI.autoDetectRenderer(
  256, 256,
  {
    antialias: false, transparent: false, resolution: 2
  }
);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage);

renderer.view.style.border = "1px solid #ff0000";
renderer.autoResize = true;
renderer.resize(window.document.body.clientWidth, window.document.body.clientHeight);

renderer.backgroundColor = '0x333fff';

renderer.render(stage);
