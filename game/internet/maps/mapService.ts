// import { IMap } from '../models/map.interface';

// var rp = require('request-promise');

// export class MapService {
//   private _base: string[] = [
//     'https://raw.githubusercontent.com/kevin192291/communityGame/master/game/assets/tilemaps'
//   ];

//   private _alreadyLoadedMapNames: string[] = [];

//   constructor() {}

//   public async getMapByName(mapName: string) {
//     const maps: IMap[] = [];
//     this._base.forEach(base => {
//       if (!this._alreadyLoadedMapNames.includes(base)) {
//           debugger;
//         return rp(`${this._base}/${mapName}`);
//       }
//     });
//     return maps;
//   }
// }
