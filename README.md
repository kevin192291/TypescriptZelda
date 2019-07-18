# ⚔️ communityGame
![](https://github.com/kevin192291/communityGame/raw/master/documentation/gameDemoGif.gif)
A game that can be easly modified to be anything anyone wants it to be.
Cross platform, developed using Electron and Typescript as well as ExcaliburJS.

- 💪 Any pull requests are strongly appreciated!
- 🆘 Please log as many bugs as possible!
- 👻 Please share, I would like to get as many people looking as possible so this project doesn't dissapear

## Controls
Move with:
W(👆),
A(👈),
S(👇),
D(👉)

🎒 Inventory:
- Switch inventory item to the next item using the 'M' key
- Switch inventory item to the previous item using the 'N' key
- Quick select an inventory item with the number keys: 1-5

🤺 The 'Space Bar' will activate your currently selected item

## Setup
Setting up is easy:
```
git clone https://github.com/kevin192291/communityGame.git
cd communityGame
npm i
npm run start
```

## 🏰 Making TileMaps
Making tile maps has been made as easy as I can make it.
Designing a tile map is done with [Tiled](https://www.mapeditor.org/)

### Creating a new map
- In Tiled, Click "File" -> "New" -> "New Map" (or CTRL+N)
- Select a fixed file amount Width of 30 and Height of 30 is recommended.
- IMPORTANT Change the "Save as type" dropdown to "JSON map files (.json)"
- Add a tileset by clicking "Map" from the top menu and click "Add External Tileset..."
- Select the .json type tileset from the [tilesets folder](game/assets/tilesets/)
- IMPORTANT The tileset image will now be displayed in Tiled's "tilesets" selection view,
typically on the right, just under the tile images, click "Embed Tileset".
- COMPLETE!

### Adding a Warp Zone
A warp zone is a tile that if entered by the player, it will move the user to a new map.
an example of this would be if a user steps on a door tile, the user should then be transported
to the map, that would be inside the house that the door belongs to.

In Tiled, there is a "Layers" section, Click a layer (I recommend a layer called "warpZones").
On the left, there will be a Layer Properties section, at the bottom click the "+" button and add
a new "String" type called "placeData".
The place data should be a valid JSON string.
Have a key being a string containing the X,Y coords of a tile.
to get the X,Y coords of a specific tile, mouse over that tile, and get the X,Y position. Lets say
tile number: 17,12 we must then multiply each number by 16 to get: 272,192 That will be our Key.
Then add an object under that key using { }
it must have a type, in this case, warp, and a scene that will be transitioned to. Lets say overworld2
Here is an example:

```javascript
[
  {"272,192": {"type":"warp", "scene": "overworld2"}}
]
```
If you need to test your JSON you can test it [here](https://jsonformatter.curiousconcept.com/)
Test the map by running the game, It should work succesfully.
