---
layout: post
title: "Sorry You're Dead"
date: 2026-02-13
private: false
category: game
featured: true
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589984/Sorry_Youre_Dead_Gameplay_s07oar.webp"
description: "I'm working in a 6-person group in my Game Design Studio 1 class to make a 2D Stardew-inspired game set in the zombie apocalypse. I was assigned the environment artist role. I lean on systems that create better results than I could by hand alone, technical art at its core. Here that meant a dual-grid tile system and a shader for overlay textures that give nearly infinite visual variety with almost no extra cost or draw calls."

details:
  Programs Used: "Aseprite, Godot"

toc:
  - label: "Dual Grid System"
    id: "dual-grid"
  - label: "Atlas Mapper"
    id: "atlas-mapper"
    sub: true
  - label: "Set-up & Functions"
    id: "set-up-params"
    sub: true
  - label: "Tiles & Shader"
    id: "tiles-shader"
  - label: "Grass & Dirt"
    id: "grass-dirt"
    sub: true
  - label: "Wall Tiles"
    id: "wall-tiles"
  - label: "Final Note"
    id: "final-note"

sections:
  - title: "The"
    accent: "Dual Grid"
    label: "Tile System"
    id: "dual-grid-section"
    blocks:
      - type: text
        id: "dual-grid"
        title: "Dual Grid System"
        paragraphs:
          - "The first step was to create a dual-grid system: a secondary tile grid offset by half a tile that purely holds the visual tiles. That way I only have to paint placeholder tiles in the editor, and at runtime they get replaced with the correct combination of 4 visual tiles and offset into place. A typical tilesheet might use somewhere around 47 tiles; this system only requires 15."

      - type: image
        id: "tilesheet-layout"
        title: "Tilesheet Layout"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773590009/Sorry_Youre_Dead_Example_Tilesheet_h2iu6f.webp"
        alt: "Tilesheet for dual grid system, 15 tiles plus placeholder (bottom left)"
        description: "Here's the tilesheet needed for every basic tile look using the dual grid system. There are 15 different tiles plus a placeholder (bottom left)."

      - type: image
        id: "godot-editor"
        title: "Godot Editor View"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773590004/Sorry_Youre_Dead_Example_Tiles_1_pkb3uy.webp"
        alt: "Tile Map in Godot editor with placeholder tiles"
        description: "In Godot, the Tile Map node lets you paint tiles from tilesheets you upload. I only have to paint the placeholder tiles since the system isn't running in the editor yet."

      - type: image
        id: "in-game-view"
        title: "In-Game View"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773590008/Sorry_Youre_Dead_Example_Tiles_2_caxlel.webp"
        alt: "Tiles replaced with correct visual tiles at runtime"
        description: "When I run the game, the tiles automatically get replaced with the correct combination of 4 visual tiles, then offset to correct the placement. This allows for significantly fewer tiles being hand drawn — a typical tilesheet might use around 47, while this system only requires 15."

      - type: image
        id: "side-by-side"
        title: "Side By Side"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589989/Sorry_Youre_Dead_tile_example_godot_stubmu.webp"
        alt: "Placeholder tile vs 4 corner tiles offset by half"
        description: "How it looks in action. The single placeholder tile on the left gets replaced with 4 corner tiles on the right, offset by half a tile."

      - type: code
        id: "atlas-mapper"
        title: "Atlas Mapper"
        lang: gdscript
        description: "To start, I had to define a dictionary that takes the current tile and its neighbors and returns the atlas coordinates for each visual tile type."
        code: |
          ## Atlas coords for the 4x4 tilesheet.
          const TILE_COORDS = {
          	[false, false, false, false]: Vector2i(0,3), # No tile
          	[true, true, true, true]: Vector2i(2,1), # Full Tile
          	[true, false, false, false]: Vector2i(3,3), # Outward Corner BR
          	[false, true, false, false]: Vector2i(0,2), # Outward Corner BL
          	[false, false, true, false]: Vector2i(0,0), # Outward Corner TR
          	[false, false, false, true]: Vector2i(1,3), # Outward Corner TL
          	[false, true, true, true]: Vector2i(1,1), # Inward Corner TR
          	[true, false, true, true]: Vector2i(2,0), # Inward Corner TL
          	[true, true, false, true]: Vector2i(2,2), # Inward Corner BL
          	[true, true, true, false]: Vector2i(3,1), # Inward Corner BR
          	[false, true, false, true]: Vector2i(1,0), # Straight L
          	[true, false, true, false]: Vector2i(3,2), # Straight R
          	[false, false, true, true]: Vector2i(3,0), # Straight T
          	[true, true, false, false]: Vector2i(1,2), # Straight B
          	[true, false, false, true]: Vector2i(0,1), # Connected Corner RL
          	[false, true, true, false]: Vector2i(2,3), # Connected Corner LR
          }

      - type: image
        id: "atlas-mapper-visual"
        title: "Atlas Mapper Visual"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589989/Sorry_Youre_Dead_tile_example_diagram_fkxrgo.webp"
        alt: "How top-left corner tile is calculated from 2x2 section"
        description: "This example shows how it calculates for the top-left corner tile. It checks a 2×2 section and returns true or false if a tile exists there. Each tile type (grass, dirt, etc.) lives on a different tile map layer so I only need to care whether a tile exists, not what type it is."

      - type: code
        id: "set-up-params"
        title: "Set-up Parameters"
        lang: gdscript
        description: "NEIGHBORS is a cache for quickly finding a tile's neighbors to cut down on verbosity later. tile_data stores the tile map's state before we replace it with the visual tiles — we need to save this ourselves since we're overwriting the actual tile map."
        code: |
          ## Cached values for neighboring tiles.
          const NEIGHBORS: Array[Vector2i] = [
          	Vector2i(0,0),
          	Vector2i(1,0),
          	Vector2i(0,1),
          	Vector2i(1,1),
          ]
          ## Dictionary that holds the real data of all tiles.
          var tile_data: Dictionary[Vector2i, Vector2i]

      - type: code
        id: "reference-tile"
        title: "Reference & Empty Tile"
        lang: gdscript
        description: "Atlas coords for the editor placeholder and for error handling. Gives some flexibility if I change the tilesheet layout later."
        code: |
          ## Atlas coords for the editor placeholder tile
          const REFERENCE_TILE := Vector2i(0, 3)
          ## Atlas coords for error handling
          const EMPTY_TILE := Vector2i(-1, -1)

      - type: code
        id: "ready"
        title: "_ready()"
        lang: gdscript
        description: "_ready() runs when the tile map node is fully ready on game load. I added early return safety checks to make sure the tile atlas actually exists so the system doesn't break later. Then it loops through every existing tile, stores its data in tile_data, replaces each with its visual counterpart, and finally offsets the whole map by half a tile to realign it."
        code: |
          func _ready() -> void:
          	if !tile_set:
          		push_error(name + ": tile set is missing!")
          		return
          	elif tile_set.get_source_count() == 0:
          		push_error(name + ": tile map has no tile atlas!")
          		return
          	for coords in get_used_cells():
          		var atlas_coords := get_cell_atlas_coords(coords)
          		tile_data[coords] = atlas_coords
          	for coords in tile_data:
          		_setDisplayTile(coords)
          	position.x = -(tile_set.tile_size.x * 0.5)
          	position.y = -(tile_set.tile_size.y * 0.5)

      - type: code
        id: "set-display-tile"
        title: "_setDisplayTile()"
        lang: gdscript
        description: "_setDisplayTile() takes the current tile coords and loops through its 4 neighbors (in positive order, starting upper left) and sets each to a calculated atlas coordinate. Every physical tile is composed of 4 visual tiles, so we need to loop through all of them."
        code: |
          ## Loops over 4 corresponding tiles & sets the proper tile sprite
          func _setDisplayTile(coords: Vector2i) -> void:
          	for offset in NEIGHBORS:
          		set_cell(coords + offset, 0, _calculateDisplayTile(coords + offset))

      - type: code
        id: "calculate-display-tile"
        title: "_calculateDisplayTile()"
        lang: gdscript
        description: "_calculateDisplayTile() checks the neighbors of the current visual tile in reverse order to look at the physical grid instead of the visual one. It sends the true/false results to TILE_COORDS to find the correct atlas coordinates and returns that back to _setDisplayTile()."
        code: |
          ## Calculates what sprite each tile should be based on neighboring tiles.
          func _calculateDisplayTile(coords: Vector2i) -> Vector2i:
          	var bottom_right := _validateTile(coords - NEIGHBORS[0])
          	var bottom_left := _validateTile(coords - NEIGHBORS[1])
          	var top_right := _validateTile(coords - NEIGHBORS[2])
          	var top_left := _validateTile(coords - NEIGHBORS[3])
          	return TILE_COORDS[[top_left, top_right, bottom_left, bottom_right]]

      - type: code
        id: "validate-tile"
        title: "_validateTile()"
        lang: gdscript
        description: "_validateTile() checks if the tile's atlas coords both exist and match the placeholder. Using the placeholder for strictness is optional — just checking existence would work — but I like having that extra validation in there."
        code: |
          ## Checks if the tile is an appropriate type and exists.
          func _validateTile(coords: Vector2i) -> bool:
          	var atlas_coords = tile_data.get(coords, EMPTY_TILE)
          	if atlas_coords == EMPTY_TILE:
          		return false
          	if atlas_coords != REFERENCE_TILE:
          		push_error("Invalid placeholder tile at " + str(coords))
          	return atlas_coords == REFERENCE_TILE

  - title: "Tiles &"
    accent: "Shader"
    label: "Overlays & Variety"
    id: "tiles-shader"
    blocks:
      - type: text
        id: "grass-intro"
        title: "Grass Tiles"
        paragraphs:
          - "I'm going with 32×32 pixel tiles. Creating the grass tilesheet was quite a process, but I think it turned out well. The shader lets me select a mask color and apply an overlay texture on the tiles; using world coordinates we can make large tileable textures that span multiple tiles."

      - type: image
        id: "grass-tilesheet"
        title: "Grass Tile-sheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589984/Sorry_Youre_Dead_Grass_Tilesheet_lnwzpp.webp"
        alt: "32x32 grass tilesheet"
        description: "The 32×32 pixel grass tilesheet."

      - type: image
        id: "grass-in-game"
        title: "In-Game Look (Base)"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589980/Sorry_Youre_Dead_Grass_1_Example_jvmdqd.webp"
        alt: "Grass tiles in game before overlay"
        description: "How it looks in game with just the base tiles. Pretty bland, so the next step was the overlay shader."

      - type: code
        id: "shader-setup"
        title: "Shader Set-up"
        lang: glsl
        description: "Sets up the various parameters: mask color, scale, seed for detail placement, overlay and detail textures."
        code: |
          varying vec2 world_position;
          group_uniforms Settings;
          uniform float scale = 0.00625;
          uniform float mask_color_tolerance : hint_range(0.0, 1.0, 0.1) = 0.01;
          uniform float detail_size = 16.0;
          uniform int seed = 12345;
          group_uniforms Texture_Overlay;
          uniform sampler2D texture_overlay: repeat_enable, filter_nearest;
          uniform vec4 mask : source_color = vec4(1.0, 1.0, 1.0, 1.0);
          group_uniforms Texture_Overlay.Details;
          uniform bool enable_detail = true;
          uniform sampler2D detail_texture: repeat_enable, filter_nearest;
          uniform float spawn_rate: hint_range(0.0, 1.0, 0.01) = 0.3;

      - type: code
        id: "prng"
        title: "Pseudo Random Number Generator"
        lang: glsl
        description: "Seed-based PRNG since GLSL doesn't have one built in. Found this one online — it does the job."
        code: |
          uint hash(uint x) {
              x = ((x >> 16u) ^ x) * 0x45d9f3bu;
              x = ((x >> 16u) ^ x) * 0x45d9f3bu;
              x = (x >> 16u) ^ x;
              return x;
          }
          float random_hash(vec2 st) {
              uvec2 ui = uvec2(st);
              uint h = hash(ui.x ^ hash(ui.y ^ uint(seed)));
              return float(h) / float(0xffffffffu);
          }

      - type: code
        id: "apply-overlay"
        title: "apply_overlay()"
        lang: glsl
        description: "Helper function for applying the texture onto the tile, since it gets repeated a few times. The 'return true' lets me mark a section as occupied for the detail placement check later."
        code: |
          bool apply_overlay(inout vec4 color, sampler2D tex) {
          	vec4 overlay = texture(tex, world_position * scale);
          	color = mix(color, overlay, overlay.a);
          	return true;
          }

      - type: code
        id: "vertex-shader"
        title: "vertex()"
        lang: glsl
        description: "Sets up world position coordinates for the overlay textures."
        code: |
          void vertex(){
          	world_position = (MODEL_MATRIX * vec4(VERTEX, 0.0, 1.0)).xy;
          }

      - type: code
        id: "fragment-shader"
        title: "fragment()"
        lang: glsl
        description: "Draws the overlay on the tiles. Detail tiles are half the size of real tiles so there are 4 per tile, each driven by the PRNG — that gives way more variation per tile. The 'occupied' check prevents multiple detail types from landing in the same spot."
        code: |
          void fragment() {
          	if (COLOR.a <= 0.1) discard;
          	vec4 original_color = COLOR;
          	vec2 tile_coord = floor(world_position / detail_size);
          	float rand = random_hash(tile_coord + vec2(float(seed)));
          	if (distance(COLOR, mask) <= mask_color_tolerance) {
          		apply_overlay(COLOR, texture_overlay);
          		bool occupied = false;
          		if (enable_detail && !occupied && rand < spawn_rate)  occupied = apply_overlay(COLOR, detail_texture);
          	}
          }

      - type: image
        id: "grass-overlay-tex"
        title: "Grass Overlay Texture"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589983/Sorry_Youre_Dead_Grass_Overlay_kelz8o.webp"
        alt: "5x5 tile grass overlay texture"
        description: "The grass overlay texture, 5×5 tiles large (160×160 px)."

      - type: image
        id: "grass-with-overlay"
        title: "Grass With Overlay"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589992/Sorry_Youre_Dead_tile_texture_overlay_1_ft6kqf.webp"
        alt: "Grass with shader overlay applied"
        description: "How it looks with the shader applied, using the base green of the tile as the mask."

      - type: gallery
        id: "grass-flowers-decor"
        title: "Grass & Flowers Decor"
        columns: 2
        description: "Grass blades and flowers for the grass tiles. Same 5×5 size with different 16×16 variations per square. The shader randomly selects which sections to render, controlled by the seed."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589981/Sorry_Youre_Dead_Grass_Details_pesemo.webp"
            alt: "Grass blades decor"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589979/Sorry_Youre_Dead_Flower_Details_ra2ijg.webp"
            alt: "Flowers decor"

      - type: image
        id: "shader-editor-gif"
        title: "Shader Editor GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589988/Sorry_Youre_Dead_Shader_v1kfwb.webp"
        alt: "GIF of shader in Godot editor"
        description: "Short GIF of how the shader works in the editor."
        animated: true

      - type: image
        id: "grass-final"
        title: "Grass In-Game Look"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589982/Sorry_Youre_Dead_Grass_Finished_dbew93.webp"
        alt: "Grass in game with shader and dual grid"
        description: "Grass tiles in-game with both the shader and dual grid system."

      - type: text
        id: "dirt-intro"
        title: "Dirt Tiles"
        paragraphs:
          - "I repeated the process for dirt to get more visual variety. The overlay set has pebbles, grass tufts, and the dirt texture. Getting the dirt texture right took a while, probably 3 hours of testing different methods before something looked presentable."

      - type: image
        id: "dirt-tilesheet"
        title: "Dirt Tile-sheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773590001/Sorry_Youre_Dead_Dirt_Tilesheet_uhxd26.webp"
        alt: "Dirt tilesheet"
        description: "Here's the dirt tilesheet. I Tried to make the dirt look 'dirty' and crumbly."

      - type: gallery
        id: "dirt-overlays"
        title: "Dirt Overlay Textures"
        columns: 3
        description: "Pebbles, grass tufts, and the dirt overlay texture."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773590000/Sorry_Youre_Dead_Dirt_Texture_a17vmq.webp"
            alt: "Dirt overlay texture"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589986/Sorry_Youre_Dead_Pebbles_Decor_ginvlj.webp"
            alt: "Pebbles decor"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589992/Sorry_Youre_Dead_Tufts_Decor_qucnu8.webp"
            alt: "Grass tufts decor"

      - type: image
        id: "dirt-in-game"
        title: "Dirt In-Game Look"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589999/Sorry_Youre_Dead_Dirt_Finished_vj2jvj.webp"
        alt: "Dirt with all elements in game"
        description: "Dirt with all the elements put together."

  - title: "Wall"
    accent: "Tiles"
    label: "Setup & Collision"
    id: "wall-tiles"
    blocks:
      - type: text
        id: "wall-premise"
        title: "Walls"
        paragraphs:
          - "The premise is simple but took a bit to wrap my head around: elongate each tile by however tall we want the wall. For this game I went with walls 2.5 tiles tall. The actual tile size is 3.5, with 0.5 for the top face of the wall and 0.5 for the wall's shadow at the bottom or sides. In Godot I set the tile's origin to the bottom 32×32 region to match normal tiles, then set up collisions (shown in blue) confined to that bottom region."

      - type: image
        id: "wall-tilesheet"
        title: "Wall Tile-sheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589994/Sorry_Youre_Dead_Wall_Tilesheet_w4bwbd.webp"
        alt: "Wall tiles 2.5 tiles tall"
        description: "Walls are 2.5 tiles tall; tile size is 3.5 with 0.5 for the top face and 0.5 for the shadow."

      - type: image
        id: "wall-collisions"
        title: "Collisions"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589993/Sorry_Youre_Dead_Wall_Collisions_gj4kmo.webp"
        alt: "Collision shapes in blue on wall tiles"
        description: "Collisions set in Godot, confined to the bottom 32×32 region to line up with normal tiles."

      - type: image
        id: "all-together"
        title: "All Put Together"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589987/Sorry_Youre_Dead_Scene_Example_tmumie.webp"
        alt: "All tiles in one scene"
        description: "All the tiles together in one scene."

      - type: image
        id: "gameplay-gif"
        title: "Gameplay GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589984/Sorry_Youre_Dead_Gameplay_s07oar.webp"
        alt: "Gameplay clip"
        description: "Quick look at the game in action."
        animated: true

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "This is still an on-going project. We're only a few weeks in, so expect more added to this post later. That aside, coding the dual grid system and learning shaders to get this tile-variation mechanic working was pretty fun and a really good learning experience."
---