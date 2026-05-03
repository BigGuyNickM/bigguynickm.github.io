---
layout: post
title: "Terrain Chunking Test Project"
date: 2025-02-14
category: coding
featured: false
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832973/Terrain_Chunker_Grass_qb1jmx.webp"
description: "I wanted to learn how to create a custom mesh with textures through code, and it kind of spiraled into a whole chunk-based terrain painter utilizing a dual grid system, and a little dabble into manually instancing meshes through shaders."

details:
  Programs Used: "Odin Lang, Raylib"

toc:
  - label: "Art & Architecture"
    id: "art-architecture"
  - label: "Tilesheet"
    id: "tilesheet"
    sub: true
  - label: "Main Script"
    id: "main-script"
  - label: "Initialize"
    id: "initialize"
    sub: true
  - label: "Main & Renderer"
    id: "main-renderer"
    sub: true
  - label: "Camera Controller"
    id: "camera-controller"
    sub: true
  - label: "Terrain Mesh Generator"
    id: "terrain-mesh-generator"
  - label: "Parameters"
    id: "terrain-params"
    sub: true
  - label: "Generate World"
    id: "generate-world"
    sub: true
  - label: "Generate Chunk Mesh"
    id: "generate-chunk-mesh"
    sub: true
  - label: "Update & Draw Chunks"
    id: "update-draw-chunks"
    sub: true
  - label: "Deterministic Rotation"
    id: "deterministic-rotation"
    sub: true
  - label: "Autotiler"
    id: "autotiler"
  - label: "Tile Dict"
    id: "tile-dict"
    sub: true
  - label: "Set & Calculate Tile"
    id: "set-calculate-tile"
    sub: true
  - label: "Terrain Brush"
    id: "terrain-brush"
    sub: true
  - label: "Grass Mesh Generator"
    id: "grass-mesh-generator"
  - label: "Generate Grass Tile"
    id: "generate-grass-tile"
    sub: true
  - label: "Initialize & Draw"
    id: "grass-init-draw"
    sub: true
  - label: "Grass Shader"
    id: "grass-shader"
  - label: "Vertex Shader"
    id: "vertex-shader"
    sub: true
  - label: "Fragment Shader"
    id: "fragment-shader"
    sub: true
  - label: "Final Note"
    id: "final-note"

