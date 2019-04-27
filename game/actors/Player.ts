import * as ex from 'excalibur';
import { Engine, SpriteSheet, LockedCamera } from 'excalibur';
import { Character } from './Character';

export class Player extends Character {
  public static instance: Player = null;

  private _lockedCamera = null;
  private _spriteSheet: SpriteSheet = null;
  private _game: Engine = null;
  private _walkKeyReleased = true;
  private _initComplete = false;
  private _needsUpdating = true;

  private constructor(game: Engine, spriteSheet: SpriteSheet, name?: string) {
    super(game, name);
    this._spriteSheet = spriteSheet;
    this._game = game;
    this._lockedCamera = new LockedCamera();

    this._lockedCamera.setActorToFollow(this);
    game.currentScene.camera = this._lockedCamera;

    // this.on('precollision', (e: PreCollisionEvent) => {
    //   console.log(`${e}`);
    // });
  }

  public static create(game: Engine, spriteSheet: SpriteSheet, name?: string) {
    if (this.instance === null) {
      this.instance = new Player(game, spriteSheet, name);
    }
    return this.instance;
  }

  public update(engine: Engine, delta) {
    this.walk(engine);
    if (this._needsUpdating) {
      super.update(engine, delta);
    }
  }

  public _initialize(engine: Engine) {
    if (!this._initComplete) {
      super._initialize(engine);
      this._initAnimation();
      this._initComplete = true;
    }
  }

  public takeDamage(amount: number) {
    this.health = this.health - amount;
    this._game.currentScene.camera.shake(3, 3, 400);
  }

  public dealDamage(amount: number) {
    debugger;
    const cell = this._game.currentScene.tileMaps[0].getCellByPoint(
      this.getWorldPos().x,
      this.getWorldPos().y - 16
    );
    if (cell.sprites.length > 1) {
      cell.removeSprite(cell.sprites[cell.sprites.length]);
      cell.sprites[1].spriteId = cell.sprites[0].spriteId;
      cell.sprites[1].spriteSheetKey = cell.sprites[0].spriteSheetKey;
      cell.solid = false;
    }
  }

  public walk(engine) {
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Q)) {
      engine.isDebug = !engine.isDebug;
    }
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      this.dealDamage(0);
    }
    if (
      engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Up)
    ) {
      if (this._walkKeyReleased) {
        this._walkKeyReleased = false;
        this.vel.setTo(0, -100);
        this.setDrawing('up');
        this._needsUpdating = true;
      }
    } else if (
      engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Down)
    ) {
      if (this._walkKeyReleased) {
        this._walkKeyReleased = false;
        this.vel.setTo(0, 100);
        this.setDrawing('down');
        this._needsUpdating = true;
      }
    } else if (
      engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Left)
    ) {
      if (this._walkKeyReleased) {
        this._walkKeyReleased = false;
        this.vel.setTo(-100, 0);
        this.setDrawing('left');
        this._needsUpdating = true;
      }
    } else if (
      engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Right)
    ) {
      if (this._walkKeyReleased) {
        this._walkKeyReleased = false;
        this.vel.setTo(100, 0);
        this.setDrawing('right');
        this._needsUpdating = true;
      }
    }

    if (
      engine.input.keyboard.wasReleased(ex.Input.Keys.W) ||
      engine.input.keyboard.wasReleased(ex.Input.Keys.Up)
    ) {
      this.vel.setTo(0, 0);
      this.setDrawing('up_idle');
      this._walkKeyReleased = true;
      this._needsUpdating = false;
    } else if (
      engine.input.keyboard.wasReleased(ex.Input.Keys.S) ||
      engine.input.keyboard.wasReleased(ex.Input.Keys.Down)
    ) {
      this.vel.setTo(0, 0);
      this.setDrawing('down_idle');
      this._walkKeyReleased = true;
      this._needsUpdating = false;
    } else if (
      engine.input.keyboard.wasReleased(ex.Input.Keys.A) ||
      engine.input.keyboard.wasReleased(ex.Input.Keys.Right)
    ) {
      this.vel.setTo(0, 0);
      this.setDrawing('right_idle');
      this._walkKeyReleased = true;
      this._needsUpdating = false;
    } else if (
      engine.input.keyboard.wasReleased(ex.Input.Keys.D) ||
      engine.input.keyboard.wasReleased(ex.Input.Keys.Left)
    ) {
      this.vel.setTo(0, 0);
      this._walkKeyReleased = true;
      this.setDrawing('left_idle');
      this._needsUpdating = false;
    }
  }

  private _initAnimation(): void {
    var up_idle = this._spriteSheet.getSprite(0);
    this.addDrawing('up_idle', up_idle);

    var down_idle = this._spriteSheet.getSprite(10);
    this.addDrawing('down_idle', down_idle);

    var left_idle = this._spriteSheet.getSprite(2);
    this.addDrawing('left_idle', left_idle);

    var right_idle = this._spriteSheet.getSprite(23);
    this.addDrawing('right_idle', right_idle);

    var walkUp_sprites = this._spriteSheet.getAnimationBetween(
      this._game,
      19,
      21,
      50
    ).sprites;
    var up = new ex.Animation(this._game, walkUp_sprites, 150, true);
    this.addDrawing('up', up);

    var left_sprites = this._spriteSheet.getAnimationBetween(
      this._game,
      2,
      4,
      50
    ).sprites;
    var left = new ex.Animation(this._game, left_sprites, 125, true);
    this.addDrawing('left', left);

    var right_sprites = this._spriteSheet.getAnimationBetween(
      this._game,
      23,
      25,
      50
    ).sprites;
    var right = new ex.Animation(this._game, right_sprites, 125, true);
    this.addDrawing('right', right);

    var down_sprites = this._spriteSheet.getAnimationBetween(
      this._game,
      21,
      23,
      50
    ).sprites;
    var down = new ex.Animation(this._game, down_sprites, 150, true);
    this.addDrawing('down', down);
  }
}
