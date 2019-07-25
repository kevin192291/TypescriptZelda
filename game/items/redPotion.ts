import { Item } from './item';

export class RedPotion extends Item {
  private _empty: boolean = false;
  constructor() {
    super();
    super.shouldDraw = false;
    this.sprite_name = 'redPotion.png';
  }
  public use() {
    const owner = this.getOwner();
    if (owner && !this._empty) {
      owner.health = owner.health + 20;
      this._empty = true;
      this.drop();
    }
  }
  public drop() {
    if (this._empty) {
      const owner = this.getOwner();
      owner.drop(this);
    }
  }
}
