"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ex = require("../../node_modules/excalibur");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scene) {
        var _this = _super.call(this) || this;
        _this.health = 100;
        _this.collisionType = ex.CollisionType.Passive;
        _this.body.useBoxCollision();
        _this.on('precollision', function (e) {
            debugger;
            var withActor = e.actor;
            _this.pos.setTo(_this.oldPos.x, _this.oldPos.y);
        });
        _this.color = ex.Color.Green;
        _this.setHeight(20);
        _this.setWidth(20);
        _this.pos.setTo(200, 250);
        scene.add(_this);
        return _this;
    }
    Player.prototype.update = function (engine, delta) {
        _super.prototype.update.call(this, engine, delta);
        if (engine.input.keyboard.isHeld(ex.Input.Keys.W) || engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
            this.vel.setTo(0, -100);
        }
        else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) || engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
            this.vel.setTo(0, 100);
        }
        else if (engine.input.keyboard.isHeld(ex.Input.Keys.A) || engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.setTo(-100, 0);
        }
        else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) || engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.setTo(100, 0);
        }
        if (engine.input.keyboard.wasReleased(ex.Input.Keys.W) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.S) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.A) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.D) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Up) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Down) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Right) ||
            engine.input.keyboard.wasReleased(ex.Input.Keys.Left)) {
            this.vel.setTo(0, 0);
        }
    };
    Player.prototype._initialize = function (engine) {
        _super.prototype._initialize.call(this, engine);
    };
    return Player;
}(ex.Actor));
exports.Player = Player;
//# sourceMappingURL=Player.js.map