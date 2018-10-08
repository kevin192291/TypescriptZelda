import { ITiledMap, ITiledMapLayer } from '../ITiledMap';

export class MapGenerator {
    private tileMap: ITiledMap = null;
    private numberOfTiles: number = -1;

    constructor(
        mapWidth: number,
        mapHeight: number,
        tileWidth: number,
        tileHeight: number,
    ) {
        this.numberOfTiles = mapWidth * mapHeight;

        this.tileMap = {
            name: this.guid(),
            height: 10,
            layers: [
                {
                    data: [1, 2, 48, 2, 45, 2, 51, 44, 2, 3, 11, 12, 12, 12, 55, 12, 61, 54, 24, 13, 11, 12, 12, 12, 12, 12, 12, 12, 34, 13, 11, 12, 12, 12, 12, 12, 12, 12, 68, 13, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 11, 12, 12, 12, 12, 12, 4, 4, 4, 13, 11, 12, 12, 12, 12, 12, 4, 58, 4, 13, 11, 12, 12, 12, 12, 12, 4, 4, 4, 13, 21, 22, 22, 22, 64, 65, 22, 22, 22, 23],
                    height: 10,
                    name: 'Tile Layer 1',
                    opacity: 1,
                    type: 'tilelayer',
                    visible: true,
                    width: 10,
                    x: 0,
                    y: 0
                }],
            nextobjectid: 1,
            orientation: 'orthogonal',
            renderorder: 'right-down',
            tiledversion: '1.0.3',
            tileheight: 16,
            tilesets: [
                {
                    columns: 10,
                    firstgid: 1,
                    image: './dist/assets/LinksAwakeningHouse.png',
                    imageheight: 112,
                    imagewidth: 160,
                    margin: 0,
                    name: 'HouseTileSet',
                    spacing: 0,
                    tilecount: 70,
                    tileheight: 16,
                    tilewidth: 16,
                    transparentcolor: '#ff00ff'
                }],
            tilewidth: 16,
            type: 'map',
            version: 1,
            width: 10
        }
        this.generateLayerData();
    }

    public getGeneratedTileMap(): ITiledMap {
        return this.tileMap;
    }

    private generateLayerData(): void {
        // This Deletes any pre-existing layers, this may change in the future
        // for hybrid maps
        this.tileMap.layers = [];

        const data: number[] = [];
        for (let i = 0; i < this.numberOfTiles; i++) {
            data.push(this.randomTile(1,23));
        }
        const layerNumber: number = this.tileMap.layers.length;
        const generatedLayer: ITiledMapLayer = {
            data: data,
            width: 10,
            height: 10,
            name: `Tile Layer ${layerNumber}`,
            opacity: 1,
            type: 'tilelayer',
            visible: true,
            x: 0,
            y: 0
        };

        this.tileMap.layers.push(generatedLayer);
        debugger;
    }

    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    private randomTile(min: number, max: number, restrictedTiles: number[] = []): number {
        let tile = -1;
        do {
            tile = Math.floor(Math.random() * (max - min)) + min;
        } while(restrictedTiles.includes(tile));
        return tile;
    }
}
