import * as ex from 'excalibur';
import { Actor } from 'excalibur';

export class ButtonsUI extends Actor {
  private _primary = new ex.UIActor(10,5,25,25);
  private _secondary = new ex.UIActor(30,5,25,25);
  private _primaryTexture: ex.Texture;
  private _secondaryTexture: ex.Texture;
  private _game: ex.Engine;
  private _rupies: number;

  constructor(game: ex.Engine) {
    super();
    this._game = game;
    
    game.add(this._primary);
    game.add(this._secondary);
  }

  public assignPrimaryLocalSprite(itemFile: string) {
    this._primaryTexture = new ex.Texture(`./game/assets/items/${itemFile}`);
    this._primaryTexture.load().then(value => {
      const sprite = this._primaryTexture.asSprite();
      
      this._primary.addDrawing(itemFile, sprite);
      this._primary.setDrawing(itemFile);
      
      this._game.add(this._primary);
    });
  }

  public assignSecondaryLocalSprite(itemFile: string) {
    this._secondaryTexture = new ex.Texture(`./game/assets/items/${itemFile}`);
    this._secondaryTexture.load().then(value => {
      const sprite = this._secondaryTexture.asSprite();
      this._secondary.addDrawing(itemFile, sprite);
      this._secondary.setDrawing(itemFile);
      this._game.add(this._secondary);
    });
  }
}
 