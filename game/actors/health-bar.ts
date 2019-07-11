import { Npc } from './Npc';
import { Player } from './Player';
import { Color, Actor, PostDrawEvent } from 'excalibur';

export class HealthBar extends Actor {
  private _target: Player | Npc = null;
  constructor(target: Player | Npc) {
    super(target.x, target.y, target.getWidth());
    this._target = target;
    target.add(this);
    target.on('postdraw', (d: PostDrawEvent) => {
      if (this._target.health === 0) {
        this._target.kill();
      } else {
        d.ctx.strokeStyle = Color.Black.toString();
        if (this._target.health >= 45) {
            d.ctx.fillStyle = Color.Orange.toString();
        }
        if (this._target.health >= 80) {
            d.ctx.fillStyle = Color.Green.toString();
        }
        if (this._target.health < 45) {
            d.ctx.fillStyle = Color.Red.toString();
        }
        d.ctx.lineWidth = 0.3;
        d.ctx.font = 'normal 5px hylianFont';
        d.ctx.fillText('HP: ' + this._target.health.toString(), -31, 12);
        d.ctx.fillRect(-8, 9, this._target.health * 0.16, 3);
        d.ctx.strokeRect(-8, 9, 16, 3); // Outline healthbar in red
      }
    });
  }
}
