import { ITiledMap } from '../ITiledMap';

export class Generator {
    private tileMap: ITiledMap = null;

    constructor(
        mapWidth: number,
        mapHeight: number,
        tileWidth: number,
        tileHeight: number,
    ) {
        this.tileMap = {
            name: '',
            height: mapHeight,
            width: mapWidth,
            layers: [
                {
                    data: [1, 2, 2, 2, 2, 3, 11, 12, 12, 12, 12, 13, 11, 12, 12, 12, 12, 13, 11, 12, 12, 12, 12, 13, 11, 12, 12, 12, 12, 13, 21, 22, 22, 22, 22, 23],
                    height: 6,
                    name: 'Tile Layer 1',
                    opacity: 1,
                    type: 'tilelayer',
                    visible: true,
                    width: 6,
                    x: 0,
                    y: 0
                }],
            nextobjectid: 1,
            orientation: 'orthogonal',
            renderorder: 'right-down',
            tilewidth: tileWidth,
            tileheight: tileHeight,
            tilesets: [
                {
                    firstgid: 1,
                    source: 'house.json'
                }],
            // type: 'map',
            version: 1,
        }
    }

    private generateLayerData(): void {
        this.tileMap.layers[0].data = [];

        
    }
}
