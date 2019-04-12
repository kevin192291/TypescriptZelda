import TiledResource = require('@excaliburjs/excalibur-tiled');

export interface Resources {
    maps: TiledResource.TiledResource,
    sprites: any[],
    spriteSheets: any[],
}