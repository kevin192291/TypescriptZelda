import TiledResource from "../maps/TiledResource";
import { Texture, SpriteSheet } from "excalibur";

export interface IResources {
    maps: TiledResource[],
    sprites: Texture[],
    spriteSheets: SpriteSheet[],
}