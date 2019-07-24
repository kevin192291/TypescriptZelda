import { Scene, Engine, SpriteSheet, Texture, Actor } from 'excalibur';
import { Character } from './Character';
import { Item } from '../items/item';
import ex = require('excalibur');
import { MessageBox } from './message-box';
import { Player } from './Player';

export class Npc extends Character {
  public name: string = 'unknown';
  public static instance: Npc = null;

  private _spriteSheet: SpriteSheet = null;
  private _game: Engine = null;
  private _inventory: Item[] = [];
  private _activeItem: Item = null;
  private _canDie: boolean = true;

  constructor(engine: Engine, spriteSheetTexture: Texture, name?: string) {
    super(engine, name);
    this._game = engine;

    this._spriteSheet = new ex.SpriteSheet(
      spriteSheetTexture,
      spriteSheetTexture.width / 16, // columns (x)
      spriteSheetTexture.height / 16, // rows (y)
      16, // Cell Height
      16 //Cell Width
    );
    // create animation (125ms frame speed)
    var playerIdleAnimation = this._spriteSheet.getSprite(1);
    // add drawing to player as "idle"
    this.addDrawing('idle', playerIdleAnimation);
    // add player to game
    this._game.add(this);

    this.on('collisionstart', e => {
      this.findPreCollision(e.other);
      this.talk(e.other);
    });
  }

  public static create(
    game: Engine,
    spriteSheetTexture: Texture,
    name?: string
  ) {
    if (this.instance === null) {
      this.instance = new Npc(game, spriteSheetTexture, name);
    }
    return this.instance;
  }

  public walk() {}

  public talk(talkingTo: Actor | Npc | Player | Character) {
    new MessageBox(
      'Hello! Would you like me to heal you to full health?',
      talkingTo,
      (talkingTo: Actor | Npc | Player | Character) => {
        (talkingTo as Character).health = 100;
      },
      () => {
        alert('Fine! I am leaving then!');
        this.kill();
      }
    );
  }

  findPreCollision(e: Actor) {
    if (e.pos.x > e.oldPos.x) {
      this.vel.setTo(0, 0);
      this.setDrawing('left_idle');
      e.pos = new ex.Vector(e.oldPos.x - 5, e.oldPos.y);
    }
    if (e.pos.x < e.oldPos.x) {
      this.vel.setTo(0, 0);
      this.setDrawing('left_idle');
      e.pos = new ex.Vector(e.oldPos.x + 5, e.oldPos.y);
    }

    if (e.pos.y > e.oldPos.y) {
      this.vel.setTo(0, 0);
      this.setDrawing('left_idle');
      e.pos = new ex.Vector(e.oldPos.x, e.oldPos.y - 5);
    }
    if (e.pos.y < e.oldPos.y) {
      this.vel.setTo(0, 0);
      this.setDrawing('left_idle');
      e.pos = new ex.Vector(e.oldPos.x, e.oldPos.y + 5);
    }
  }
}
