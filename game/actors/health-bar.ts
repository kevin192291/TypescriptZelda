import { Npc } from './Npc';
import { Player } from './Player';
import { UIActor, Color, Actor, PostDrawEvent } from 'excalibur';

export class HealthBar extends Actor {
  private _target: Player | Npc = null;
  constructor(target: Player | Npc) {
    super(target.x, target.y, target.getWidth());
    this._target = target;
    target.add(this);
    target.on('postdraw', (d: PostDrawEvent) => {
        d.ctx.strokeStyle = Color.Black.toString();
        d.ctx.fillStyle = Color.Green.toString();
        d.ctx.lineWidth = .3;
        d.ctx.font = 'normal 5px sans-serif';
        d.ctx.fillText('HP: ' + (this._target.health).toString(), -31, 12);
        d.ctx.fillRect(-8, 9, this._target.health * (.16), 3);
        d.ctx.strokeRect(-8,9,16,3); // Outline healthbar in red
    });
  }
}
