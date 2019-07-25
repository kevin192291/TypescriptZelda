import { Item } from './item';
import { Direction } from '../models/direction.enum';
import { CollisionType, CollisionStartEvent, RotationType } from 'excalibur';

export class Hammer extends Item {
  private _inUse: boolean = false;
  private _useageCount: number = 0;
  private _game: ex.Engine;

  constructor(game: ex.Engine) {
    super();
    this._game = game;
    this.assignLocalSprite('hammer.png');
    this.collisionType = CollisionType.Active;
    this.body.useBoxCollision();
    this.actions.fade(0, 1);

    this.on('collisionstart', (hit: CollisionStartEvent) => {
      const hitPlr: any = hit.other;
      hitPlr.takeDamage(8);
    });
  }

  public dealDamage() {
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
    const cell = this._game.currentScene.tileMaps[0].getCellByPoint(
      target.x,
      target.y
    );
    if (cell.sprites.length > 1) {
      cell.removeSprite(cell.sprites[cell.sprites.length]);
      cell.sprites[1].spriteId = cell.sprites[0].spriteId;
      cell.sprites[1].spriteSheetKey = cell.sprites[0].spriteSheetKey;
      cell.solid = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta); // perform base drawing logic
  }

  public use() {
    if (!this.currentDrawing) return;
    this._inUse = true;
    this.dealDamage();
    this._inUse = false;
  }
  public drop() {}
}
