import ex = require('excalibur');
import { Player } from '../actors/Player';
import { Actor, Vector } from 'excalibur';

export abstract class Item extends Actor {
  public abstract use();
  public abstract drop();
  private _ownedBy: Player;

  constructor() {
    super();
    this.collisionType = ex.CollisionType.Active;
    this.body.useBoxCollision();
    this.visible = false;
  }

  public setOwner(owner: Player) {
    this._ownedBy = owner;
  }
  public getOwner(): Player {
    return this._ownedBy;
  }

  public draw(ctx: any, delta: number) {
    super.draw(ctx, delta);
    if (this.getOwner().getActiveItem() === this) {
      if (this.getOwner().isItemInUse()) {
        this.visible = true;
        this.actions.delay(1000);
        this.getOwner().SetItemInUse(false);
      }
    }
    debugger;
  }

  public assignLocalSprite(itemFile: string) {
    var txPlayer = new ex.Texture(`./game/assets/items/${itemFile}`);
    txPlayer.load().then(value => {
      this.addDrawing(txPlayer.asSprite());
    });
  }
}
