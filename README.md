# Project Run

[Play the game](http://quinten.github.io/projectrun/)

Project Run is a simple html5 arcade autorun game, that is built with adaptation in mind.

You can easily swap the graphics with your own graphics. And you don't even have to do any coding. Just make sure you keep the images the same size and everything will automatically fall into place.

### Sprites

Project Run uses a technique called 'blitting', which means that partially transparent bitmaps or parts of bitmap images are being copied on top of each other in real-time.

All the graphics are in the png format and are stored in the [assets/sprites](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sprites) folder.

### Sounds

Sounds are stored in the [assets/sounds](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sounds) folder. 

You can also swap those. But you if you rather enjoy the silence you can remove the `<audio>` tags from [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) and the code will ignore the sounds.

### Changing the instructions and other texts

All the instructions and other texts displayed during the game are written down in and can be changed in [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html).

Note that there are `<span>` elements with id's that are placeholders for dynamic text like the score and highscore.

You can also change the font and color in the [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) via css.

### License

Project Run is released under the MIT license. See [LICENSE](https://github.com/Quinten/projectrun/blob/gh-pages/LICENSE) for details
