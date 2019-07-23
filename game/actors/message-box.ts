import * as ex from 'excalibur';
import { Actor, Color } from 'excalibur';
import { Player } from './Player';
import { Character } from './Character';
import { Npc } from './Npc';

export class MessageBox extends Actor {

  constructor(message: string, talkingTo: Actor | Npc | Player | Character, yesAction?: Function, noAction?: Function) {
    super();
    if (confirm(message)) {
        if (yesAction) {
            debugger;
            yesAction.call(this, talkingTo);
        }
    } else {
        if (noAction) {
            noAction.call(this, talkingTo);
        }
    }
    this.kill();
  }

}
 