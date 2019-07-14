import * as ex from 'excalibur';
import { Actor } from 'excalibur';
import { IResources } from '../models/resources.interface';

export class ButtonsUI extends Actor {
  private _primary = new ex.UIActor(10,5,25,25);
  private _secondary = new ex.UIActor(30,5,25,25);
  private _texture: ex.Texture;
  private _game: ex.Engine;

  constructor(game: ex.Engine) {
    super();
    this._game = game;
    // const primary = new ex.Actor(15, game.currentScene.camera.dy, 50, 50);
    this._primary.color = ex.Color.Green;
    this._primary.color = ex.Color.Red;
    game.add(this._primary);
    game.add(this._secondary);
  }

  public assignLocalSprite(itemFile: string) {
    this._game.remove(this._primary);
    this._texture = new ex.Texture(`./game/assets/items/${itemFile}`);
    this._texture.load().then(value => {
      const sprite = this._texture.asSprite();
      sprite.fill(ex.Color.Red);
      this._primary.addDrawing(sprite);
      this._game.add(this._primary);
    });
  }
}
 