sections:
  - title: "Art &"
    accent: "Architecture"
    label: "Tilesheet & Setup"
    id: "art-architecture"
    blocks:
      - type: warning
        id: "old-code-warning"
        title: "Old Code"
        text: "This code is from early 2025 and is pretty outdated compared to my current skillset, though I still believe it is a cool project and helped me learn a fair amount of stuff."

      - type: image
        id: "tilesheet"
        title: "Tilesheet"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832969/Terrain_Chunker_TestTileSheet_t4mx4b.webp"
        alt: "Terrain tilesheet for dual grid system"
        description: "This is the tilesheet I am working with. It is made specifically for the dual grid system I will be using."

  - title: "The"
    accent: "Main Script"
    label: "Core Loop"
    id: "main-script"
    blocks:
      - type: code
        id: "initialize"
        title: "Initialize()"
        lang: odin
        description: "I first started by setting up the basic parameters for the user, and initializing the program."
        code: |
          userPos := rl.Vector3({0,0,0})

          camOffset : f32 = 30

          camSpeed : f32 = 40

          camera := rl.Camera3D{
          	position = {userPos.x - camOffset/2, userPos.y + camOffset/2, userPos.z + camOffset},
          	target = userPos,
          	up = {0, 1, 0},
          	fovy = 30.0,
          	projection = .ORTHOGRAPHIC,
          }

          dt : f32

          initialize :: proc () {
          	tile_dictionary()
          	initialize_grass()
          	//create_tile_map()
          	generate_world()
          }

      - type: code
        id: "main-renderer"
        title: "Main() & Renderer()"
        lang: odin
        description: "main() just holds the update loop and creates the window for the program. renderer() does as its name suggests, it runs all of the draw functions."
        code: |
          main :: proc () {
          	rl.SetConfigFlags({
          		//.VSYNC_HINT,
          		.WINDOW_RESIZABLE,
          	})
          	rl.TraceLogLevel(.ERROR)
          	rl.InitWindow(1280, 720, "3D Test")
          	//rl.SetTargetFPS(120)
          	initialize()
          	for !rl.WindowShouldClose() // main loop
          	{
          		dt = rl.GetFrameTime()
          		CameraController()
          		renderer()
          	}
          	rl.CloseWindow()
          }

          renderer :: proc () {
          	fps := rl.GetFPS()
          	rl.ClearBackground(rl.BLACK)
          	update_chunks()
          	rl.BeginDrawing()
          	rl.BeginMode3D(camera)
          	draw_chunks()
          	draw_grass()
          	rl.DrawSphere(userPos, 1, rl.RED)
          	//rl.DrawCircle3D(userPos, CHUNK_SIZE * TILE_SIZE * RENDER_DISTANCE, {1, 0, 0}, 90, rl.RED)
          	//rl.DrawGrid(WORLD_SIZE*2, CHUNK_SIZE * TILE_SIZE)
          	terrain_brush()
          	rl.EndMode3D()
          	rl.DrawFPS(10, 10)
          	rl.EndDrawing()
          }

      - type: code
        id: "camera-controller"
        title: "CameraController()"
        lang: odin
        description: "A simple script for user and camera movement."
        code: |
          CameraController :: proc () {
          	if rl.IsKeyDown(.D) {
          		userPos.x += camSpeed * dt
          	}
          	if rl.IsKeyDown(.A) {
          		userPos.x -= camSpeed * dt
          	}
          	if rl.IsKeyDown(.S) {
          		userPos.z += camSpeed * dt
          	}
          	if rl.IsKeyDown(.W) {
          		userPos.z -= camSpeed * dt
          	}
          	camera.position = {userPos.x - camOffset/4, userPos.y + camOffset, userPos.z + camOffset}
          	camera.target = userPos
          }

  - title: "Terrain"
    accent: "Mesh Generator"
    label: "Chunks & Mesh"
    id: "terrain-mesh-generator"
    blocks:
      - type: code
        id: "terrain-params"
        title: "Parameters"
        lang: odin
        description: "Setting up the parameters for the terrain mesh and chunking system."
        code: |
          TILE_SIZE :: 4
          CHUNK_SIZE :: 5
          WORLD_SIZE :: 20
          RENDER_DISTANCE :: 2

          Terrain_Atlas : rl.Texture2D
          Terrain_Material : rl.Material

          TEX_COUNT :: 4
          TEX_SIZE :: 64

          CHUNK :: struct {
          	tiles : [CHUNK_SIZE + 1][CHUNK_SIZE + 1]u8,
          	mesh : rl.Mesh,
          	active : bool
          }

          Terrain : [WORLD_SIZE][WORLD_SIZE]CHUNK
          Active_Chunks : [dynamic]rl.Vector2

      - type: code
        id: "generate-world"
        title: "Generate_World()"
        lang: odin
        description: "generate_world() generates every chunk's data and its corresponding tiles. Every tile is initialized as 1, which is grass, with 0 being for dirt."
        code: |
          generate_world :: proc () {
          	for x in 0 ..< WORLD_SIZE {
          		for z in 0 ..< WORLD_SIZE {
          			chunk := &Terrain[x][z]
          			for i in 0 ..< CHUNK_SIZE {
          				for j in 0 ..< CHUNK_SIZE {
          					chunk.tiles[i][j] = 1
          				}
          			}
          			chunk.mesh = generate_chunk_mesh()
          			chunk.active = false
          		}
          	}
          	Terrain_Atlas = rl.LoadTexture("TestTileSheet.png")
          	Terrain_Material = rl.LoadMaterialDefault()
          	Terrain_Material.maps[0].texture = Terrain_Atlas
          }

      - type: code
        id: "generate-chunk-mesh"
        title: "Generate_Chunk_Mesh()"
        lang: odin
        description: "generate_chunk_mesh() generates the actual mesh for the chunks based on how many tiles are in the chunk. It's a bit cumbersome doing this manually since I had to define 6 vertices (2 triangles per tile, 3 vertices per triangle) for every tile, and then do the same for the UV mapping but this time working in UV coordinates as well."
        code: |
          generate_chunk_mesh :: proc () -> rl.Mesh {
          	total_tiles : i32 = CHUNK_SIZE * CHUNK_SIZE
          	mesh : rl.Mesh
          	mesh.triangleCount = total_tiles * 2
          	mesh.vertexCount = mesh.triangleCount * 3
          	mesh.vertices = raw_data(make([]f32, mesh.vertexCount*3))
          	mesh.texcoords = raw_data(make([]f32, mesh.vertexCount*2))
          	mesh.normals = raw_data(make([]f32, mesh.vertexCount*3))

          	vertex_index : u16 = 0
          	tex_index : u16 = 0

          	for x in 0 ..< CHUNK_SIZE {
          		for z in 0 ..< CHUNK_SIZE {
          			pos_x := f32(x * TILE_SIZE)
          			pos_z := f32(z * TILE_SIZE)

          			// triangle one vertices
          			mesh.vertices[vertex_index] 		= pos_x
          			mesh.vertices[vertex_index + 2] 	= pos_z
          			mesh.vertices[vertex_index + 3]		= pos_x
          			mesh.vertices[vertex_index + 5] 	= pos_z + TILE_SIZE
          			mesh.vertices[vertex_index + 6]		= pos_x + TILE_SIZE
          			mesh.vertices[vertex_index + 8] 	= pos_z

          			// triangle two vertices
          			mesh.vertices[vertex_index + 9] 	= pos_x + TILE_SIZE
          			mesh.vertices[vertex_index + 11] 	= pos_z
          			mesh.vertices[vertex_index + 12]	= pos_x
          			mesh.vertices[vertex_index + 14] 	= pos_z + TILE_SIZE
          			mesh.vertices[vertex_index + 15]	= pos_x + TILE_SIZE
          			mesh.vertices[vertex_index + 17] 	= pos_z + TILE_SIZE

          			// y position for vertices
          			for i :u16= 1; i < 18; i += 3 {
          				mesh.vertices[vertex_index + i] = 0
          			}

          			// set up normals
          			for i: u16 = 0; i < 18; i += 3 {
          				mesh.normals[vertex_index + i]     = 0  // X
          				mesh.normals[vertex_index + i + 1] = 1  // Y (upward)
          				mesh.normals[vertex_index + i + 2] = 0  // Z
          			}

          			tex_coords := Tile_Dict[{1, 1, 1, 1}]
          			u := tex_coords.x
          			v := tex_coords.y

          			// triangle one texcoords
          			mesh.texcoords[tex_index]      = u
          			mesh.texcoords[tex_index + 1]  = v
          			mesh.texcoords[tex_index + 2]  = u
          			mesh.texcoords[tex_index + 3]  = v + 0.25
          			mesh.texcoords[tex_index + 4]  = u + 0.25
          			mesh.texcoords[tex_index + 5]  = v

          			// triangle two texcoords
          			mesh.texcoords[tex_index + 6]  = u + 0.25
          			mesh.texcoords[tex_index + 7]  = v
          			mesh.texcoords[tex_index + 8]  = u
          			mesh.texcoords[tex_index + 9]  = v + 0.25
          			mesh.texcoords[tex_index + 10] = u + 0.25
          			mesh.texcoords[tex_index + 11] = v + 0.25

          			vertex_index += 18
          			tex_index += 12
          		}
          	}

          	rl.UploadMesh(&mesh, false)
          	return mesh
          }

      - type: code
        id: "update-draw-chunks"
        title: "Update_Chunks() & Draw_Chunks()"
        lang: odin
        description: "update_chunks() is responsible for updating the chunk list as you move around so there is a working render distance. It's also responsible for handling the edges of chunks since those get a bit tricky with the dual grid system, since it's offset by half a tile and technically a tile larger than the real grid. The nested statements in this are horrendous, and I'd probably never let it get this bad nowadays. draw_chunks() simply draws every active chunk."
        code: |
          update_chunks :: proc () {
          	for &chunk in Active_Chunks {
          		Terrain[int(chunk.x)][int(chunk.y)].active = false
          	}
          	clear(&Active_Chunks)
          	clear(&Grass_Transforms)

          	player_chunk_x := int(camera.target.x / (CHUNK_SIZE * TILE_SIZE))
          	player_chunk_z := int(camera.target.z / (CHUNK_SIZE * TILE_SIZE))

          	min_x := max(0, player_chunk_x - RENDER_DISTANCE)
          	max_x := min(WORLD_SIZE - 1, player_chunk_x + RENDER_DISTANCE)
          	min_z := max(0, player_chunk_z - RENDER_DISTANCE)
          	max_z := min(WORLD_SIZE - 1, player_chunk_z + RENDER_DISTANCE)

          	for x in min_x ..< max_x + 1 {
          		for z in min_z ..< max_z + 1 {
          			Terrain[x][z].active = true
          			append(&Active_Chunks, rl.Vector2({f32(x), f32(z)}))

          			// make grass
          			for tile_x in 0 ..< CHUNK_SIZE {
          				for tile_z in 0 ..< CHUNK_SIZE {
          					if Terrain[x][z].tiles[tile_x][tile_z] == 1 {
          						if x == 0 && tile_x == 0 { continue }
          						if z == 0 && tile_z == 0 { continue }
          						if x >= WORLD_SIZE && x >= CHUNK_SIZE-1 { continue }
          						if z >= WORLD_SIZE && z >= CHUNK_SIZE-1 { continue }

          						translation := rl.MatrixTranslate(
          							f32((x * CHUNK_SIZE + tile_x) * TILE_SIZE) + TILE_SIZE/2,
          							0,
          							f32((z * CHUNK_SIZE + tile_z) * TILE_SIZE) + TILE_SIZE/2
          						)
          						rotation := deterministic_rotation(x * CHUNK_SIZE + tile_x, z * CHUNK_SIZE + tile_z)
          						transform := translation * rotation
          						append(&Grass_Transforms, transform)
          					}
          				}
          			}
          		}
          	}
          }

          draw_chunks :: proc () {
          	if len(Active_Chunks) == 0 {
          		return
          	}
          	for &chunk_pos in Active_Chunks {
          		chunk := &Terrain[int(chunk_pos.x)][int(chunk_pos.y)]
          		transform := rl.MatrixTranslate(f32(chunk_pos.x * CHUNK_SIZE * TILE_SIZE + TILE_SIZE/2), 0, f32(chunk_pos.y * CHUNK_SIZE * TILE_SIZE + TILE_SIZE/2))
          		rl.DrawMesh(chunk.mesh, Terrain_Material, transform)
          	}
          }

      - type: code
        id: "deterministic-rotation"
        title: "Deterministic_Rotation()"
        lang: odin
        description: "A seed-based function responsible for rotating the instanced grass blades so it doesn't look repetitive."
        code: |
          deterministic_rotation :: proc(x, z: int) -> rl.Matrix {
          	seed_x := u32(x) * 73856093
          	seed_z := u32(z) * 19349663
          	seed := seed_x ~ seed_z  // XOR for randomness
          	angle := f32((seed % 4) * 90) * rl.DEG2RAD
          	cos_theta := math.cos_f32(angle)
          	sin_theta := math.sin_f32(angle)
          	return rl.Matrix{
          		cos_theta, 0, sin_theta, 0,
          		0,         1, 0,         0,
          		-sin_theta, 0, cos_theta, 0,
          		0,         0, 0,         1
          	}
          }

      - type: image
        id: "chunks-gif"
        title: "Chunk System GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832968/Terrain_Chunker_Chunks_qinjky.webp"
        alt: "GIF of the chunk system working as you move around"
        description: "Here is a GIF of the chunk system working as you move around. Now we just need to make it so there can be different tile types."
        animated: true

  - title: "The"
    accent: "Autotiler"
    label: "Dual Grid System"
    id: "autotiler"
    blocks:
      - type: text
        id: "autotiler-intro"
        title: "Overview"
        paragraphs:
          - "I decided to attempt a dual grid system, since that is both more fun to code from a technical standpoint, and quicker to make the tilesheet for. This decision actually ended up making this project a million times harder though, since it turns out having your visual tiles misaligned from the physical tiles can lead to a lot of issues when introducing chunks."

      - type: code
        id: "tile-dict"
        title: "Tile_Dict{}"
        lang: odin
        description: "Tile_Dict is a dictionary of all the UV coordinates for each tile, mapped to the current tile the program is checking and 3 of its neighbors in the positive axis."
        code: |
          Tile_Dict : map[[4]u8]rl.Vector2

          tile_dictionary :: proc () {
          	Tile_Dict[[4]u8{1, 1, 1, 1}] = 	{0.5, 0.25}		// grass
          	Tile_Dict[[4]u8{0, 0, 0, 0}] = 	{0.0, 0.75} 	// desert
          	Tile_Dict[[4]u8{1, 0, 0, 0}] = 	{0.75, 0.75} 	// top left corner out
          	Tile_Dict[[4]u8{0, 1, 0, 0}] = 	{0.0, 0.5} 		// top right corner out
          	Tile_Dict[[4]u8{0, 0, 1, 0}] = 	{0.0, 0.0} 		// bottom left corner out
          	Tile_Dict[[4]u8{0, 0, 0, 1}] = 	{0.25, 0.75} 	// bottom right corner out
          	Tile_Dict[[4]u8{1, 0, 0, 1}] = 	{0.0, 0.25} 	// top left, bottom right corner out
          	Tile_Dict[[4]u8{0, 1, 1, 0}] = 	{0.5, 0.75} 	// top right, bottom left corner out
          	Tile_Dict[[4]u8{1, 1, 0, 0}] = 	{0.25, 0.5} 	// top edge
          	Tile_Dict[[4]u8{0, 1, 0, 1}] = 	{0.25, 0.0} 	// right edge
          	Tile_Dict[[4]u8{0, 0, 1, 1}] = 	{0.75, 0.0} 	// bottom edge
          	Tile_Dict[[4]u8{1, 0, 1, 0}] = 	{0.75, 0.5} 	// left edge
          	Tile_Dict[[4]u8{1, 1, 1, 0}] =	{0.75, 0.25} 	// top left corner
          	Tile_Dict[[4]u8{1, 1, 0, 1}] =	{0.5, 0.5} 		// top right corner
          	Tile_Dict[[4]u8{1, 0, 1, 1}] =	{0.5, 0.0} 		// bottom left corner
          	Tile_Dict[[4]u8{0, 1, 1, 1}] =	{0.25, 0.25}	// bottom right corner
          }

      - type: code
        id: "set-tile-type"
        title: "Set_Tile_Type()"
        lang: odin
        description: "set_tile_type() checks the type of every tile and its 3 neighbors, then sends that data to set_display_tile()."
        code: |
          set_tile_type :: proc (chunk_x, chunk_z, x, z : int, type : u8) {
          	if chunk_x < 0 || chunk_x >= WORLD_SIZE ||
          		chunk_z < 0 || chunk_z >= WORLD_SIZE ||
          		x < 0 || x >= CHUNK_SIZE ||
          		z < 0 || z >= CHUNK_SIZE ||
          		!Terrain[chunk_x][chunk_z].active{
          		return
          	}

          	Terrain[chunk_x][chunk_z].tiles[x][z] = type

          	for dx in 0 ..< 2 {
          		for dz in 0 ..< 2 {
          			display_x := x - dx
          			display_z := z - dz
          			display_chunk_x := chunk_x
          			display_chunk_z := chunk_z

          			if display_x < 0 {
          				display_chunk_x -= 1
          				display_x = CHUNK_SIZE - 1
          			}
          			if display_z < 0 {
          				display_chunk_z -= 1
          				display_z = CHUNK_SIZE - 1
          			}
          			if display_x >= CHUNK_SIZE {
          				display_chunk_x = chunk_x + 1
          				display_x = 0
          			}
          			if display_z >= CHUNK_SIZE {
          				display_chunk_z = chunk_z + 1
          				display_z = 0
          			}

          			if display_chunk_x >= 0 && display_chunk_x < WORLD_SIZE &&
          				display_chunk_z >= 0 && display_chunk_z < WORLD_SIZE {
          				set_display_tile(
          					display_chunk_x, display_chunk_z,
          					display_x, display_z,
          					calculate_display_tile(display_chunk_x, display_chunk_z, display_x, display_z)
          				)
          			}
          		}
          	}
          }

      - type: code
        id: "set-display-tile"
        title: "Set_Display_Tile()"
        lang: odin
        description: "set_display_tile() changes the tile's UVs to their new location to update the texture to the right tile type."
        code: |
          set_display_tile :: proc (chunk_x, chunk_z, x, z : int, pos : rl.Vector2) {
          	if chunk_x < 0 || chunk_x >= WORLD_SIZE ||
          		chunk_z < 0 || chunk_z >= WORLD_SIZE ||
          		x < 0 || x >= CHUNK_SIZE ||
          		z < 0 || z >= CHUNK_SIZE {
          		return
          	}

          	mesh := &Terrain[chunk_x][chunk_z].mesh
          	index := 12 * (z + x * CHUNK_SIZE)

          	Terrain[chunk_x][chunk_z].mesh.texcoords[index] 		= pos.x 		// 0
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 1] 	= pos.y 		// 0
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 2] 	= pos.x			// 0
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 3] 	= pos.y + 0.25	// 1
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 4] 	= pos.x + 0.25 	// 1
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 5] 	= pos.y			// 0
          	//
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 6] 	= pos.x + 0.25 	// 1
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 7] 	= pos.y			// 0
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 8] 	= pos.x			// 0
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 9] 	= pos.y + 0.25 	// 1
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 10] 	= pos.x + 0.25 	// 1
          	Terrain[chunk_x][chunk_z].mesh.texcoords[index + 11] 	= pos.y + 0.25	// 1

          	rl.UpdateMeshBuffer(
          		Terrain[chunk_x][chunk_z].mesh,
          		1,
          		Terrain[chunk_x][chunk_z].mesh.texcoords,
          		size_of(f32) * Terrain[chunk_x][chunk_z].mesh.vertexCount * 2,
          		0
          	)
          }

      - type: code
        id: "calculate-display-tile"
        title: "Calculate_Display_Tile()"
        lang: odin
        description: "calculate_display_tile() takes the tile and its neighbor's types and retrieves the corresponding UV coordinates from the Tile_Dict dictionary, then returns it to set_display_tile()."
        code: |
          calculate_display_tile :: proc (chunk_x, chunk_z, x, z : int) -> rl.Vector2 {
          	_get_tile_type :: proc (chunk_x, chunk_z, x, z : int) -> u8 {
          		chunk_dx := chunk_x
          		chunk_dz := chunk_z
          		dx := x
          		dz := z

          		if x >= CHUNK_SIZE{
          			if chunk_x >= WORLD_SIZE-1 {
          				dx = CHUNK_SIZE-1
          			} else {
          				chunk_dx += 1
          				dx = 0
          			}
          		}
          		if z >= CHUNK_SIZE{
          			if chunk_z >= WORLD_SIZE-1 {
          				dz = CHUNK_SIZE-1
          			} else {
          				chunk_dz += 1
          				dz = 0
          			}
          		}
          		return Terrain[chunk_dx][chunk_dz].tiles[dx][dz]
          	}

          	_normalize_key :: proc (key : [4]u8) -> [4]u8 {
          		new_key := key
          		for i in 0..<4 {
          			if key[i] > 0 {
          				new_key[i] = 1
          			}
          		}
          		return new_key
          	}

          	tile_key := [4]u8 { // create dictionary key with bordering tiles
          		_get_tile_type(chunk_x, chunk_z, x, z),
          		_get_tile_type(chunk_x, chunk_z, x+1, z),
          		_get_tile_type(chunk_x, chunk_z, x, z+1),
          		_get_tile_type(chunk_x, chunk_z, x+1, z+1),
          	}

          	tile_id, found := Tile_Dict[_normalize_key(tile_key)]
          	if found {
          		return tile_id // return proper tile texture
          	}
          	return {0.0, 0.75} // desert if tile is not found
          }

      - type: code
        id: "terrain-brush"
        title: "Terrain_Brush()"
        lang: odin
        description: "terrain_brush() creates the visual guide for the brush and allows the user to paint different types of tile on the terrain. I only coded in 3 types: grass, dirt, and grass without the instanced grass blades."
        code: |
          terrain_brush :: proc () {
          	mouse_pos := rl.GetMousePosition()
          	mouse_ray := rl.GetScreenToWorldRay(mouse_pos, camera)
          	ray_origin := mouse_ray.position
          	ray_dir := mouse_ray.direction

          	if ray_dir.y != 0 {
          		t := -ray_origin.y / ray_dir.y
          		x := ray_origin.x + t * ray_dir.x
          		z := ray_origin.z + t * ray_dir.z

          		chunk_x := int(math.floor(x / (CHUNK_SIZE * TILE_SIZE)))
          		chunk_z := int(math.floor(z / (CHUNK_SIZE * TILE_SIZE)))

          		tile_x, tile_z : int
          		tile_x = int(math.floor(x / TILE_SIZE)) % CHUNK_SIZE
          		tile_z = int(math.floor(z / TILE_SIZE)) % CHUNK_SIZE

          		if tile_x < 0 { tile_x += CHUNK_SIZE}
          		if tile_z < 0 { tile_z += CHUNK_SIZE}

          		world_x := (chunk_x * CHUNK_SIZE * TILE_SIZE) + (tile_x * TILE_SIZE)
          		world_z := (chunk_z * CHUNK_SIZE * TILE_SIZE) + (tile_z * TILE_SIZE)

          		rl.DrawCubeWires({f32(world_x + TILE_SIZE/2), TILE_SIZE/2, f32(world_z + TILE_SIZE/2)}, TILE_SIZE, TILE_SIZE, TILE_SIZE, rl.PURPLE)

          		if rl.IsMouseButtonDown(.LEFT) {
          			set_tile_type(chunk_x, chunk_z, tile_x, tile_z, 0)
          		}
          		if rl.IsMouseButtonDown(.RIGHT) {
          			set_tile_type(chunk_x, chunk_z, tile_x, tile_z, 1)
          		}
          		if rl.IsMouseButtonDown(.MIDDLE) {
          			set_tile_type(chunk_x, chunk_z, tile_x, tile_z, 2)
          		}
          	}
          }

      - type: image
        id: "autotiler-gif"
        title: "Autotiler GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832975/Terrain_Chunker_Painting_h60zst.webp"
        alt: "GIF of the autotiler in action with the painting mechanic"
        description: "Here's a GIF of the autotiler in action with the painting mechanic."
        animated: true

  - title: "Grass"
    accent: "Mesh Generator"
    label: "Instanced Grass"
    id: "grass-mesh-generator"
    blocks:
      - type: code
        id: "grass-params"
        title: "Parameters"
        lang: odin
        description: "Parameters for the grass mesh, as well as two dynamic arrays to store the rotations and translations that get passed to the shader."
        code: |
          GRASS_BLADES :: 500
          GRASS_COLOR_TOP := rl.Vector3{0.5, 0.73, 0.31}
          GRASS_COLOR_BOTTOM := rl.Vector3{0.2, 0.45, 0.08}

          Grass_Shader : rl.Shader
          Grass_Material : rl.Material
          Grass_Mesh : rl.Mesh
          Grass_Transforms : [dynamic]rl.Matrix
          Grass_Rotations : [dynamic]rl.Matrix

      - type: code
        id: "generate-grass-tile"
        title: "Generate_Grass_Tile()"
        lang: odin
        description: "generate_grass_tile() generates the mesh for the grass. It's pretty much the same as the chunk generator, however I had to add in random rotations for each grass blade which complicated it a bit."
        code: |
          generate_grass_tile :: proc () -> rl.Mesh{
          	mesh : rl.Mesh
          	mesh.triangleCount = GRASS_BLADES
          	mesh.vertexCount = mesh.triangleCount * 3
          	mesh.vertices = raw_data(make([]f32, mesh.vertexCount*3))
          	mesh.texcoords = raw_data(make([]f32, mesh.vertexCount*2))
          	mesh.normals = raw_data(make([]f32, mesh.vertexCount*3))

          	for i in 0 ..< GRASS_BLADES {
          		angle := f32(rl.GetRandomValue(0, 360)) * f32(rl.DEG2RAD)
          		x := rand.float32_range(-TILE_SIZE/2, TILE_SIZE/2)
          		z := rand.float32_range(-TILE_SIZE/2, TILE_SIZE/2)

          		// vertex
          		mesh.vertices[(i * 9)] 		= x + math.cos(angle) * rand.float32_range(0.2, 0.4)
          		mesh.vertices[(i * 9) + 1] 	= 0
          		mesh.vertices[(i * 9) + 2] 	= z + math.sin(angle) * rand.float32_range(0.2, 0.4)
          		mesh.vertices[(i * 9) + 3] 	= x
          		mesh.vertices[(i * 9) + 4] 	= rand.float32_range(0.2, 0.6)
          		mesh.vertices[(i * 9) + 5] 	= z
          		mesh.vertices[(i * 9) + 6] 	= x - math.cos(angle) * rand.float32_range(0.2, 0.4)
          		mesh.vertices[(i * 9) + 7] 	= 0
          		mesh.vertices[(i * 9) + 8] 	= z - math.sin(angle) * rand.float32_range(0.2, 0.4)

          		// normals
          		mesh.normals[(i * 9)] 		= 0
          		mesh.normals[(i * 9) + 1] 	= 1
          		mesh.normals[(i * 9) + 2] 	= 0
          		mesh.normals[(i * 9) + 3] 	= 0
          		mesh.normals[(i * 9) + 4] 	= 1
          		mesh.normals[(i * 9) + 5] 	= 0
          		mesh.normals[(i * 9) + 6] 	= 0
          		mesh.normals[(i * 9) + 7] 	= 1
          		mesh.normals[(i * 9) + 8] 	= 0

          		// texcoords
          		mesh.texcoords[(i * 6)] 		= 0
          		mesh.texcoords[(i * 6) + 1] 	= 0
          		mesh.texcoords[(i * 6) + 2] 	= 0
          		mesh.texcoords[(i * 6) + 3] 	= 1
          		mesh.texcoords[(i * 6) + 4] 	= 1
          		mesh.texcoords[(i * 6) + 5] 	= 0
          	}

          	rl.UploadMesh(&mesh, false)
          	return mesh
          }

      - type: code
        id: "grass-init-draw"
        title: "Initialize_Grass() & Draw_Grass()"
        lang: odin
        description: "These two functions set up the parameters for the shader and then run it to instance the mesh. The reason I'm using a shader for this is because caching and instancing one mesh is way more optimized than having hundreds of draw calls for the same mesh otherwise."
        code: |
          initialize_grass :: proc () {
          	Grass_Mesh = generate_grass_tile()
          	Grass_Shader = rl.LoadShader("grass_shader.vs","grass_shader.fs")
          	Grass_Shader.locs[rl.ShaderLocationIndex.MATRIX_MVP]   = i32(rl.GetShaderLocation(Grass_Shader, "mvp"))
          	Grass_Shader.locs[rl.ShaderLocationIndex.MATRIX_MODEL] = i32(rl.GetShaderLocationAttrib(Grass_Shader, "instanceTransform"))
          	rl.SetShaderValue(Grass_Shader, rl.GetShaderLocation(Grass_Shader, "colorTop"), &GRASS_COLOR_TOP, .VEC3)
          	rl.SetShaderValue(Grass_Shader, rl.GetShaderLocation(Grass_Shader, "colorBottom"), &GRASS_COLOR_BOTTOM, .VEC3)
          	Grass_Material = rl.LoadMaterialDefault()
          	Grass_Material.shader = Grass_Shader
          	Grass_Material.maps[rl.MaterialMapIndex.ALBEDO].color = rl.RED // error color
          }

          draw_grass :: proc () {
          	rlgl.DisableBackfaceCulling()
          	//rl.DrawMesh(Grass_Mesh, Grass_Material, rl.MatrixTranslate(0, 0, 0))
          	rl.DrawMeshInstanced(Grass_Mesh, Grass_Material, raw_data(Grass_Transforms), i32(len(Grass_Transforms)))
          	rlgl.EnableBackfaceCulling()
          }

  - title: "The"
    accent: "Grass Shader"
    label: "Instancing via GLSL"
    id: "grass-shader"
    blocks:
      - type: code
        id: "vertex-shader"
        title: "Vertex Shader"
        lang: glsl
        description: "The vertex shader handles setting up the grass blades' location and rotation before sending them to the fragment shader."
        code: |
          #version 330

          // VERTEX SHADER

          in vec3 vertexPosition;
          in vec2 vertexTexCoord;
          in vec3 vertexNormal;
          in mat4 instanceTransform;

          uniform mat4 mvp;
          uniform mat4 matNormal;

          out vec3 fragPosition;
          out vec2 fragTexCoord;
          out vec3 fragNormal;

          void main()
          {
          	mat4 modelMatrix = instanceTransform;
          	fragPosition = vec3(modelMatrix * vec4(vertexPosition, 1.0));
          	fragTexCoord = vertexTexCoord;
          	fragNormal = normalize(vec3(matNormal * vec4(vertexNormal, 1.0)));
          	gl_Position = mvp * vec4(fragPosition, 1.0);
          }

      - type: code
        id: "fragment-shader"
        title: "Fragment Shader"
        lang: glsl
        description: "The fragment shader handles actually rendering the grass blades to the screen, using a simple gradient between the top and bottom color uniforms."
        code: |
          #version 330

          // FRAGMENT SHADER

          in vec3 fragPosition;
          in vec2 fragTexCoord;
          in vec3 fragNormal;

          out vec4 finalColor;

          uniform vec3 colorTop;    // Gradient top color
          uniform vec3 colorBottom; // Gradient bottom color

          void main()
          {
          	// Normalize Y value to 0-1 range
          	float factor = (fragPosition.y - 0.0) / (0.6 - 0.0);
          	factor = clamp(factor, 0.0, 1.0);

          	// Interpolate between bottom and top colors
          	vec3 gradientColor = mix(colorBottom, colorTop, factor);

          	finalColor = vec4(gradientColor, 1.0);
          }

      - type: image
        id: "grass-shader-gif"
        title: "Grass Shader GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832973/Terrain_Chunker_Grass_qb1jmx.webp"
        alt: "GIF of the grass blades shader in action"
        description: "Here's a GIF of the grass blades shader in action."
        animated: true

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "This project was pretty fun to learn, however it was pretty poorly constructed. Nowadays I would've approached this very differently for almost every aspect. There's a lot of nested statements, unabstracted logic, duplicated logic, the list goes on. Not to mention I have data stored in locations it shouldn't be, such as the user and camera data being in the main script. Nonetheless I still learned a lot about custom mesh generation, and some optimization techniques such as chunking and instancing with a shader."
---
