import TiledResource from "../maps/TiledResource";
import { Texture } from "excalibur";

export interface IResources {
    maps: TiledResource[],
    sprites: Texture[],
}