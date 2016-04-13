# Project Run

[![Speel Project Run][screenshot]][screenshotlink]

[screenshot]: https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/screenshots/projectrun.png (Speel Project Run)
[screenshotlink]: http://quinten.github.io/projectrun/

[Speel het spel](http://quinten.github.io/projectrun/)

Project Run is een simpel html5 arcade autorun (automatisch-lopen) spel, dat speciaal ontworpen is om gemakkelijk te worden aangepast.

Je kan heel gemakkelijk de grafische elementen vervangen door je eigen grafische elementen. Je hoeft zelf niet te kunnen programmeren. Als je ervoor zorgt dat de grafische elementen hetzelfde formaat hebben als de voorbeelden, dan valt alles vanzelf op zijn plaats.

### Sprites

Project Run maakt gebruik van een techniek die 'blitting' genoemd wordt. Dit wil zeggen dat gedeeltelijk transparante afbeeldingen of delen van afbeeldingen over elkaar gekopiëerd worden in real-time.

Alle grafische elementen zijn van het png bestandstype en zijn opgelagen in de [assets/sprites](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sprites) map.

Er zijn 2 parallaxe achtergronden. Eentje voor de lucht en eentje voor de skyline.

![sky](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/sky.png)

![skyline](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/skyline.png)

Deze moeten 320 pixels hoog zijn en worden horizontaal herhaald. Dus wat er uitsteekt aan de linkerkant moet terug afgebeeld zijn op de rechterkant van de afbeelding zodat er een doorlopend effect ontstaat.

The main character is stored in the [runner.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/runner.png) file.

![runner](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/runner.png)

This is a strip of several 64x64 sized squares. Five in total. The frames are in this order:

1. rest
2. walk 1
3. walk 2
4. walk 3
5. jump

It is best to keep the size and the sequence of which is which, otherwise his animation will appear messed up. But for your peace fo mind there is also a psd in there somewhere with the necessary guides.

The rendering of the platforms is a little bit tricky. They are broken up into tiles. Have a look at [tiles.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/tiles.png)

![tiles.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/tiles.png)

This is also a strip, but the images are smaller: 32x32. The postitions are in this order:

1. top left corner
2. left side
3. top right corner
4. right side
5. up side
6. fill

Note: there is no bottom side.

There is also a psd with guides for the tiles.

Finally there are 2 other images you should know about: [start-screen.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/start-screen.png) and [game-over.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/game-over.png)

![start-screen.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/start-screen.png) ![game-over.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/game-over.png)

Both images are sized 320X320, which is the same dimensions as the game itself. They are both drawn on top of everything else. Which means they don't have to be transparent and can be completly different screens (but nog animated).

### Sounds

Sounds are stored in the [assets/sounds](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sounds) folder.

You can also swap those. But you if you rather enjoy the silence you can remove the `<audio>` tags from [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) and the code will ignore the sounds.

### Changing the instructions and other texts

All the instructions and other texts displayed during the game are written down in and can be changed in [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html).

Note that there are `<span>` elements with id's that are placeholders for dynamic text like the score and highscore.

You can also change the font and color in the [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) via css.

### License

Project Run is released under the MIT license. See [LICENSE](https://github.com/Quinten/projectrun/blob/gh-pages/LICENSE) for details
