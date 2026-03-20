---
layout: post
title: "Tower Defense"
date: 2025-05-09
private: false
category: game
featured: false
thumbnail: "PLACEHOLDER/3.gif"
description: "A semester project for my 3D Game Design class — a tower defense game with 3 enemy types and an upgrade system, coded in Odin-lang using Raylib and a custom utility package I built from scratch."

details:
  Programs Used: "Odin-lang, Raylib"

toc:
  - label: "Visual Process"
    id: "visual-process"
  - label: "Custom Package"
    id: "custom-package"
  - label: "Wait Service"
    id: "wait-service"
    sub: true
  - label: "Tween Service"
    id: "tween-service"
    sub: true
  - label: "Vectors"
    id: "vectors"
    sub: true
  - label: "Base Files"
    id: "base-files"
  - label: "Game & Player"
    id: "game-player"
    sub: true
  - label: "Initialize"
    id: "initialize"
    sub: true
  - label: "Update"
    id: "update"
    sub: true
  - label: "Logic Files"
    id: "logic-files"
  - label: "Grid Logic"
    id: "grid-logic"
    sub: true
  - label: "Entity Logic"
    id: "entity-logic"
    sub: true
  - label: "Wave Logic"
    id: "wave-logic"
    sub: true
  - label: "Player Logic"
    id: "player-logic"
    sub: true
  - label: "Upgrade Logic"
    id: "upgrade-logic"
    sub: true
  - label: "Camera Logic"
    id: "camera-logic"
    sub: true
  - label: "Projectile Logic"
    id: "projectile-logic"
    sub: true
  - label: "Notification Logic"
    id: "notif-logic"
    sub: true
  - label: "Final Note"
    id: "final-note"

