import ex = require("excalibur");
import { v4 as uuidv4 } from 'uuid';

export class UI extends ex.Scene {
    private ui = document.getElementById('controls');
    private id = uuidv4();

    constructor(_engine: ex.Engine) {
        super(_engine);
    }

    public AddButton(foo: Function, image: string) {
        const btn = document.createElement('button');
        btn.className = 'button button-action';
        btn.id = this.id;
        btn.onclick = (e) => {
            e.preventDefault();
            foo(); // run injected function for this button
        }
        this.ui.appendChild(btn);
    }

    public removeButton() {
        const button = document.getElementById(this.id);
        document.removeChild(button);
    }

}