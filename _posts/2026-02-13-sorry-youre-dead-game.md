---
layout: post
title: "Sorry You're Dead"
date: 2026-02-13
private: false
category: game
featured: true
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309893/Sorry_Youre_Dead_Compound_va2mck.webp"
description: "I'm working in a 6-person group in my Game Design Studio 1 class to make a 2D Stardew-inspired game set in the zombie apocalypse. I was assigned the environment artist role. I lean on systems that create better results than I could by hand alone, which is technical art at its core. Here that meant creating various systems like a dual-grid tile system and a shader for overlay textures that give nearly infinite visual variety with almost no extra cost or draw calls, shaders for various elements like fire and water, and much more."

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
  - label: "Tiles & Shaders"
    id: "tiles-shaders"
  - label: "Grass Tiles"
    id: "grass-intro"
    sub: true
  - label: "All Tiles"
    id: "all-of-the-tiles"
    sub: true
  - label: "Fire Shader"
    id: "fire-shader"
    sub: true
  - label: "Foliage Sway Shader"
    id: "foliage-sway-shader"
    sub: true
  - label: "The Compound"
    id: "compound-scene"
    sub: true
  - label: "Water Shader"
    id: "water-scene"
    sub: true
  - label: "Systems & UI"
    id: "systems-overview"
  - label: "Scene Loader"
    id: "scene-loader"
    sub: true
  - label: "Teleportation System"
    id: "teleporter-system"
    sub: true
  - label: "Dialogue System"
    id: "dialogue-system"
    sub: true
  - label: "Start Screen UI"
    id: "start-screen-ui"
    sub: true
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
    accent: "Shaders"
    label: "Overlays & Variety"
    id: "tiles-shaders"
    blocks:
      - type: text
        id: "grass-intro"
        title: "Grass Tiles"
        paragraphs:
          - "To start with the actual artwork for this game, I'm going to start with a grass tilesheet, and I decided to go with 32×32 pixel tiles. Creating the grass tilesheet was quite a process, but I think it turned out well. The shader lets me select a mask color and apply an overlay texture on the tiles; using world coordinates we can make large tileable textures that span multiple tiles."

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
        id: "all-of-the-tiles"
        title: "All of the Tiles"
        paragraphs:
          - "I repeated the process for several more tiles to get more visual variety. I added more decorator textures depending on the type of tile, but it's mostly just grass and pebble varients. The water tile was created with shaders, so we'll get into that later"

      - type: image
        id: "all-of-the-tilesheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309899/Sorry_Youre_Dead_Tile_Types_szi5uf.webp"
        alt: "All Tiles"

      - type: image
        id: "road-markings"
        title: "Some Tiles in Action"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309897/Sorry_Youre_Dead_Road_vnwiv9.webp"
        alt: "Road Tiles in game"
        description: "Here's how some tiles look together to create a road. I made a separate road markings tilesheet so I could decorate the roads."

      - type: image
        id: "small-foliage"
        title: "Small Foliage"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309895/Sorry_Youre_Dead_Foliage_votepq.webp"
        alt: "Small Foliage"
        description: "I created a tilesheet of large grass types & gave them slight color & position differences so it naturally creates variety when placed in game. Eventually I'll add more foliage types like bushes and cattails."

      - type: gallery
        id: "tree-sprites"
        title: "Tree Sprites"
        columns: 2
        description: "Aspen & Oak trees. I split their sprites into 3 textures each - back leaves, trunk, and front leaves. This allows me to animate the leaves later via shaders."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309891/Sorry_Youre_Dead_Aspen_ajexpf.webp"
            alt: "Aspen sprite"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309896/Sorry_Youre_Dead_Oak_m6nmgd.webp"
            alt: "Oak sprite"
    
      - type: image
        id: "props-tilesheet"
        title: "Props Tilesheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309894/Sorry_Youre_Dead_Decorations_sjf8dq.webp"
        alt: "Props Tilesheet"
        description: "I created a tilesheet of various props to decorate the scenes. I tried to make them fit the apocalyptic aesthetic we're going for."

      - type: gallery
        id: "building-sprites"
        title: "Building Sprites"
        columns: 3
        description: "I created 3 building sprites for the starting area of the game, called the Compound. There is an Armory, Medbay, and Sleeping Quarters"
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777312729/Sorry_Youre_Dead_Armory_pqvoho.webp"
            alt: "Armory sprite"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777312724/Sorry_Youre_Dead_Medbay_pvnqgu.webp"
            alt: "Medbay sprite"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777312727/Sorry_Youre_Dead_Sleeping_Quarters_g59fol.webp"
            alt: "Sleeping Quarters sprite"

      - type: text
        id: "fire-shader"
        title: "Fire Shader"
        paragraphs:
          - "I created a simple shader to render pixelated flames with customizable settings & framerate."

      - type: image
        id: "fire-shader-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309888/Sorry_Youre_Dead_Fire_ebryso.webp"
        alt: "GIF of the fire"
        animated: true

      - type: code
        id: "fire-shader-parameters"
        lang: glsl
        title: "Uniforms"
        description: "To start, I set up a bunch of uniform parameters to customize the flame inside the inspector."
        code: |
          shader_type canvas_item;

          uniform sampler2D noise_tex : repeat_enable, filter_nearest;

          uniform vec4 color_outer  : source_color = vec4(0.56, 0.16, 0.09, 1.0);
          uniform vec4 color_middle : source_color = vec4(0.87, 0.48, 0.15, 1.0);
          uniform vec4 color_inner  : source_color = vec4(1.00, 0.98, 0.35, 1.0);

          uniform vec2 scroll_speed = vec2(0.0, 0.4);
          uniform int fps : hint_range(1, 60) = 12;

          uniform float curve_steepness : hint_range(0.1, 4.0) = 0.4;
          uniform float height_falloff : hint_range(0.5, 5.0) = 2.1;
          uniform float edge_flicker : hint_range(0.0, 2.0) = 0.6;
          uniform float base_wobble : hint_range(0.0, 1.0) = 0.6;

          varying vec2 pixel_res;
          varying vec2 world_node_pos;

      - type: code
        id: "fire-shader-vertex-fragment"
        lang: glsl
        title: "Vertex & Fragment"
        description: "Here are the vertex and fragment functions. The vertex graves the nodes world position & dimensions so the fragment can use screen space coordinates. The fragment shader starts by snapping time to the nearest FPS, then snaps the UVs to be pixel perfect. It then samples a noise texture I made & offsets it by the scrollspeed to actually animate it. It then makes sure the flame tapers off as it rises, and rounds off the bottom so it's not just a hard edge. The last bit is just setting up the posterized color bands to give it that iconic flame look."
        code: |
          void vertex() {
            pixel_res = vec2(
              length(MODEL_MATRIX[0].xyz),
              length(MODEL_MATRIX[1].xyz)
            );
            world_node_pos = (MODEL_MATRIX * vec4(0.0, 0.0, 0.0, 1.0)).xy;
          }

          void fragment() {
            float f_fps = float(fps);
            float stepped_time = floor(TIME * f_fps) / f_fps;
            vec2 grid_uv = floor(UV * pixel_res + vec2(0.0, 0.5)) / pixel_res;
            
            vec2 scroll = stepped_time * scroll_speed;
            float noise_val = texture(noise_tex, grid_uv + (world_node_pos * 0.1) + scroll).r;
            
            float local_y = grid_uv.y - 0.15; 
            float x_dist = (grid_uv.x - 0.5) * 2.2;
            float curve_function = 1.0 - (pow(x_dist, 2.0) / curve_steepness) + (x_dist * x_dist * 1.5);
            
            float vertical_weight = (1.0 - grid_uv.y) + base_wobble;
            float shape_influence = curve_function * (local_y * height_falloff);
            float dynamic_shape = shape_influence + (noise_val - 0.5) * edge_flicker * vertical_weight;
            
            float bottom_round = smoothstep(1.0, 0.8, grid_uv.y);
            dynamic_shape *= bottom_round;
            
            float outer_zone  = step(0.5, dynamic_shape);
            float middle_zone = step(0.7, dynamic_shape);
            float inner_zone  = step(1.0, dynamic_shape);
            
            vec4 final_color = vec4(0.0);
            
            if (inner_zone > 0.1) {
              final_color = color_inner;
            } else if (middle_zone > 0.1) {
              final_color = color_middle;
            } else if (outer_zone > 0.1) {
              final_color = color_outer;
            } else {
              discard;
            }
            
            COLOR = final_color;
          }

      - type: text
        id: "foliage-sway-shader"
        title: "Foliage Sway Shader"
        paragraphs:
          - "I created a shader to sway the foliage & simulate wind. I wouldve liked for it to be pixel perfect, but I couldn't get this to work through the fragment shader so I opted to just do a vertex offset."

      - type: image
        id: "foliage-sway-shader-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777314017/Sorry_Youre_Dead_Foliage_Sway_glfkyt.webp"
        alt: "GIF of the foliage sway"
        animated: true

      - type: code
        id: "fire-shader-parameters"
        lang: glsl
        title: "Uniforms & Vertex"
        description: "I set up a few uniforms to control the shader through the inspector. Then in the vertex, I first defined the actual local UVs to work with since I would be applying this to the foliage tilesheet, we cant just grab the base UVs since that would be the entire tilesheet. Then I snapped the time to the FPS, and did a pretty basic sway animation using a sin wave, and making sure the base of the sprite didnt sway to keep the sprites 'rooted'."
        code: |
          shader_type canvas_item;

          uniform float speed = 2.0;
          uniform float strength = 4.0;
          uniform float detail = 0.05;
          uniform float fps = 12.0;

          const vec2 local_uvs[4] = {vec2(0,0), vec2(0,1), vec2(1,1), vec2(1,0)};

          void vertex() {
            vec2 local_uv = local_uvs[VERTEX_ID % 4];
            float weight = 1.0 - local_uv.y;

            float stepped_time = floor(TIME * fps) / fps;
            
            vec2 world_pos = (MODEL_MATRIX * vec4(VERTEX, 0.0, 1.0)).xy;
            float world_offset = (world_pos.x + world_pos.y) * detail;
            
            float sway = sin(stepped_time * speed + world_offset);
            sway += sin(stepped_time * speed * 1.5 + world_offset * 0.8) * 0.4;
            
            float final_offset = round((sway / 1.4) * strength * weight);
            
            VERTEX.x += final_offset;
          }

      - type: text
        id: "compound-scene"
        title: "The Compound"
        paragraphs:
          - "Now that we've gone over pretty much everything for the environment, let's look at it all put together in the Compound Scene"

      - type: image
        id: "compound-scene-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309893/Sorry_Youre_Dead_Compound_va2mck.webp"
        alt: "GIF of the Compound"
        animated: true

      - type: text
        id: "water-scene"
        title: "Water Shader"
        paragraphs:
          - "For the final thing to go over in the environment art portion, we have the water tile shader. Water is only found in the Forest scene, so I didn't include it till now."

      - type: image
        id: "water-shader-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309889/Sorry_Youre_Dead_Lake_fy3aww.webp"
        alt: "GIF of the Water Shader"
        animated: true

      - type: code
        id: "water-shader-parameters"
        lang: glsl
        title: "Uniforms"
        description: "I set up a bunch of uniforms to control the shader through the inspector and to set up the noise maps."
        code: |
          shader_type canvas_item;

          varying vec2 world_position;

          uniform float mask_color_tolerance = 0.01;
          uniform float framerate = 8.0;

          uniform vec4 mask_color : source_color;
          uniform vec4 line_color : source_color;
          uniform vec4 highlight_color : source_color;
          uniform vec4 depth_color : source_color;

          uniform sampler2D voronoi_texture : repeat_enable, filter_nearest;
          uniform sampler2D distortion_noise : repeat_enable, filter_nearest;
          uniform sampler2D detail_texture : repeat_enable, filter_nearest;

          uniform float distortion_strength : hint_range(0.0, 0.1) = 0.02;
          uniform vec2 speed = vec2(0.02, 0.01);
          uniform vec2 detail_speed = vec2(-0.01, 0.015);
          uniform vec2 wiggle_speed = vec2(0.05, 0.05);
          uniform vec2 shadow_offset = vec2(0.005, 0.005);

      - type: code
        id: "water-shader-vertex-fragment"
        lang: glsl
        title: "Vertex & Fragment"
        description: "In the vertex I simply just grab the world position. Then in the fragment, it looks like a giant mess but its actually quite simple. It literally just layers the noise maps to create a stylized water look, and then animates it. Then at the end it just layers color parameters to get the final look of the pixel."
        code: |
          void vertex() {
              world_position = (MODEL_MATRIX * vec4(VERTEX, 0.0, 1.0)).xy;
          }

          void fragment() {
              vec4 original_pixel = texture(TEXTURE, UV);
              if (original_pixel.a < 0.1) discard;
              vec4 current_pixel = original_pixel;

              if (distance(current_pixel.rgb, mask_color.rgb) <= mask_color_tolerance) {
                  float snapped_time = floor(TIME * framerate) / framerate;
                  vec2 pixel_uv = floor(world_position) / 128.0;
                  
                  vec2 wiggle_uv = pixel_uv + (wiggle_speed * snapped_time);
                  vec2 distortion = texture(distortion_noise, wiggle_uv).rg;
                  
                  vec2 base_uv = pixel_uv + (speed * snapped_time);
                  vec2 final_uv = base_uv + (distortion * distortion_strength);
                  
                  vec2 shadow_uv = final_uv + shadow_offset;
                  vec2 d_uv = pixel_uv + (detail_speed * snapped_time) + (distortion * (distortion_strength * 0.5));
                  vec2 spec_uv = d_uv + vec2(0.13, 0.07);

                  vec4 shadow_voronoi = texture(voronoi_texture, shadow_uv);
                  vec4 voronoi_col = texture(voronoi_texture, final_uv);
                  vec4 detail_col = texture(detail_texture, d_uv);
                  vec4 spec_col = texture(detail_texture, spec_uv);

                  current_pixel.a = 0.45;

                  if (shadow_voronoi.r > 0.1) {
                      current_pixel.rgb = mix(current_pixel.rgb, depth_color.rgb, 0.4);
                      current_pixel.a = 0.5;
                  }
              if (spec_col.r > 0.65) {
                      current_pixel.rgb = mix(current_pixel.rgb, highlight_color.rgb, 1.0);
                      current_pixel.a = 0.8;
                  }
                  if (voronoi_col.r > 0.1) {
                      current_pixel.rgb = mix(current_pixel.rgb, line_color.rgb, 0.3);
                      current_pixel.a = 0.5;
                      if (voronoi_col.r > 0.6) {
                          current_pixel.rgb = mix(current_pixel.rgb, highlight_color.rgb, 0.6);
                          current_pixel.a = 0.5;
                      }
                  }
                  if (detail_col.r > 0.1) {
                      current_pixel.rgb = mix(current_pixel.rgb, highlight_color.rgb, 0.3);
                  }
              }    
              COLOR = current_pixel;
          }

  - title: "Systems"
    accent: "and UI"
    label: "Various Gameplay Elements"
    id: "systems-&-ui"
    blocks:
      - type: text
        id: "systems-overview"
        title: "Overview"
        paragraphs:
          - "I coded a lot of little systems & ui for this game, but I'll only go over the large ones like the dialogue system, teleportation system, and the start screen UI."

      - type: code
        id: "scene-loader"
        lang: gdscript
        title: "Scene Loader"
        description: "I created a scene loader script since a major feature of the game is going to different areas, so a decently optimized scene loader was a must. It is an autoload singleton for use across the entire project. The way it works is by loading a target scene in the background threads by being passed a StringName path. We also preload a loading screen, which is just a simple fade-to-black UI that covers the entire screen. We also prompt the Game, another autoload singleton, to refresh it's references upon loading. This set's a singular global reference point for things like Game.current_scene, and Game.player, which allows me to bypass more scene tree lookups and have a ready to go reference to important game elements. You'll also notice we have some teleporter related code in here, namely the function for it as well as things like _spawn_target variables. Those will be used by the teleportation system."
        code: |
          #Scene loader autoload
          extends Node

          signal load_finished

          var _scene_path: StringName
          var _spawn_target: StringName
          var _use_sub_threads: bool = true

          const LOADING_SCREEN = preload("uid://dfb7j0pt71h85")

          func _ready() -> void:
            set_process(false)

          func load_scene(path: StringName, spawn_target: StringName = "") -> void:
            _scene_path = path
            _spawn_target = spawn_target
            
            var screen = LOADING_SCREEN.instantiate()
            add_child(screen)
            await screen.transition_finished
            
            _start_load()

          func reload_scene() -> void:
            load_scene(get_tree().current_scene.scene_file_path)

          func _start_load() -> void:
            var state = ResourceLoader.load_threaded_request(_scene_path, "", _use_sub_threads)
            if state == OK:
              set_process(true)

          func _process(_delta: float) -> void:
            var progress = []
            var status = ResourceLoader.load_threaded_get_status(_scene_path, progress)
            
            match status:
              ResourceLoader.THREAD_LOAD_INVALID_RESOURCE, ResourceLoader.THREAD_LOAD_FAILED:
                set_process(false)
              ResourceLoader.THREAD_LOAD_LOADED:
                set_process(false)
                var packed = ResourceLoader.load_threaded_get(_scene_path)
                get_tree().change_scene_to_packed.call_deferred(packed)
                
                await get_tree().process_frame
                Game.load_references()
                _set_player_spawn()
                load_finished.emit()

          func _set_player_spawn() -> void:
            if _spawn_target.is_empty():
              return
            
            var teleporter = TeleporterRegistry.get_teleporter(_spawn_target)
            if teleporter == null:
              push_warning("SceneLoader: spawn target '%s' not found" % _spawn_target)
              return
            
            Game.player.global_position = teleporter.global_position
            _spawn_target = ""

      - type: text
        id: "teleporter-system"
        title: "Teleportation System"
        paragraphs:
          - "Teleporters are pretty simple upon first glance, just move the player's position from one point to another. The complexity of this comes from the cross-scene teleportation and needing a way to dynamically connect multiple teleporters (since I want to avoid hard coded, non-reusable code), meaning we don't have direct access to a teleporter until the targeted scene is fully loaded, which was already shown to be set up inside the scene loader."

      - type: code
        id: "teleporter-registry"
        lang: gdscript
        title: "Teleporter Registry"
        description: "This is the teleporter registry, a static class that simply allows for the registration and holding of references to every teleporter. I opted for this system so that we dont need to do a scene tree lookup every time we want to find a specific teleporter, we just simply inquire the registry if it exists, and teleporters self-register themselves in their _ready() function."
        code: |
          class_name TeleporterRegistry
          extends RefCounted

          static var registries: Dictionary[StringName, Node2D] = {}

          static func register(node: Node2D) -> void:
            var key: StringName = node.name.to_lower()
            registries[key] = node

          static func unregister(node: Node2D) -> void:
            var key: StringName = node.name.to_lower()
            registries.erase(key)

          static func get_teleporter(_key: StringName) -> Node2D:
            var key: StringName = _key.to_lower()
            if !registries.has(key):
              return null
            
            return registries[key]

      - type: code
        id: "teleporter-component"
        lang: gdscript
        title: "Teleporter Component"
        description: "This is the teleporter component, aka what the player actually interacts with. To set this up, the developer just drags it into the scene and gives it a name, then sets the target teleporter's name and the target scene's path, and the code will handle the rest. This component is actually quite simple, it just prompts the user to teleport to the target scene when they enter the Area2D, and if they press the keybind it launches the scene loader."
        code: |
          #teleporter
          extends Area2D

          @export var target_teleporter: StringName
          @export var target_scene: StringName
          var in_range: bool = false
          var prompt_text: String

          func _ready() -> void:
            prompt_text = "Press E to travel to the " + target_scene.get_file().get_basename()
            TeleporterRegistry.register(self)

          func _on_tree_exiting() -> void:
            TeleporterRegistry.unregister(self)

          func _on_area_entered(area: Area2D) -> void:
            if area.owner != Game.player:
              return
            in_range = true
            Game.hud.prompt.text = prompt_text
            Game.hud.prompt_animation.stop()
            Game.hud.prompt_box.show()
            Game.hud.prompt_animation.play("prompt_transition")

          func _on_area_exited(area: Area2D) -> void:
            if area.owner != Game.player:
              return
            in_range = false
            Game.hud.prompt_animation.play_backwards("prompt_transition")
            await Game.hud.prompt_animation.animation_finished
            if !in_range:
              Game.hud.prompt_box.hide()

          func _unhandled_key_input(event: InputEvent) -> void:
            if in_range and event.is_action_pressed("interact"):
              SceneLoader.load_scene(target_scene, target_teleporter)

      - type: image
        id: "teleporter-gif"
        title: "Teleportation GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777311256/Sorry_Youre_Dead_Teleporter_gnie9i.webp"
        alt: "GIF of Teleportation System"
        description: "Here is the teleporter system in action. It does in fact work with multiple teleporters being connected to any other teleporter, though they can only be connected to one singular telporter destination."
        animated: true

      - type: text
        id: "dialogue-system"
        title: "Dialogue System"
        paragraphs:
          - "Next, we have the dialogue system. It's a basic proximity based dialogue box that lets you cycle through the lines of dialogue. The dialogue and NPC details are housed inside of a resource so we can easily reuse the same dialogue component with completely different dialogue, and even change it at run time if needed."

      - type: code
        id: "dialogue-resource"
        lang: gdscript
        title: "Dialogue Resource"
        description: "This is the dialogue resource, which let's you set the NPC portrait, name, name color, and an array of lines that auto-sets the max_lines value for quick lookup."
        code: |
          class_name Dialogue
          extends Resource

          @export var Character_Name: String = ""
          @export var Portrait: Texture2D
          @export var Name_Color: Color = Color.WHITE
          @export var Lines: Array[String] = []:
            set(value):
              Lines = value
              max_lines = value.size() - 1

          var current_line: int = 0
          var max_lines: int


      - type: code
        id: "dialogue-component"
        lang: gdscript
        title: "Dialogue Component"
        description: "This is the dialogue component, an Area2D node that prompts the user to initiate dialogue when in range, and then lets you cycle through the dialogue lines. There's no option based responses here since the main character can't talk, so it's purely one-sided conversation. We have two exported variables for inputting the dialogue resource, and another for the typing speed animation so the text doesnt just appear instantly. The rest of the code is basically just handling animations & state, and then of course the typing effects."
        code: |
          extends Area2D

          #region Variables
          @export var dialogue: Dialogue
          @export_custom(PROPERTY_HINT_NONE, "suffix:Chars/Sec") var type_speed: float = 30.0

          var _dialogue_showing: bool = false
          var _in_range: bool = false
          var _typing: bool = false
          var _prompt_text: String
          #region

          func _ready() -> void:
            _prompt_text = "Press E to speak to " + dialogue.Character_Name

          #region Signals
          func _on_area_entered(area: Area2D) -> void:
            if area.owner != Game.player:
              return
            _in_range = true
            _prompt_in()

          func _on_area_exited(area: Area2D) -> void:
            if area.owner != Game.player:
              return
            _in_range = false
            _reset()

          # Failsafe in case we inexplicably leave the scene, or scene resets.
          func _on_tree_exiting() -> void:
            _reset()
          #endregion

          #region Input
          func _unhandled_key_input(event: InputEvent) -> void:
            if !_in_range or !event.is_action_pressed("interact"):
              return
            
            # If we're still typing we skip to the full thing
            if _typing:
              _skip_typing()
              return
            
            if !_dialogue_showing:
              _start_dialogue()
              return
            
            # Continue or end dialogue
            if dialogue.current_line < dialogue.max_lines:
              dialogue.current_line += 1
              _type_line(dialogue.Lines[dialogue.current_line])
            else:
              _end_dialogue()
          #endregion

          #region Dialogue flow
          func _start_dialogue() -> void:
            _dialogue_showing = true
            dialogue.current_line = 0
            Game.hud.prompt.text = "Press E to continue..."
            _dialogue_in()
            _type_line(dialogue.Lines[0])

          func _end_dialogue() -> void:
            _dialogue_showing = false
            dialogue.current_line = 0
            Game.hud.prompt.text = _prompt_text
            _dialogue_out()

          func _reset() -> void:
            _typing = false
            _dialogue_showing = false
            dialogue.current_line = 0
            _prompt_out()
            _dialogue_out()
          #endregion

          #region Typing Effect
          func _type_line(line: String) -> void:
            _typing = true
            Game.hud.dialogue.text = ""
            for character in line:
              if !_typing:
                return  # Was skipped mid-type
              Game.hud.dialogue.text += character
              await get_tree().create_timer(1.0 / type_speed).timeout
            _typing = false

          func _skip_typing() -> void:
            _typing = false
            Game.hud.dialogue.text = dialogue.Lines[dialogue.current_line]
          #endregion

          #region Animations
          func _prompt_in() -> void:
            Game.hud.prompt.text = _prompt_text
            Game.hud.prompt_box.show()
            Game.hud.prompt_animation.stop()
            Game.hud.prompt_animation.play("prompt_transition")

          func _prompt_out() -> void:
            Game.hud.prompt_animation.stop()
            Game.hud.prompt_animation.play_backwards("prompt_transition")
            await Game.hud.prompt_animation.animation_finished
            if !_in_range:
              Game.hud.prompt_box.hide()

          func _dialogue_in() -> void:
            Game.hud.dialogue_name.text = dialogue.Character_Name
            Game.hud.dialogue_portrait.texture = dialogue.Portrait
            Game.hud.dialogue_name.label_settings.font_color = dialogue.Name_Color
            Game.hud.dialogue_box.show()
            Game.hud.dialogue_animation.stop()
            Game.hud.dialogue_animation.play("dialogue_transition")

          func _dialogue_out() -> void:
            Game.hud.dialogue_animation.stop()
            Game.hud.dialogue_animation.play_backwards("dialogue_transition")
            await Game.hud.dialogue_animation.animation_finished
            Game.hud.dialogue_box.hide()
          #endregion

      - type: image
        id: "dialogue-gif"
        title: "Dialogue GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777310669/Sorry_Youre_Dead_Dialogue_zwaksx.webp"
        alt: "GIF of Dialogue System"
        description: "Here is the dialogue system in action. It works between any number of NPCs. I also made the NPCs wander around in a short radius, and when you enter their 'interaction' radius they stop and turn to you."
        animated: true

      - type: text
        id: "start-screen-ui"
        title: "Start Screen"
        paragraphs:
          - "Finally, we have the start screen UI. I wont get into the code since its literally just animating screens and buttons, but I'm pretty happy with how it turned out stylistically. As you will see though, we currently do not have anything in the settings menu yet, which I will hopefully get set up soon."
        
      - type: image
        id: "start-screen-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309890/Sorry_Youre_Dead_Start_Screen_pc54to.webp"
        alt: "GIF of Start Screen"
        animated: true

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "This is still an on-going project. We're almost done with the semester meaning this project will come to a end soon, so expect more as we wrap up the project."
---