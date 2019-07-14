import * as ex from 'excalibur';
import { Actor } from 'excalibur';

export class ButtonsUI extends Actor {
  constructor(game: ex.Engine) {
    super();
    var paddle = new ex.Actor(15, game.currentScene.camera.dy, 200, 20)
    paddle.color = ex.Color.Chartreuse;
    game.add(paddle);
    game.currentScene.on('postdraw', d => {
      const camPos = game.currentScene.camera.viewport;
      paddle.pos.x = camPos.left;
      paddle.pos.y = camPos.top+50;
    });
  }
}
