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

Het hoofdpersonage wordt vertolkt door het [runner.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/runner.png) bestand.

![runner](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/runner.png)

Dit is een strook van vijf vierkanten die 64 op 64 pixels groot zijn. De volgorde van de afbeeldingen is als volgt:

1. rust
2. lopen 1
3. lopen 2
4. lopen 3
5. springen

Het is goed om de grootte en volgorde zo te houden, anders loopt de animatie in de soep. In de assets folder vind je ook een psd met de nodige hulplijnen, zodat je weet waar de frames van de animatie beginnen en stoppen.

Het renderen van de platformen is een beetje ingewikkelder. Deze zijn opgesplits in tegels (tiles). Bekijk [tiles.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/tiles.png) maar eens.

![tiles.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/tiles.png)

Dit is ook een strook, maar de vierkanten zijn kleiner: 32 op 32 pixels. De posities zijn in deze volgorde:

1. linkerbovenhoek
2. linkerkant
3. rechterbovenhoek
4. rechterkant
5. bovenkant
6. vulling

Opmerking: er is geen onderkant.

Er is ook een psd met hulplijnen voor de tegels.

Tot slot zijn er nog 2 laatste belangrijke afbeeldingen: [start-screen.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/start-screen.png) en [game-over.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/game-over.png)

![start-screen.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/start-screen.png) ![game-over.png](https://raw.githubusercontent.com/Quinten/projectrun/gh-pages/assets/sprites/game-over.png)

Beide afbeeldingen zijn 320 bij 320 pixels groot. Dit is dezelfde afmetingen als het spel zelf. Ze worden allebei helemaal bovenop alle andere afbeeldingen gerenderd. Dit betekent dat ze niet transparant hoeven te zijn (maar het mag wel). Ze kunnen dus een volledig ander scherm zijn, maar wel niet geanimeerd.

### Sounds

Sounds are stored in the [assets/sounds](https://github.com/Quinten/projectrun/tree/gh-pages/assets/sounds) folder.

You can also swap those. But you if you rather enjoy the silence you can remove the `<audio>` tags from [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) and the code will ignore the sounds.

### Changing the instructions and other texts

All the instructions and other texts displayed during the game are written down in and can be changed in [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html).

Note that there are `<span>` elements with id's that are placeholders for dynamic text like the score and highscore.

You can also change the font and color in the [index.html](https://github.com/Quinten/projectrun/tree/gh-pages/index.html) via css.

### License

Project Run is released under the MIT license. See [LICENSE](https://github.com/Quinten/projectrun/blob/gh-pages/LICENSE) for details
