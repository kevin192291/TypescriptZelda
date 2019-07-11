import ex = require('excalibur');
import { Player } from '../actors/Player';
import { Actor, Vector } from 'excalibur';

export abstract class Item extends Actor {
  public shouldDraw: boolean = true;
  public abstract use();
  public abstract drop();
  private _ownedBy: Player;

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

  // public draw(ctx: any, delta: number) {
  //     debugger;
  //   super.draw(ctx, delta); // perform base drawing logic
  //   if (this.getOwner().getActiveItem() === this) {
  //           this.visible = true;
  //           // this.actions.delay(1000);
  //   }
  //   debugger;
  // }

  public assignLocalSprite(itemFile: string) {
    var txPlayer = new ex.Texture(`./game/assets/items/${itemFile}`);
    txPlayer.load().then(value => {
      this.addDrawing(txPlayer.asSprite());
    });
  }
  debugger;
}
