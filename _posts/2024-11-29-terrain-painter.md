---
layout: post
title: "Terrain Painter"
date: 2024-11-29
category: game
featured: false
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046451/Terrain_Brushes_uqdylq.webp"
description: "A 2D terrain painter I made in vanilla JavaScript for my 2D Game Design class. It auto-generates islands, and you are then able to manipulate them however you like."

details:
  Programs Used: "Vanilla JavaScript, HTML"

toc:
  - label: "The Game"
    id: "the-game"
  - label: "Main Script"
    id: "main-script"
  - label: "Parameters"
    id: "parameters"
    sub: true
  - label: "Update Loop"
    id: "update-loop"
    sub: true
  - label: "User Input"
    id: "user-input"
    sub: true
  - label: "Terrain Script"
    id: "terrain-script"
  - label: "Terrain Class"
    id: "terrain-class"
    sub: true
  - label: "Lighting System"
    id: "lighting-system"
    sub: true
  - label: "Colors & Drawing"
    id: "colors-drawing"
    sub: true
  - label: "Noise Generator"
    id: "noise-generator"
  - label: "Brush Script"
    id: "brush-script"
  - label: "Brush Modes"
    id: "brush-modes"
    sub: true
  - label: "Final Note"
    id: "final-note"

sections:
  - title: "The"
    accent: "Game"
    label: "Live Examples"
    id: "the-game"
    blocks:
      - type: note
        id: "link"
        title: "Heres a link to the playable game"
        text: "https://bigguynick.itch.io/terrain-painter"

      - type: image
        id: "example-1"
        title: "Example 1 - Custom Islands"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046448/Terrain_screenshot2_rkfggw.webp"
        alt: "Custom islands"

      - type: image
        id: "example-2"
        title: "Example 2 - Brushes"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046451/Terrain_Brushes_uqdylq.webp"
        alt: "Brush tools in action"
        animated: true

      - type: image
        id: "example-3"
        title: "Example 3 - Lighting System"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046450/Terrain_Lighting_eyiuse.webp"
        alt: "Dynamic lighting and shadows on terrain"
        animated: true

  - title: "Main"
    accent: "Script"
    label: "Entry Point"
    id: "main-script"
    blocks:
      - type: code
        id: "parameters"
        title: "Parameters"
        lang: javascript
        description: "These parameters set up everything to do with the game. This is pretty sloppy, and I'd never place all of these parameters together, let alone in the main script nowadays."
        code: |
          const tileSize = 4;
          const mapSize = 180;
          const zoomFactor = 0.03;
          const detail = 0.05;

          const newTerrain = new Terrain(mapSize, mapSize);
          const brush = new Brush();

          canvas.width = tileSize * mapSize;
          canvas.height = tileSize * mapSize;
          overlay.width = tileSize * mapSize;
          overlay.height = tileSize * mapSize;

          let sun = 0.75*pi
          let mouse = { x: 0, y: 0, down: false, radius: 10};
          var keys = [];

          /*=== Game Animator ===*/
          let frameCount = 0;
          let fps = 60, fpsInterval, now, then, elapsed, startTime;

          function initialize() {
            fpsInterval = 1000 / fps;
            then = window.performance.now();
            startTime = then;
            animate();
          }

      - type: code
        id: "update-loop"
        title: "Update Loop"
        lang: javascript
        description: "The update loop of the game. It manually calculates the FPS and displays it."
        code: |
          function animate(newTime) {
            requestAnimationFrame(animate)
            now = newTime
            elapsed = now - then

            if (elapsed > fpsInterval) {
              then = now - (elapsed % fpsInterval)
              let sinceStart = now - startTime;
              let currentFps = Math.round(1000 / (sinceStart / frameCount) * 100) / 100

              document.getElementById('fps').innerHTML = currentFps;
              frameCount++

              o.clearRect(0, 0, canvas.width, canvas.height)
              brush.outlineRender();
              brush.use();
            }
          }

      - type: code
        id: "user-input"
        title: "User Input"
        lang: javascript
        description: "Pretty straightforward user input, simply updating parameters for various parts of the code depending on what the user does. I do find it interesting that I used a regex rather than parsing the input, but it works."
        code: |
          addEventListener('mousemove', (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY + 10;
            brush.x = round((event.clientX - ((window.innerWidth/2) - (canvas.width/2)))/tileSize);
            brush.y = round((event.clientY - ((window.innerHeight/2) - (canvas.height/2)))/tileSize) + 10;
          });

          addEventListener('mousedown', (event) => { mouse.down = true; });
          addEventListener('mouseup', (event) => { mouse.down = false; });

          addEventListener('wheel', (event) => {
            if (event.deltaY < 0 && brush.radius < 20) {
              brush.radius++;
            } else if (brush.radius > 0) {
              brush.radius--;
            }
          });

          addEventListener("keydown", (e) => {
            let key = e.key.toLowerCase()
            keys[key] = true
            const regex = /^[1-4]$/;
            if(regex.test(key)){
              let ele = document.getElementById(`${brush.mode}`);
              ele.style.color = 'white';
              ele.style.fontSize = '20px';
              switch (key) {
                case '1': brush.mode = 'erode'; break;
                case '2': brush.mode = 'build'; break;
                case '3': brush.mode = 'smooth'; break;
                case '4': brush.mode = 'flatten'; break;
              }
              ele = document.getElementById(`${brush.mode}`);
              ele.style.color = 'yellow';
              ele.style.fontSize = '25px';
            }
          });

  - title: "Terrain"
    accent: "Script"
    label: "Terrain System"
    id: "terrain-script"
    blocks:
      - type: code
        id: "terrain-type"
        title: "TerrainType"
        lang: javascript
        description: "Holds the data for different types of terrain, such as water, sand, and grass."
        code: |
          class TerrainType {
            constructor(minHeight, maxHeight, minColor, maxColor, lerpAdjustment) {
              this.minHeight = minHeight;
              this.maxHeight = maxHeight;
              this.minColor = minColor;
              this.maxColor = maxColor;
              this.lerpAdjustment = lerpAdjustment;
            }
          }

      - type: code
        id: "terrain-class"
        title: "Terrain - Constructor & Initialize"
        lang: javascript
        description: "The constructor for the terrain, which sets up all of its parameters. I also set up a draw buffer, which was fun to learn for optimization. initialize() generates the noise map, sets up all the terrain types, computes the initial shadows, and does the first full draw pass."
        code: |
          class Terrain {
            constructor(width, height) {
              this.width = width;
              this.height = height;
              this.grid = [];
              this.drawBuffer = [];
              this.shadowSet = new Set();
              this.ridgeSet = new Map();
              this.waterTerrain;
              this.sandTerrain;
              this.grassTerrain;
              this.mountainsTerrain;
            }

            initialize() {
              const noiseMap = new PerlinNoise(this.width, this.height);
              noiseMap.generateNoise();
              for (let x = 0; x < this.width; x++) {
                this.grid[x] = []
                for (let y = 0; y < this.height; y++) {
                  this.grid[x][y] = {x: x, y: x, val: noiseMap.grid[x][y], color: '', sColor: '', isShadow: false, angle: 0}
                }
              }
              this.waterTerrain     = new TerrainType(0.3,  0.5,  'rgb(30, 176, 251)',  'rgb(40, 255, 255)');
              this.sandTerrain      = new TerrainType(0.5,  0.53, 'rgb(215, 192, 158)', 'rgb(255, 246, 193)');
              this.grassTerrain     = new TerrainType(0.53, 0.63, 'rgb(2, 166, 155)',   'rgb(118, 239, 124)');
              this.mountainsTerrain = new TerrainType(0.63, 0.75, 'rgb(132, 145, 132)', 'rgb(255, 255, 255)');

              this.updateShadows(0, 0, this.width, this.height);
              for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                  this.setColor(x, y);
                  this.pushDrawBuffer(x, y);
                }
              }
              this.draw();
            }

      - type: code
        id: "lighting-system"
        title: "Lighting System"
        lang: javascript
        description: "These functions create the dynamic custom lighting. It detects local peaks on the terrain and draws a shadow at a distance based on the peak's height. The shadow direction is based off the sun vector, though I can switch it to point away from the mouse to act as a moveable sun. Shadows also stop once they run into another local peak, allowing for natural falloff."
        code: |
          updateShadows(x1, y1, x2, y2) {
            this.detectRidge(x1, y1, x2, y2);
            this.removeShadow(x1-10, y1-10, x2+10, y2+10);
            this.calcShadows();
          }

          detectRidge(startX, startY, endX, endY) {
            for (let x = startX; x < endX; x++) {
              for (let y = startY; y < endY; y++) {
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) continue;
                const dist = Math.round((this.grid[x][y].val - 0.5) * 60);
                const ridge = this.isRidge(x, y);
                const coordKey = `${x},${y}`;
                if (this.ridgeSet.has(coordKey)) {
                  if (!ridge) { this.ridgeSet.delete(coordKey); }
                  else { this.ridgeSet.set(coordKey, dist); }
                } else {
                  if (ridge) { this.ridgeSet.set(coordKey, dist); }
                }
              }
            }
          }

          isRidge(x, y) {
            let invSun = invAng(sun)
            let ftargX = round(x + cos(invSun) * 1)
            let ftargY = round(y + sin(invSun) * 1)
            let btargX = round(x + cos(sun) * 1)
            let btargY = round(y + sin(sun) * 1)
            if (ftargX >= 0 && ftargX < this.width &&
                ftargY >= 0 && ftargY < this.height &&
                btargX >= 0 && btargX < this.width &&
                btargY >= 0 && btargY < this.height &&
                this.grid[x][y].val >= this.grid[ftargX][ftargY].val &&
                this.grid[x][y].val > this.grid[btargX][btargY].val &&
                this.grid[x][y].val > 0.55
            ) { return true; } else return false;
          }

          calcShadows() {
            this.ridgeSet.forEach((dist, tileKey) => {
              const [x, y] = tileKey.split(',').map(Number);
              let theta = normAng(sun - 0.1);
              for (let j = 0; j < 5; j++) {
                theta = normAng(theta + 0.05);
                for (let i = 1; i < dist; i++) {
                  let targX = Math.round(x + Math.cos(theta) * i);
                  let targY = Math.round(y + Math.sin(theta) * i);
                  if (targX >= 0 && targX < this.width && targY >= 0 && targY < this.height) {
                    if (this.grid[targX][targY].val < this.grid[x][y].val) {
                      this.addShadow(targX, targY);
                    }
                  }
                }
              }
            });
          }

          addShadow(x, y) {
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
              const coordKey = `${x},${y}`;
              if (!this.shadowSet.has(coordKey)) {
                this.shadowSet.add(coordKey);
                this.grid[x][y].isShadow = true;
                this.pushDrawBuffer(x, y);
              }
            }
          }

          removeShadow(startX, startY, endX, endY) {
            for (let x = startX; x < endX; x++) {
              for (let y = startY; y < endY; y++) {
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) continue;
                if (this.grid[x][y].isShadow) {
                  const coordKey = `${x},${y}`;
                  this.grid[x][y].isShadow = false;
                  this.pushDrawBuffer(x, y);
                  this.shadowSet.delete(coordKey);
                }
              }
            }
          }

      - type: code
        id: "colors-drawing"
        title: "Colors & Drawing"
        lang: javascript
        description: "These functions calculate the color of each tile based on its height and whether it is in shadow. Nowadays I would adhere to DRY techniques and refactor this into helper functions to avoid so much repeated code. The draw buffer and draw functions handle the actual rendering, only redrawing tiles that were marked as changed."
        code: |
          setColor(x, y) {
            let color;
            let heightValue = this.grid[x][y].val;
            let { minHeight: wlH, maxHeight: whH, minColor: wlC, maxColor: whC } = this.waterTerrain;
            let { minHeight: slH, maxHeight: shH, minColor: slC, maxColor: shC } = this.sandTerrain;
            let { minHeight: glH, maxHeight: ghH, minColor: glC, maxColor: ghC } = this.grassTerrain;
            let { minHeight: mlH, maxHeight: mhH, minColor: mlC, maxColor: mhC } = this.mountainsTerrain;

            if      (heightValue < wlH)                       { color = 'rgb(30, 176, 251)'; }
            else if (heightValue >= wlH && heightValue < whH) { color = this.interpolateColor(wlC, whC, (heightValue - wlH) / (whH - wlH)); }
            else if (heightValue >= slH && heightValue < shH) { color = this.interpolateColor(slC, shC, (heightValue - slH) / (shH - slH)); }
            else if (heightValue >= glH && heightValue < ghH) { color = this.interpolateColor(glC, ghC, (heightValue - glH) / (ghH - glH)); }
            else if (heightValue >= mlH && heightValue < mhH) { color = this.interpolateColor(mlC, mhC, (heightValue - mlH) / (mhH - mlH)); }
            else                                              { color = 'rgb(255, 255, 255)'; }

            this.grid[x][y].sColor = this.shadowColor(color);
            this.grid[x][y].color = color;
          }

          interpolateColor(color1, color2, factor) {
            let [r1, g1, b1] = color1.match(/\d+/g).map(Number);
            let [r2, g2, b2] = color2.match(/\d+/g).map(Number);
            let r = Math.round(r1 + factor * (r2 - r1));
            let g = Math.round(g1 + factor * (g2 - g1));
            let b = Math.round(b1 + factor * (b2 - b1));
            return `rgb(${r}, ${g}, ${b})`;
          }

          shadowColor(col) {
            const darkness = 60;
            const rgbValues = col.slice(4, -1).split(',');
            let r = parseInt(rgbValues[0]);
            let g = parseInt(rgbValues[1]);
            let b = parseInt(rgbValues[2]);
            r = max(r-darkness, 0);
            g = max(g-darkness, 0);
            b = max(b-darkness, 0);
            return `rgb(${r}, ${g}, ${b})`;
          }

          pushDrawBuffer(x, y) {
            const exists = this.drawBuffer.some(tile => x === tile.x && y === tile.y);
            if (!exists) { this.drawBuffer.push({ x, y }); }
          }

          draw() {
            for(let i = 0; i < this.drawBuffer.length; i++){
              let x = this.drawBuffer[i].x;
              let y = this.drawBuffer[i].y;
              c.fillStyle = this.grid[x][y].isShadow
                ? this.grid[x][y].sColor
                : this.grid[x][y].color;
              c.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
            this.drawBuffer = [];
          }

  - title: "Noise"
    accent: "Generator"
    label: "Perlin Noise"
    id: "noise-generator"
    blocks:
      - type: code
        id: "noise-constructor"
        title: "PerlinNoise - Constructor & Helpers"
        lang: javascript
        description: "The constructor and initializer for the noise generator. randVect() and dotProd() are the core math needed for the Perlin algorithm, and smoothStep() and interp() handle the smooth interpolation between grid corners."
        code: |
          class PerlinNoise {
            constructor(width, height) {
              this.width = width;
              this.height = height;
              this.grid = [];
              this.initialize();
            }

            initialize() {
              for (let i = 0; i < this.width; i++) {
                this.grid[i] = new Array(this.height).fill(0);
              }
            }

            randVect() {
              let theta = Math.random() * 2 * Math.PI;
              return { x: Math.cos(theta), y: Math.sin(theta) };
            }

            dotProd(x, y, vx, vy) {
              let gVect;
              let dVect = { x: x - vx, y: y - vy };
              if (this.gradients[[vx, vy]]) {
                gVect = this.gradients[[vx, vy]];
              } else {
                gVect = this.randVect();
                this.gradients[[vx, vy]] = gVect;
              }
              return dVect.x * gVect.x + dVect.y * gVect.y;
            }

            smoothStep(x) { return (6 * x ** 5) - (15 * x ** 4) + (10 * x ** 3); }
            interp(x, a, b) { return a + this.smoothStep(x) * (b - a); }

      - type: code
        id: "noise-generate"
        title: "PerlinNoise - Generation"
        lang: javascript
        description: "These functions actually generate the noise map using a lot of math. seed() clears the caches so each generation is fresh. get() samples a single point and caches the result. generateNoise() fills the whole grid by running each point through fractalBrownianMotion(), which layers multiple octaves of noise to produce a more natural result."
        code: |
          seed() {
            this.gradients = {};
            this.memory = {};
          }

          get(x, y) {
            if (this.memory.hasOwnProperty([x, y])) { return this.memory[[x, y]]; }
            let xf = floor(x);
            let yf = floor(y);
            let tl = this.dotProd(x, y, xf, yf);
            let tr = this.dotProd(x, y, xf + 1, yf);
            let bl = this.dotProd(x, y, xf, yf + 1);
            let br = this.dotProd(x, y, xf + 1, yf + 1);
            let xt = this.interp(x - xf, tl, tr);
            let xb = this.interp(x - xf, bl, br);
            let v = this.interp(y - yf, xt, xb);
            v = (v + 1) / 2;
            this.memory[[x, y]] = v;
            return v;
          }

          generateNoise(numOctaves = 5) {
            this.seed();
            for (let x = 0; x < this.width; x++) {
              for (let y = 0; y < this.height; y++) {
                let noiseValue = this.fractalBrownianMotion(x * zoomFactor, y * zoomFactor, numOctaves);
                this.grid[x][y] = noiseValue;
              }
            }
          }

          fractalBrownianMotion(x, y, numOctaves) {
            let total = 0;
            let amplitude = 1.0;
            let maxAmplitude = 0;
            let frequency = 1.0;
            for (let i = 0; i < numOctaves; i++) {
              total += this.get(x * frequency, y * frequency) * amplitude;
              maxAmplitude += amplitude;
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            return total / maxAmplitude;
          }

  - title: "Brush"
    accent: "Script"
    label: "Brush System"
    id: "brush-script"
    blocks:
      - type: code
        id: "brush-constructor"
        title: "Brush - Constructor & Outline"
        lang: javascript
        description: "The constructor for the brush handles its parameters. outlineRender() draws the pixelated circle of the brush on a separate overlay canvas so it doesn't interfere with the terrain canvas."
        code: |
          class Brush {
            constructor() {
              this.x = 0;
              this.y = 0;
              this.radius = 10;
              this.mode = 'erode';
              this.change = 0.005;
            }

            outlineRender() {
              for (let r = 0; r <= floor(this.radius * sqrt(0.5)); r++) {
                let d = floor(sqrt(this.radius ** 2 - r * r));
                o.fillStyle = 'black'
                o.fillRect((this.x - d) * tileSize, (this.y + r) * tileSize, tileSize, tileSize);
                o.fillRect((this.x + d) * tileSize, (this.y + r) * tileSize, tileSize, tileSize);
                o.fillRect((this.x - d) * tileSize, (this.y - r) * tileSize, tileSize, tileSize);
                o.fillRect((this.x + d) * tileSize, (this.y - r) * tileSize, tileSize, tileSize);
                o.fillRect((this.x + r) * tileSize, (this.y - d) * tileSize, tileSize, tileSize);
                o.fillRect((this.x + r) * tileSize, (this.y + d) * tileSize, tileSize, tileSize);
                o.fillRect((this.x - r) * tileSize, (this.y - d) * tileSize, tileSize, tileSize);
                o.fillRect((this.x - r) * tileSize, (this.y + d) * tileSize, tileSize, tileSize);
              }
            }

      - type: code
        id: "brush-use"
        title: "use()"
        lang: javascript
        description: "This function switches the current brush mode between the options. Nowadays I probably would have used something like the strategy pattern instead of a switch statement."
        code: |
          use() {
            if (mouse.down && this.withinBounds()) {
              switch (this.mode) {
                case 'erode':   ...; break;
                case 'build':   ...; break;
                case 'smooth':  ...; break;
                case 'flatten': ...; break;
              }
              newTerrain.updateShadows(this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius);
              newTerrain.draw();
              newTerrain.drawBuffer = [];
            }
          }

      - type: code
        id: "brush-modes"
        title: "Brush Modes"
        lang: javascript
        description: "The four brush modes. Erode lowers the tile's height value, build raises it, smooth smooths out the gradient between neighboring tiles, and flatten flattens all tiles within the brush to the height of the tile at the brush center."
        code: |
          case 'erode':
            this.getTiles((x, y) => {
              let dist = calcDist(brush.x, brush.y, x, y);
              let change = brush.change / ((dist / 4) + 1)
              newTerrain.grid[x][y].val = max(newTerrain.grid[x][y].val - change, 0);
              newTerrain.setColor(x, y);
              newTerrain.pushDrawBuffer(x, y);
            }); break;

          case 'build':
            this.getTiles((x, y) => {
              let dist = calcDist(brush.x, brush.y, x, y);
              let change = brush.change / ((dist / 4) + 1)
              newTerrain.grid[x][y].val = min(newTerrain.grid[x][y].val + change, 1);
              newTerrain.setColor(x, y);
              newTerrain.pushDrawBuffer(x, y);
            }); break;

          case 'smooth':
            this.getTiles((x, y) => {
              let total = 0, count = 0;
              for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) continue;
                  if (x+i >= 0 && x+i < newTerrain.width && y+j >= 0 && y+j < newTerrain.height) {
                    total += newTerrain.grid[x+i][y+j].val;
                    count++;
                  }
                }
              }
              if (count === 0) return;
              let tile = newTerrain.grid[x][y];
              let average = total / count;
              let newChange = tile.val > average ? -this.change / 3 : this.change / 3;
              tile.val = tile.val + newChange < average - newChange
                ? Math.min(average, tile.val + newChange)
                : Math.max(average, tile.val + newChange);
              if ((tile.val > average && tile.val <= average + this.change / 3) ||
                  (tile.val < average && tile.val >= average - this.change / 3)) {
                tile.val = average;
              }
              newTerrain.setColor(x, y);
              newTerrain.pushDrawBuffer(x, y);
            }); break;

          case 'flatten':
            this.getTiles((x, y) => {
              if (x === this.x && y === this.y) return;
              const tile = newTerrain.grid[x][y];
              let target = newTerrain.grid[this.x][this.y].val;
              let newChange = tile.val > target ? -this.change / 2 : this.change / 2;
              tile.val = tile.val + newChange < target - newChange
                ? Math.min(target, tile.val + newChange)
                : Math.max(target, tile.val + newChange);
              if ((tile.val > target && tile.val <= target + this.change / 2) ||
                  (tile.val < target && tile.val >= target - this.change / 2))
                tile.val = target;
              newTerrain.setColor(x, y);
              newTerrain.pushDrawBuffer(x, y);
            }); break;

      - type: code
        id: "get-tiles"
        title: "getTiles() & insideCircle()"
        lang: javascript
        description: "These functions are responsible for fetching the tiles within the brush's area."
        code: |
          getTiles(action) {
            let top    = ceil(this.y - this.radius),
                bottom = floor(this.y + this.radius),
                left   = ceil(this.x - this.radius),
                right  = floor(this.x + this.radius);
            for (let y = top; y <= bottom; y++) {
              for (let x = left; x <= right; x++) {
                if (this.insideCircle(this.x, this.y, x, y, this.radius) &&
                    x >= 0 && x < newTerrain.width &&
                    y >= 0 && y < newTerrain.height) {
                  action(x, y)
                }
              }
            }
          }

          insideCircle(x1, y1, x2, y2, radius) {
            let dx = x1 - x2, dy = y1 - y2;
            return dx * dx + dy * dy <= radius * radius;
          }

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "This was a fun and decently challenging project, especially when it came to creating the brush modes and custom lighting. A lot of this code is pretty bad though, and nowadays I would go about this project in a very different manner, especially with my file and class structures which are currently a nightmare to work with. I'd love to revisit this project in the future and use better coding habits and some design patterns, like the OOP strategy pattern for the brush modes."
---