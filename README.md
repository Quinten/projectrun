# Project Run

[![Play Project Run][screenshot]][screenshotlink]

[screenshot]: https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/screenshots/projectrun.png (Play Project Run)
[screenshotlink]: http://quinten.github.io/projectrun/

[Play the game](http://quinten.github.io/projectrun/)

Project Run is a simple html5 arcade autorun game, that is built with adaptation in mind.

You can easily swap the graphics with your own graphics. And you don't even have to do any coding. Just make sure you keep the images the same size and everything will automatically fall into place.

### Sprites

Project Run uses a technique called 'blitting', which means that partially transparent bitmaps or parts of bitmap images are being copied on top of each other in real-time.

All the graphics are in the png format and are stored in the [assets/sprites](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sprites) folder.

There are 2 parallax backgrounds. One for the sky and one for the skyline.

![sky](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/sky.png)

![skyline](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/skyline.png)

These must be 320 pixels high and are repeated horizontally. So what sticks out on the left side must appear in the picture on the right side to create a continous effect.

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

Both images are sized 320X320, which is the same dimensions as the game itself. They are both drawn on top of everything else. Which means they don't have to be transparent and can be completly different screens (but not animated).

### Sounds

Sounds are stored in the [assets/sounds](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sounds) folder.

You can also swap those. But you if you rather enjoy the silence you can remove the `<audio>` tags from [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) and the code will ignore the sounds.

### Changing the instructions and other texts

All the instructions and other texts displayed during the game are written down in and can be changed in [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html).

Note that there are `<span>` elements with id's that are placeholders for dynamic text like the score and highscore.

You can also change the font and color in the [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) via css.

### License

Project Run is released under the MIT license. See [LICENSE](https://github.com/Quinten/projectrun/blob/gh-pages/LICENSE) for details
