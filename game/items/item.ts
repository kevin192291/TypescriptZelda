import ex = require('excalibur');
import { Player } from '../actors/Player';
import { Actor, Vector } from 'excalibur';

export abstract class Item extends Actor {
  public shouldDraw: boolean = true;
  public abstract use();
  public abstract drop();
  private _ownedBy: Player;
  private _texture: ex.Texture;

  constructor() {
    super();
    this.collisionType = ex.CollisionType.Active;
    this.body.useBoxCollision();
  }

  public setOwner(owner: Player) {
    this._ownedBy = owner;
  }
  public getOwner(): Player {
    return this._ownedBy;
  }

  public assignLocalSprite(itemFile: string) {
    this._texture = new ex.Texture(`./game/assets/items/${itemFile}`);
    this._texture.load().then(value => {
      this.addDrawing(this._texture.asSprite());
    });
  }

  public getSprite() {
    if (this._texture) {
      return this._texture.asSprite();
    } else {
      return null;
    }
  }
}