sections:
  - title: "Visual"
    accent: "Process"
    label: "Dev Progression"
    id: "visual-process"
    blocks:
      - type: image
        id: "step-1"
        title: "Step 1 — Core Systems"
        src: "PLACEHOLDER/1.gif"
        alt: "Core enemy and tower systems"
        animated: true
        description: "Started by setting up the core systems — enemies that walk toward the center and a tower that automatically shoots at them."

      - type: image
        id: "step-2"
        title: "Step 2 — Waves & Gold"
        src: "PLACEHOLDER/2.gif"
        alt: "Wave and gold systems"
        animated: true
        description: "Added waves that get progressively harder, and enemies now drop gold on death."

      - type: image
        id: "step-3-enemies"
        title: "Step 3 — Enemy Assets"
        src: "PLACEHOLDER/characters.png"
        alt: "3 enemy models"
        description: "Modeled the three enemy types — Greg, Jeffery, and Glurb. Went for a goofy look."

      - type: image
        id: "step-4-env"
        title: "Step 4 — Environment Assets"
        src: "PLACEHOLDER/environment_assets.png"
        alt: "Environment assets"
        description: "Modeled the environment assets and dropped them into the scene."

      - type: image
        id: "step-5-final"
        title: "Step 5 — All Together"
        src: "PLACEHOLDER/3.gif"
        alt: "Final gameplay"
        animated: true
        description: "Imported all the assets, added health and upgrades to the tower, and put together a notification system."

  - title: "The Custom"
    accent: "Package"
    label: "Custom Utilities"
    id: "custom-package"
    blocks:
      - type: text
        id: "package-intro"
        title: "Why a Custom Package"
        paragraphs:
          - "I coded the game in Odin-lang using Raylib, but both are pretty bare bones when it comes to things like delayed callbacks, tweening, and vector math utilities. So I built a custom package with several services to fill those gaps and speed up development. The three most important ones are the wait service, tween service, and vectors."

      - type: code
        id: "wait-service"
        title: "Wait Service — Setup"
        lang: odin
        description: "The wait service lets you pass in any function with a delay before it fires, and optionally repeat it. Here's the struct and how each wait object gets created."
        code: |
          Wait :: struct {
            time 		: f64,
            task 		: proc(),
            repeat 		: bool,
            start_time 	: f64
          }

          Waits : [dynamic]Wait

          wait :: proc (time : f64, task : proc(), repeat := false) {
            new_wait := Wait{
              time = time,
              task = task,
              repeat = repeat,
              start_time = rl.GetTime()
            }
            append(&Waits, new_wait)
          }

      - type: code
        id: "wait-service-loop"
        title: "Wait Service — Service Loop"
        lang: odin
        description: "wait_service() loops through active waits every frame and fires the task when the time is up. If the wait is set to repeat it resets the timer, otherwise it gets removed."
        code: |
          wait_service :: proc () {
            len := len(Waits)
            if len == 0 { return }
            current_time := rl.GetTime()
            for i := len - 1; i >= 0; i -= 1 {
              wait := &Waits[i]
              if wait.start_time == 0 { continue }
              if (current_time - wait.start_time) >= wait.time {
                wait.task() // run task
                if wait.repeat 	{ wait.start_time = current_time } // reset time
                else 			{ unordered_remove(&Waits, i) } // remove wait
              }
            }
          }

      - type: code
        id: "tween-service"
        title: "Tween Service — Setup"
        lang: odin
        description: "The tween service smoothly interpolates any numeric value toward a target over a duration, using a custom easing function. It works generically over any numeric type using Odin's parametric polymorphism."
        code: |
          Tween :: struct {
            object:     rawptr,
            start:      rawptr,
            target:     rawptr,
            start_time: f64,
            duration:   f64,
            easing:     proc(f64) -> f64,
            type:       typeid,
          }

          Tweens: [dynamic]Tween

          tween :: proc(object: ^$T, target: T, duration: f64, easing: proc(f64) -> f64)
          where intrinsics.type_is_numeric(T) {
            start_copy := new(T)
            start_copy^ = object^
            target_copy := new(T)
            target_copy^ = target
            append(&Tweens, Tween{
              object     = object,
              start      = start_copy,
              target     = target_copy,
              start_time = rl.GetTime(),
              duration   = duration,
              easing     = easing,
              type       = typeid_of(T),
            })
          }

      - type: code
        id: "tween-service-loop"
        title: "Tween Service — Service Loop"
        lang: odin
        description: "tween_service() runs every frame and steps each active tween forward. It uses a type switch to cast the raw pointer to the right type and apply the interpolation. Once a tween reaches its target it gets freed and removed."
        code: |
          run_tween :: proc(start, end: $T, time: f64) -> T {
            return start + (end - start) * T(time)
          }

          tween_service :: proc() {
            if len(Tweens) == 0 do return
            current_time := rl.GetTime()
            for i := len(Tweens) - 1; i >= 0; i -= 1 {
              t := &Tweens[i]
              elapsed := current_time - t.start_time
              time := math.min(elapsed / t.duration, 1)
              progress := clamp(elapsed / t.duration, 0, 1)
              eased := t.easing(progress)
              // Skip if invalid or finished
              if t.object == nil || t.target == nil || time == 1 {
                free(t.start)
                free(t.target)
                unordered_remove(&Tweens, i)
                continue
              }
              switch T := t.type; T {
              case typeid_of(int):  _apply_tween(int,  t.object, t.start, t.target, eased)
              case typeid_of(f32):  _apply_tween(f32,  t.object, t.start, t.target, eased)
              case typeid_of(Vec2): _apply_tween(Vec2, t.object, t.start, t.target, eased)
              case typeid_of(Vec3): _apply_tween(Vec3, t.object, t.start, t.target, eased)
              case typeid_of(Vec4): _apply_tween(Vec4, t.object, t.start, t.target, eased)
              }
              // Helper function to cast type to the tweens
              _apply_tween :: proc($T: typeid, object, start, target: rawptr, eased: f64) {
                (cast(^T)object)^ = run_tween((cast(^T)start)^, (cast(^T)target)^, eased)
              }
            }
          }

      - type: code
        id: "vectors"
        title: "Vectors — Types"
        lang: odin
        description: "Odin and Raylib are both light on vector-specific functionality, so I defined my own vector types and destructuring helpers for both float and integer variants."
        code: |
          Vec2 :: [2]f32
          Vec3 :: [3]f32
          Vec4 :: [4]f32

          desVec2 :: proc (vec : ^Vec2) -> (f32, f32) { return vec.x, vec.y }
          desVec3 :: proc (vec : ^Vec3) -> (f32, f32, f32) { return vec.x, vec.y, vec.z }
          desVec4 :: proc (vec : ^Vec4) -> (f32, f32, f32, f32) { return vec.x, vec.y, vec.z, vec.w }

          // i32 vectors for pixel/grid based operations
          Vec2i :: [2]i32
          Vec3i :: [3]i32
          Vec4i :: [4]i32

          desVec2i :: proc (vec : ^Vec2i) -> (i32, i32) { return vec.x, vec.y }
          desVec3i :: proc (vec : ^Vec3i) -> (i32, i32, i32) { return vec.x, vec.y, vec.z }
          desVec4i :: proc (vec : ^Vec4i) -> (i32, i32, i32, i32) { return vec.x, vec.y, vec.z, vec.w }

      - type: code
        id: "vectors-math"
        title: "Vectors — Math Functions"
        lang: odin
        description: "Vector math utilities that work generically across all the vector types — direction, angle, and distance calculations."
        code: |
          direction_between :: proc(a, b: $T/[$N]$E) -> T where N > 0 {
            dir := b - a
            len_sq := math.sqrt(_sum_squares(dir))
            if len_sq <= 0 {
              return {}  // Zero vector if points are identical
            }
            return dir / len_sq  // Normalized direction

            _sum_squares :: proc(v: $T/[$N]$E) -> E {
              sum: E
              for x in v { sum += x * x }
              return sum
            }
          }

          angle_between :: proc(a, b: $T/[$N]$E) -> f32 {
            dx := f32(b.x) - f32(a.x)
            dy := f32(b.y) - f32(a.y)
            return math.atan2(dy, dx)
          }

          distance_between :: proc(a, b: $T) -> f32 {
            when intrinsics.type_is_array(T) {  // Handle vectors (Vec2, Vec3, etc.)
              sum: f32 = 0
              for x, i in a {
                diff := f32(b[i]) - f32(x)
                sum += diff * diff
              }
              return math.sqrt(sum)
            } else when intrinsics.type_is_numeric(T) {  // Handle numbers (int, f32, etc.)
              return math.abs(f32(b) - f32(a))
            } else {
              #panic("Unsupported type for distance calculation")
            }
          }

      - type: code
        id: "vectors-more"
        title: "Vectors — Length, Dot, Normalize"
        lang: odin
        description: "Length, dot product, and normalization — all written generically to work across the custom vector types."
        code: |
          // Returns length/magnitude of vector
          length :: proc(v: $T) -> f32 {
            when intrinsics.type_is_array(T) {
              sum: f32 = 0
              for x in v {
                sum += x * x
              }
              return math.sqrt(sum)
            } else when intrinsics.type_is_numeric(T) {
              return math.abs(f32(v))
            } else {
              #panic("Unsupported type for length calculation")
            }
          }

          // Dot product between two vectors/numbers
          dot :: proc(a, b: $T) -> f32 {
            when intrinsics.type_is_array(T) {
              sum: f32 = 0
              for x, i in a {
                sum += f32(x) * f32(b[i])
              }
              return sum
            } else when intrinsics.type_is_numeric(T) {
              return f32(a) * f32(b)
            } else {
              #panic("Unsupported type for dot product")
            }
          }

          // Normalizes a vector (unit length)
          normalize :: proc(v: $T) -> T {
            when intrinsics.type_is_array(T) {
              len := length(v)
              if len > 0 {
                result: T
                for x, i in v {
                  result[i] = x / len
                }
                return result
              }
              return v
            } else when intrinsics.type_is_numeric(T) {
              return T(1)
            } else {
              #panic("Unsupported type for normalization")
            }
          }

  - title: "The Base"
    accent: "Files"
    label: "Base Setup"
    id: "base-files"
    blocks:
      - type: code
        id: "main"
        title: "main()"
        lang: odin
        description: "The entry point of the program. Sets up the window, kicks off the main loop, and calls update and draw every frame."
        code: |
          main :: proc () {
            player 		:= &base.player
            gameData 	:= &base.game
            state 		:= &base.state
            camera 		:= &base.camera
            settings 	:= &base.settings

            game.initialize(state, settings, gameData, camera, player)

            rl.SetConfigFlags({
              //.VSYNC_HINT,
              .WINDOW_RESIZABLE,
              .FULLSCREEN_MODE,
            })8
            rl.TraceLogLevel(.NONE)
            rl.InitWindow(settings.Screen_Width, settings.Screen_Height, "Tower Defense")
            rl.SetTargetFPS(settings.Target_FPS)

            //t.initialize_world(&world, &shaders) // has to happen after window is initialized

            for !rl.WindowShouldClose() // main loop
            {
              if !gameData.Over do game.update(state, settings, gameData, player, camera)

              settings.Screen_Height = rl.GetScreenHeight()
              settings.Screen_Width = rl.GetScreenWidth()

              rl.BeginDrawing()
              {
                rl.ClearBackground(rl.SKYBLUE)
                rl.BeginMode3D(player.Camera)
                game.draw_scene(gameData)
                rl.EndMode3D()
                rl.DrawFPS(10, 10)
                game.draw_UI(settings, gameData, player)
              }
              rl.EndDrawing()
            }

            rl.CloseWindow()
            game.unload_assets(&gameData.Grid)
          }

      - type: code
        id: "game-player"
        title: "Game & Player Structs"
        lang: odin
        description: "The Game struct holds all runtime state — entities, projectiles, waves, and notifications. The Player struct holds all combat stats and upgrade levels."
        code: |
          Game :: struct {
            Round 				: int,
            Over 				: bool,
            Entities 			: map[int]Entity,
            Projectiles 		: [dynamic]Projectile,
            Scenery 			: [300]mc.Vec3,
            Grid 				: Grid,
            Wave 				: Wave,
            Notifications 		: [dynamic]Notification,
          }

          Projectile :: struct {
            Position 	: mc.Vec3,
            Velocity 	: mc.Vec3,
          }

          Notification :: struct {
            Position 	: mc.Vec2i,
            Text 		: cstring,
            Size 		: i32,
            Color 		: rl.Color,
            Life		: f64,
          }

          game : Game

          atlas 		: rl.Texture2D
          gold_img 	: rl.Texture2D

          music_sound 		: rl.Music
          error_sound 		: rl.Sound
          gold_sound 			: rl.Sound
          upgrade_sound 		: rl.Sound
          explosion_sound 	: rl.Sound
          game_over_sound 	: rl.Sound
          damage_sound 		: rl.Sound
          shoot_sound 		: rl.Sound

          tower_mesh 	: rl.Model
          tree_mesh 	: rl.Model

          Player :: struct {
            Camera 		: rl.Camera3D,
            Max_Health 	: int,
            Health		: int,
            Regen		: int,
            Gold 		: int,
            CoolDown	: bool,
            Atk_Speed	: f32,
            Proj_Speed 	: f32,
            Damage		: int,
            Target 		: ^Entity,
            Upgrades 	: Upgrades,
            Accumulator : f32,
          }

          Upgrades :: struct {
            CoolDown 	: bool,
            DMGLVL 		: int,
            HPLVL 		: int,
            SPDLVL 		: int,
            RegenLVL	: int,
            DMG_Cost 	: int,
            HP_Cost 	: int,
            SPD_Cost 	: int,
            Regen_Cost 	: int,
          }

          player : Player

      - type: code
        id: "wave-entity-structs"
        title: "Wave & Entity Structs"
        lang: odin
        description: "The Wave struct tracks the current wave state and the pool of entities waiting to spawn. The Entity struct covers everything about an enemy — position, velocity, stats, and type. Entity_Stats defines the base values for each of the three enemy types."
        code: |
          Wave :: struct {
            Number 		: int,
            Started 	: bool,
            Max 		: int,
            Dead 		: int,
            Alive		: int,
            Entities	: [dynamic]Entity,
            Spawnrate 	: f32,
            Accumulator : f32,
            Display 	: cstring,
            Timer 		: int,
          }

          Wave_Setup :: struct {
            Greg 		: int,
            Jeffery 	: int,
            Glurb 		: int
          }

          wave_setups : [7]Wave_Setup

          Entity :: struct {
            ID: 		int,
            Position: 	mc.Vec3,
            Velocity:	mc.Vec3,
            Angle: 		f32,
            Size:  		mc.Vec3,
            Flip: 		bool,
            Speed:		f32,
            Health:		int,
            Damage:		int,
            Cooldown:	bool,
            Gold: 		int,
            Type: 		Entity_Types,
          }

          Entity_Types :: enum {
            Greg,
            Jeffery,
            Glurb,
          }

          Entity_Stats : [Entity_Types]^Entity = {
            .Greg = &Entity {
              Speed 	= 2,
              Health 	= 3,
              Damage 	= 2,
            },
            .Jeffery = &Entity {
              Speed 	= 4,
              Health 	= 1,
              Damage 	= 2,
            },
            .Glurb = &Entity {
              Speed 	= 1,
              Health 	= 5,
              Damage 	= 5,
            },
          }

          Entity_Shader : rl.Shader

          greg_mesh 		: rl.Model
          jeffery_mesh 	: rl.Model
          glurb_mesh 		: rl.Model

      - type: code
        id: "initialize"
        title: "initialize() — State, Settings & Camera"
        lang: odin
        description: "The first part of initialize() sets up the game state, window settings, and the isometric camera with its orbit parameters."
        code: |
          initialize :: proc (state : ^base.State, settings : ^base.Settings, game : ^base.Game, camera : ^base.Camera, player : ^base.Player) {
            {// initialize state
              state.Game_Time 	= 0
              state.Tick_Rate 	= 10
              state.Tick 			= 0
            }
            {// initialize settings
              settings.FOV 			= 60
              settings.Min_FOV 		= 30
              settings.Max_FOV 		= 90
              settings.Sensitivity 	= 0.4
              settings.Screen_Width	= 1280//rl.GetScreenWidth()//1280
              settings.Screen_Height	= 720//rl.GetScreenHeight()//720
              settings.Target_FPS		= 120
            }
            {// initialize camera
              camera.Zoom 				= 20
              camera.Yaw 					= -45.0 * mc.RAD
              camera.Pitch 				= 45.0 * mc.RAD
              camera.Position 			= {(camera.Zoom / 2) * math.sin(camera.Yaw) * math.cos(camera.Pitch), camera.Zoom * math.sin(camera.Pitch), (camera.Zoom / 2) * math.cos(camera.Yaw) * math.cos(camera.Pitch)}
              camera.Forward 				= rl.Vector3Normalize({math.sin(camera.Yaw) * math.cos(camera.Pitch), math.sin(camera.Pitch), math.cos(camera.Yaw) * math.cos(camera.Pitch)})
              camera.Right 				= {-math.cos(camera.Yaw), 0, math.sin(camera.Yaw)}
              camera.Up 					= rl.Vector3CrossProduct(camera.Right, camera.Forward)
              camera.Min_Zoom 			= 5
              camera.Max_Zoom 			= 100
              camera.Max_Zoom_Speed 		= 1
              camera.Min_Zoom_Speed 		= 0.1
            }

      - type: code
        id: "initialize-2"
        title: "initialize() — Game, Grid & Player"
        lang: odin
        description: "The second part initializes the game, creates the grid, and sets all the player's starting stats and upgrade costs."
        code: |
            // initialize game
            game.Over = false
            {// initialize grid
              game.Round = 1
              game.Grid = logic.create_grid()
            }
            {// initialize player
              player.Camera = {
                camera.Position,
                0,
                { 0, 1, 0 },
                settings.FOV,
                .PERSPECTIVE
              }
              player.Gold 		= 0
              player.Max_Health   = 10
              player.Health 		= 10
              player.Regen 		= 1
              player.Damage 		= 1
              player.Atk_Speed 	= 0.5
              player.Proj_Speed 	= 10
              player.CoolDown 	= false
              player.Accumulator 	= 0
              player.Upgrades.CoolDown   = false
              player.Upgrades.DMGLVL 		= 0
              player.Upgrades.HPLVL 		= 0
              player.Upgrades.RegenLVL 	= 0
              player.Upgrades.SPDLVL 		= 0
              player.Upgrades.DMG_Cost 	= 5
              player.Upgrades.HP_Cost  	= 5
              player.Upgrades.Regen_Cost 	= 5
              player.Upgrades.SPD_Cost 	= 5
            }

      - type: code
        id: "initialize-3"
        title: "initialize() — Waves"
        lang: odin
        description: "The third part sets up the wave system and defines the enemy composition for all 7 waves."
        code: |
            {// initialize waves
              game.Wave.Number = -1
              game.Wave.Started = false
              game.Wave.Alive = 0
              game.Wave.Dead = 0
              game.Wave.Spawnrate = 1
              game.Wave.Accumulator = 0
              game.Wave.Timer = 0

              waves := &base.wave_setups

              // wave 0
              waves[0].Greg = 18
              waves[0].Jeffery = 2
              waves[0].Glurb = 0
              // wave 1
              waves[1].Greg = 20
              waves[1].Jeffery = 7
              waves[1].Glurb = 3
              // wave 2
              waves[2].Greg = 20
              waves[2].Jeffery = 15
              waves[2].Glurb = 5
              // wave 3
              waves[3].Greg = 22
              waves[3].Jeffery = 20
              waves[3].Glurb = 8
              // wave 4
              waves[4].Greg = 25
              waves[4].Jeffery = 15
              waves[4].Glurb = 10
              // wave 5
              waves[5].Greg = 0
              waves[5].Jeffery = 60
              waves[5].Glurb = 0
              // wave 6
              waves[6].Greg = 10
              waves[6].Jeffery = 20
              waves[6].Glurb = 40
            }

      - type: code
        id: "initialize-assets"
        title: "initialize_assets()"
        lang: odin
        description: "Loads all models and audio. The tree placement uses the golden angle to distribute trees evenly in a ring around the map with some randomized offset per tree."
        code: |
          initialize_assets :: proc () {
            {// initialize meshes
              base.atlas = rl.LoadTexture("./Assets/Atlas.png")
              base.gold_img = rl.LoadTexture("./Assets/Money.png")
              {// environment
                base.tower_mesh = rl.LoadModel("./Assets/Tower.glb")
                base.tree_mesh = rl.LoadModel("./Assets/Tree.glb")
                scene := &base.game.Scenery
                // tree positions
                min_radius : f32 = 30
                max_radius : f32 = 50
                golden_angle :: 2.39996
                count := len(scene)
                for i in 0..<count {
                  t := f32(i) / f32(count)
                  distance := min_radius + t * (max_radius - min_radius)
                  angle := f32(i) * golden_angle
                  scene[i] = mc.Vec3{
                    distance * math.cos(angle),
                    0,
                    distance * math.sin(angle),
                  }
                  // random offset
                  distance2 := rand.float32_range(-2, 2)
                  angle2 := rand.float32_range(0, 360)
                  candidate := scene[i] + mc.Vec3{
                    distance2 * math.cos(angle2),
                    0,
                    distance2 * math.sin(angle2),
                  }
                  if mc.distance_between(candidate, 0) <= 40 {
                    scene[i] = candidate
                  } else do continue
                }
              }
              {// creatures
                base.greg_mesh = rl.LoadModel("./Assets/Greg.glb")
                base.jeffery_mesh = rl.LoadModel("./Assets/Jeffery.glb")
                base.glurb_mesh = rl.LoadModel("./Assets/Glurb.glb")
              }
            }
            {// initialize audio
              rl.InitAudioDevice()
              base.music_sound = rl.LoadMusicStream("./Assets/Music.mp3")
              base.music_sound.looping = true
              rl.SetMusicVolume(base.music_sound, 0.4)
              rl.PlayMusicStream(base.music_sound)
              base.error_sound = rl.LoadSound("./Assets/Error.mp3")
              rl.SetSoundVolume(base.error_sound, 0.5)
              base.explosion_sound = rl.LoadSound("./Assets/Explosion.mp3")
              rl.SetSoundVolume(base.explosion_sound, 0.5)
              base.upgrade_sound = rl.LoadSound("./Assets/Upgrade.mp3")
              rl.SetSoundVolume(base.upgrade_sound, 0.5)
              base.gold_sound = rl.LoadSound("./Assets/Gold.mp3")
              rl.SetSoundVolume(base.gold_sound, 0.3)
              base.game_over_sound = rl.LoadSound("./Assets/GameOver.mp3")
              rl.SetSoundVolume(base.game_over_sound, 0.5)
              base.damage_sound = rl.LoadSound("./Assets/Damage.mp3")
              rl.SetSoundVolume(base.damage_sound, 0.3)
              base.shoot_sound = rl.LoadSound("./Assets/Shoot.mp3")
              rl.SetSoundVolume(base.shoot_sound, 0.1)
            }
          }

      - type: code
        id: "update"
        title: "update()"
        lang: odin
        description: "Called every frame. Runs the wait and tween services, then dispatches all the logic functions in order."
        code: |
          update :: proc (state : ^base.State, settings : ^base.Settings, game : ^base.Game, player : ^base.Player, camera : ^base.Camera ) {
            state.DT = rl.GetFrameTime()
            state.Game_Time = rl.GetTime()
            state.Accumulator += state.DT

            mc.wait_service()
            mc.tween_service()

            player.Camera, camera^ = logic.camera_logic(camera^, settings^)
            logic.projectile_logic(state, game, player)
            logic.player_logic(state, game, player)
            logic.entity_logic(state, game, player)
            logic.notif_logic(state, game)
            logic.wave_logic(state, game)
            logic.upgrade_logic(game, player)

            // tick update
            tick_interval := 1.0 / state.Tick_Rate
            for state.Accumulator >= tick_interval {
              state.Tick += 1
              state.Accumulator -= tick_interval
            }
          }

  - title: "The Logic"
    accent: "Files"
    label: "Game Logic"
    id: "logic-files"
    blocks:
      - type: code
        id: "grid-logic"
        title: "Grid Logic — Setup & Key"
        lang: odin
        description: "I implemented a spatial hash map to handle collision detection more performantly than checking every entity against every other. create_grid() and unload_grid() handle the lifetime of the map, and position_to_key() translates a world position into a grid cell key."
        code: |
          create_grid :: proc () -> base.Grid {
            return base.Grid{
              Cells = make(map[u64]base.Cell),
              Cell_Size = 2.0 // CELL SIZE
            }
          }

          unload_grid :: proc (grid : ^base.Grid) {
            for _, cell in grid.Cells {
              delete(cell.Entities)
            }
            delete(grid.Cells)
          }

          position_to_key :: proc (grid : ^base.Grid, pos : mc.Vec3) -> u64 {
            x := i32(math.floor(pos.x / grid.Cell_Size))
            z := i32(math.floor(pos.z / grid.Cell_Size))
            return (u64(x) << 32) | u64(z)
          }

      - type: code
        id: "grid-insert-remove"
        title: "Grid Logic — Insert & Remove"
        lang: odin
        description: "Inserting and removing entities from the hash map as they move around the world."
        code: |
          insert_entity :: proc (grid : ^base.Grid, position : mc.Vec3, entity_key : int) {
            key := position_to_key(grid, position)
            if _, exists := grid.Cells[key]; !exists {
              grid.Cells[key] = base.Cell{
                Entities = make([dynamic]int, 0, 4)
              }
            }
            cell := &grid.Cells[key]
            append(&cell.Entities, entity_key)
          }

          remove_entity :: proc (grid : ^base.Grid, entity : ^base.Entity) {
            key := position_to_key(grid, entity.Position)
            if cell, exists := grid.Cells[key]; exists {
              for entity_in_cell, i in cell.Entities {
                if entity_in_cell == entity.ID {
                  unordered_remove(&cell.Entities, i)
                  break
                }
              }
            }
            cell := &grid.Cells[key]
            if len(cell.Entities) == 0 {
              delete(grid.Cells[key].Entities)
              delete_key(&grid.Cells, key)
            }
          }

          update_entity_grid :: proc (grid : ^base.Grid, entity : ^base.Entity, pos : mc.Vec3) {
            old_key := position_to_key(grid, entity.Position)
            new_key := position_to_key(grid, pos)
            // early return if still in the same cell
            if old_key == new_key do return
            remove_entity(grid, entity)
            insert_entity(grid, pos, entity.ID)
          }

      - type: code
        id: "grid-closest"
        title: "Grid Logic — Closest Entity"
        lang: odin
        description: "closest_entity() queries the spatial hash map to find the nearest enemy to a given position within a max range. The tower uses this to pick its auto-attack target."
        code: |
          closest_entity :: proc(game: ^base.Game, position: mc.Vec3, max_distance: f32) -> (id: int) {
            grid := &game.Grid
            closest_id : int = -1  // Use -1 for "not found"
            closest_distance := max_distance
            // Calculate initial search bounds in grid coordinates
            min_x := i32(math.floor((position.x - max_distance) / grid.Cell_Size))
            max_x := i32(math.floor((position.x + max_distance) / grid.Cell_Size))
            min_z := i32(math.floor((position.z - max_distance) / grid.Cell_Size))
            max_z := i32(math.floor((position.z + max_distance) / grid.Cell_Size))
            // Check all cells within the max_distance bounds at once
            for z in min_z..=max_z {
              for x in min_x..=max_x {
                key := position_to_key(grid, {f32(x), position.y, f32(z)})
                if cell, ok := grid.Cells[key]; ok {
                  for entity_id in cell.Entities {
                    if entity, exists := game.Entities[entity_id]; exists {
                      // Use proper 3D distance calculation
                      offset := entity.Position - position
                      distance := math.sqrt(offset.x*offset.x + offset.y*offset.y + offset.z*offset.z)
                      if distance < closest_distance {
                        closest_id = entity_id
                        closest_distance = distance
                        // Don't break here - we might find a closer one
                      }
                    }
                  }
                }
              }
            }
            return closest_id
          }

      - type: code
        id: "entity-logic"
        title: "Entity Logic"
        lang: odin
        description: "entity_logic() iterates over all active entities and calls update_entity() on each. update_entity() handles movement, the bobbing animation via the size.y flip, dealing damage when an entity reaches the center, and awarding gold on death."
        code: |
          entity_logic :: proc (state : ^base.State, game : ^base.Game , player : ^base.Player) {
            if game.Entities != nil {
              for _, &entity in game.Entities {
                update_entity(state, game, player, &entity)
              }
            }
          }

          update_entity :: proc (state : ^base.State, game : ^base.Game, player : ^base.Player, entity : ^base.Entity) {
            if entity.Health <= 0 {
              add_gold(player, entity.Gold)
              delete_entity(game, entity)
              game.Wave.Alive -= 1
              game.Wave.Dead += 1
              return
            }
            if mc.distance_between(entity.Position, 0) > 2 {
              new_position := entity.Position + entity.Velocity * state.DT
              update_entity_grid(&game.Grid, entity, new_position)
              entity.Position = new_position
              if entity.Flip {
                entity.Size.y -= (0.75 * entity.Speed) * state.DT
                if entity.Size.y <= 0.7 do entity.Flip = !entity.Flip
              } else {
                entity.Size.y += (0.75 * entity.Speed) * state.DT
                if entity.Size.y >= 1 do entity.Flip = !entity.Flip
              }
            } else {
              game.Wave.Alive -= 1
              game.Wave.Dead += 1
              damage_player(game, player, entity.Damage)
              delete_entity(game, entity)
            }
          }

      - type: code
        id: "new-entity"
        title: "new_entity()"
        lang: odin
        description: "Creates a new entity of a given type, spawning it at a random position on the edge of the map. Stats scale up with the current wave number."
        code: |
          new_entity :: proc (game : ^base.Game, type : base.Entity_Types) -> base.Entity {
            grid := &game.Grid
            xp_mult : f32
            switch type {
            case .Greg: 	xp_mult = 1
            case .Jeffery: 	xp_mult = 1.5
            case .Glurb: 	xp_mult = 2
            }
            distance : f32 = 30 // distance from center
            rand_direction := rand.float32_range(0, 360) * mc.RAD
            position := mc.Vec3{ math.cos(rand_direction) * distance, 0, math.sin(rand_direction) * distance }
            direction := mc.direction_between(position, 0)
            entity := base.Entity_Stats[type]^
            entity.Position = position
            entity.Velocity = direction * entity.Speed
            entity.Cooldown = false
            entity.Type = type
            entity.Size = 1
            entity.Flip = false
            angle := mc.angle_between(mc.Vec2{position.z, position.x}, 0)
            entity.Angle = mc.normalize_degrees(angle * mc.DEG)
            entity.Gold = max(int(f32(game.Wave.Number * 3) * xp_mult), int(xp_mult))
            entity.Health = max(game.Wave.Number * entity.Health * 2, entity.Health)
            entity.Damage = max(game.Wave.Number * entity.Damage, entity.Damage)
            entity.Speed = max(f32(game.Wave.Number) * entity.Speed, entity.Speed)
            return entity // return the key and entity
          }

      - type: code
        id: "wave-logic"
        title: "Wave Logic"
        lang: odin
        description: "wave_logic() handles the spawn timing during a wave, and the intermission countdown between waves. Once all enemies in the wave are dead it triggers the next one."
        code: |
          wave_logic :: proc (state : ^base.State, game : ^base.Game) {
            wave := &game.Wave
            wave.Accumulator += state.DT
            // spawn enemies
            if wave.Started {
              spawn_interval : f32 = 1.0 / wave.Spawnrate
              for wave.Accumulator >= spawn_interval {
                wave.Accumulator -= spawn_interval
                spawn_entity(game)
              }
            } else {
              for wave.Accumulator >= 1 {
                wave.Accumulator -= 1
                wave.Timer -= 1
                if wave.Timer <= 0 {
                  wave.Started = true
                }
              }
            }
            if wave.Dead == wave.Max {
              next_wave(game)
              wave.Started = false
            }
          }

          next_wave :: proc (game : ^base.Game) {
            clear(&game.Wave.Entities)
            game.Wave.Number += 1
            setup := &base.wave_setups[game.Wave.Number]
            game.Wave.Max = setup.Greg + setup.Jeffery + setup.Glurb
            game.Wave.Alive = 0
            game.Wave.Dead = 0
            game.Wave.Accumulator = 0
            game.Wave.Timer = 5 // intermission time
            game.Wave.Display = fmt.caprintf("Wave: %v", game.Wave.Number)
            id_index := 0
            for i in 0 ..< setup.Greg {
              entity := new_entity(game, .Greg)
              entity.ID = id_index
              append(&game.Wave.Entities, entity)
              id_index += 1
            }
            for i in 0 ..< setup.Jeffery {
              entity := new_entity(game, .Jeffery)
              entity.ID = id_index
              append(&game.Wave.Entities, entity)
              id_index += 1
            }
            for i in 0 ..< setup.Glurb {
              entity := new_entity(game, .Glurb)
              entity.ID = id_index
              append(&game.Wave.Entities, entity)
              id_index += 1
            }
          }

          spawn_entity :: proc (game : ^base.Game) {
            if len(game.Wave.Entities) == 0 do return
            //index := int(rand.float32_range(0, f32(len(game.Wave.Entities)) - 1))
            entity := game.Wave.Entities[0]
            game.Wave.Alive += 1
            game.Entities[entity.ID] = entity
            insert_entity(&game.Grid, entity.Position, entity.ID)
            unordered_remove(&game.Wave.Entities, 0)
            msg := fmt.aprintf("Spawned: %v", entity.Type)
            color : rl.Color
            switch entity.Type {
            case .Greg: color = rl.BLUE
            case .Jeffery: color = rl.YELLOW
            case .Glurb: color = rl.PURPLE
            }
            new_notif(msg, {0, -20}, 20, 2, color)
          }

      - type: code
        id: "player-logic"
        title: "Player Logic"
        lang: odin
        description: "Handles the auto-attack cooldown, health regen, taking damage, awarding gold, and ending the game. Uses the wait service to manage the attack cooldown timer."
        code: |
          player_logic :: proc (state : ^base.State, game : ^base.Game, player : ^base.Player) {
            closest_id := closest_entity(game, 0, 20)
            if closest_id != -1 { player.Target = &game.Entities[closest_id] } else do player.Target = nil
            // attack
            if !player.CoolDown {
              if player.Target != nil {
                player.CoolDown = true
                mc.wait(f64(player.Atk_Speed), proc(){
                  player := &base.player
                  player.CoolDown = false
                })
                create_projectile(game, player)
              }
            }
            player.Accumulator += state.DT
            interval : f32 = 1.0
            for player.Accumulator >= interval {
              player.Accumulator -= interval
              player.Health = min(player.Health + player.Regen, player.Max_Health)
            }
          }

          damage_player :: proc (game : ^base.Game, player : ^base.Player, damage : int) {
            player.Health -= damage
            if player.Health <= 0 do end_game(game)
            else do rl.PlaySound(base.damage_sound)
          }

          end_game :: proc (game : ^base.Game) {
            game.Over = true
            rl.PauseMusicStream(base.music_sound)
            rl.PlaySound(base.explosion_sound)
            rl.PlaySound(base.game_over_sound)
          }

          add_gold :: proc (player : ^base.Player, amount : int) {
            player.Gold += amount
            msg := fmt.aprintf("+%v Gold", amount)
            new_notif(msg, {0, -20}, 20, 2, rl.GOLD)
            rl.PlaySound(base.gold_sound)
          }

      - type: code
        id: "upgrade-logic"
        title: "Upgrade Logic — Input Handler"
        lang: odin
        description: "Reads number key input and routes to the appropriate upgrade. Checks funds before purchasing and puts upgrades on a short cooldown to prevent spamming. There's a lot of repeated code here — something I'd collapse into a single generic upgrade function nowadays."
        code: |
          upgrade_logic :: proc (game : ^base.Game, player : ^base.Player) {
            if rl.IsKeyPressed(.ONE) {
              if player.Upgrades.CoolDown{
                new_notif("Cooldown!", {0, -20}, 20, 2, rl.RED)
                return
              }
              if _check_funds(player.Gold, player.Upgrades.DMG_Cost) {
                _purchase(player, player.Upgrades.DMG_Cost)
                upgrade_damage(game, player)
              }
            }
            if rl.IsKeyPressed(.TWO) {
              if player.Upgrades.CoolDown{
                new_notif("Cooldown!", {0, -20}, 20, 2, rl.RED)
                return
              }
              if _check_funds(player.Gold, player.Upgrades.SPD_Cost) {
                _purchase(player, player.Upgrades.SPD_Cost)
                upgrade_atk_speed(game, player)
              }
            }
            if rl.IsKeyPressed(.THREE) {
              if player.Upgrades.CoolDown{
                new_notif("Cooldown!", {0, -20}, 20, 2, rl.RED)
                return
              }
              if _check_funds(player.Gold, player.Upgrades.HP_Cost) {
                _purchase(player, player.Upgrades.HP_Cost)
                upgrade_hp(game, player)
              }
            }
            if rl.IsKeyPressed(.FOUR) {
              if player.Upgrades.CoolDown{
                new_notif("Cooldown!", {0, -20}, 20, 2, rl.RED)
                return
              }
              if _check_funds(player.Gold, player.Upgrades.Regen_Cost) {
                _purchase(player, player.Upgrades.Regen_Cost)
                upgrade_regen(game, player)
              }
            }
            _purchase :: proc (player : ^base.Player, cost : int) {
              player.Gold -= cost
              player.Upgrades.CoolDown = true
              rl.PlaySound(base.upgrade_sound)
              mc.wait(1, proc(){
                base.player.Upgrades.CoolDown = false
              })
            }
            _check_funds :: proc (gold, cost : int) -> bool {
              if gold < cost {
                new_notif("Not Enough Gold!", {0, -20}, 20, 2, rl.RED)
                rl.PlaySound(base.error_sound)
              }
              return gold >= cost
            }
          }

      - type: code
        id: "upgrade-functions"
        title: "Upgrade Logic — Upgrade Functions"
        lang: odin
        description: "Each upgrade increments its level, scales the cost, and applies the stat change. Honestly there's probably a clean way to collapse all four of these into one function — something I'd try now."
        code: |
          upgrade_damage :: proc (game : ^base.Game, player : ^base.Player) {
            player.Upgrades.DMGLVL += 1
            player.Upgrades.DMG_Cost = player.Upgrades.DMGLVL * 20
            player.Damage += min(player.Upgrades.DMGLVL, 4)
            new_notif("Damage Upgraded!", {0, -20}, 20, 2, rl.PINK)
          }

          upgrade_atk_speed :: proc (game : ^base.Game, player : ^base.Player) {
            player.Upgrades.SPDLVL += 1
            player.Upgrades.SPD_Cost = player.Upgrades.SPDLVL * 20
            player.Atk_Speed = max(player.Atk_Speed - (f32(player.Upgrades.SPDLVL) * 0.01), 0.05)
            new_notif("Attack Speed Upgraded!", {0, -20}, 20, 2, rl.PINK)
          }

          upgrade_hp :: proc (game : ^base.Game, player : ^base.Player) {
            player.Upgrades.HPLVL += 1
            player.Upgrades.HP_Cost = player.Upgrades.HPLVL * 15
            player.Max_Health = 10 + player.Upgrades.SPDLVL * 5
            new_notif("Max Health Upgraded!", {0, -20}, 20, 2, rl.PINK)
          }

          upgrade_regen :: proc (game : ^base.Game, player : ^base.Player) {
            player.Upgrades.RegenLVL += 1
            player.Upgrades.Regen_Cost = player.Upgrades.RegenLVL * 20
            player.Regen += min(player.Upgrades.RegenLVL * 2, 5)
            new_notif("Regen Upgraded!", {0, -20}, 20, 2, rl.PINK)
          }

      - type: code
        id: "camera-logic"
        title: "Camera Logic"
        lang: odin
        description: "Handles rotating the isometric camera with middle mouse drag and zooming with scroll wheel. The zoom speed scales down as you get close to the minimum to avoid clipping through the ground."
        code: |
          camera_logic :: proc (camera : base.Camera, settings : base.Settings) -> (rl.Camera3D, base.Camera) {
            cam     : rl.Camera3D
            config  := camera
            config.Forward = rl.Vector3Normalize({
              math.sin(config.Yaw) * math.cos(config.Pitch),
              math.sin(config.Pitch),
              math.cos(config.Yaw) * math.cos(config.Pitch)
            })
            config.Right = mc.Vec3{ math.cos(config.Yaw), 0, -math.sin(config.Yaw) }
            config.Up = rl.Vector3CrossProduct(config.Right, config.Forward)
            // rotate logic
            if rl.IsMouseButtonDown(.MIDDLE) {
              mouse_dx := rl.GetMouseDelta().x * settings.Sensitivity
              mouse_dy := rl.GetMouseDelta().y * settings.Sensitivity
              config.Yaw -= mouse_dx * mc.RAD
              config.Pitch += mouse_dy * mc.RAD
              config.Pitch = math.clamp(config.Pitch, 0.1, math.PI * 0.49) // avoid flipping & clipping through ground
            }
            // zoom logic
            scroll := rl.GetMouseWheelMove()
            if scroll != 0 {
              if config.Zoom < config.Min_Zoom + 5 {
                config.Zoom -= scroll * max(config.Min_Zoom_Speed, config.Max_Zoom_Speed * (math.abs(config.Zoom - config.Min_Zoom) * 0.1))
              } else {
                config.Zoom -= scroll * config.Max_Zoom_Speed
              }
              if config.Zoom < config.Min_Zoom { config.Zoom = config.Min_Zoom }
              if config.Zoom > config.Max_Zoom { config.Zoom = config.Max_Zoom }
            }
            // update the config's position
            config.Position = {
              config.Zoom * math.sin(config.Yaw) * math.cos(config.Pitch),
              config.Zoom * math.sin(config.Pitch),
              config.Zoom * math.cos(config.Yaw) * math.cos(config.Pitch)
            }
            // set a new camera
            cam = {
              config.Position,
              0,
              { 0, 1, 0 },
              settings.FOV,
              .PERSPECTIVE
            }
            return cam, config
          }

      - type: code
        id: "projectile-logic"
        title: "Projectile Logic"
        lang: odin
        description: "create_projectile() fires a projectile toward the current target. projectile_logic() steps each projectile forward and checks for hits using the spatial hash map. The collision detection is pretty rough here — something I'd redo with a cleaner approach."
        code: |
          create_projectile :: proc (game : ^base.Game, player : ^base.Player) {
            projectile : base.Projectile
            projectile.Position = {0, 0.75, 0}
            projectile.Velocity = mc.direction_between(projectile.Position, player.Target.Position) * player.Proj_Speed
            projectile.Velocity.y = 0
            append(&game.Projectiles, projectile)
            rl.PlaySound(base.shoot_sound)
          }

          projectile_logic :: proc (state : ^base.State, game : ^base.Game, player : ^base.Player) {
            for &projectile, index in game.Projectiles {
              closest_id := closest_entity(game, projectile.Position, 4)
              target : ^base.Entity
              if closest_id != -1 { target = &game.Entities[closest_id] } else do target = nil
              distance : f32
              distance_zero_target : f32
              distance_zero_proj : f32
              collision_course : bool
              hit := false
              if target != nil {
                distance_zero_target = mc.distance_between(mc.Vec2{target.Position.x, target.Position.z}, 0)
                collision_course = mc.dot(projectile.Velocity,target.Position - projectile.Position) > 0.98
              }
              n_velocity := projectile.Velocity / 5
              for i in 0 ..< 5 {
                distance_zero_proj = mc.distance_between(mc.Vec2{projectile.Position.x, projectile.Position.z}, 0)
                if target != nil {
                  distance = mc.distance_between(mc.Vec2{target.Position.x, target.Position.z}, mc.Vec2{projectile.Position.x, projectile.Position.z})
                  if (distance <= 1 || distance_zero_proj >= distance_zero_target) && collision_course {
                    hit = true
                  }
                }
                new_pos := projectile.Position + n_velocity * state.DT
                projectile.Position = new_pos
              }
              if hit {
                target.Health -= player.Damage
                unordered_remove(&game.Projectiles, index)
              }
              if distance_zero_proj >= 40 do unordered_remove(&game.Projectiles, index)
            }
          }

      - type: code
        id: "notif-logic"
        title: "Notification Logic"
        lang: odin
        description: "notif_logic() removes notifications once their lifetime expires. new_notif() creates a new notification, pushes older ones up the screen, and caps the stack at 5."
        code: |
          notif_logic :: proc (state : ^base.State, game : ^base.Game) {
            notifs := &game.Notifications
            for &e, i in notifs {
              if e.Life <= state.Game_Time {
                ordered_remove(notifs, i)
                continue
              }
            }
          }

          new_notif :: proc (msg : string, pos: mc.Vec2i, size, life : i32, color : rl.Color) {
            game := &base.game
            state := &base.state
            notif : base.Notification
            text := fmt.ctprintf(msg)
            time := state.Game_Time + f64(life)
            notif.Position = pos
            notif.Size = size
            notif.Life = time
            notif.Color = color
            notif.Text = text
            for &e, i in game.Notifications {
              e.Position.y -= size + 10
            }
            if len(game.Notifications) >= 5 {
              ordered_remove(&game.Notifications, 0)
            }
            append(&game.Notifications, notif)
          }

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "Building this game taught me a lot about lower level coding, memory management, and how games work without an engine doing the heavy lifting. Not using a game engine is a challenging experience I think every aspiring game developer should try at least once. The code is far from perfect and there are plenty of things I'd do differently now, but it was a genuinely good learning experience."
---