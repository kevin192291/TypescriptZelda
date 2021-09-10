import ex = require('excalibur');
import { Player } from '../actors/Player';
import { Actor, TileSprite, Vector } from 'excalibur';
import { Direction } from '../models/direction.enum';

export abstract class Item extends Actor {
  public shouldDraw: boolean = true;
  public sprite_name: string;
  public abstract use();
  public abstract drop();
  private _ownedBy: Player;
  private _texture: ex.Texture;

  constructor() {
    super();
    this.body.collider.type = ex.CollisionType.Active;
    this.body.useBoxCollider(16,16);
  }

  public setOwner(owner: Player) {
    this._ownedBy = owner;
  }
  public getOwner(): Player {
    return this._ownedBy;
  }

  // Return the TileSprite that the actor is facing
  public findFacedActor(actors: Actor[]): Player {
    const target = { ...this.getWorldPos() };
    switch (this.getOwner().getDirection()) {
      case Direction.Up:
        target.y -= 16;
        break;
      case Direction.Down:
        target.y += 16;
        break;
      case Direction.Left:
        target.x -= 16;
        break;
      case Direction.Right:
        target.x += 16;
        break;
    }
    actors.forEach((actor: Actor) => {
      if (actor.body.useBoxCollider(target.x, target.y)) {
        return actor;
      }
    });
    return null;
  }

  public assignLocalSprite(itemFile: string) {
    this._texture = new ex.Texture(`./game/assets/items/${itemFile}`);
    this.sprite_name = itemFile;
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
