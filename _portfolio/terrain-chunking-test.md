---
layout: portfolio-post
title: "Terrain Chunking Test Project"
date: 2025-02-14
category: coding
priority: 2
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832973/Terrain_Chunker_Grass_qb1jmx.webp"
blog_post: "terrain-chunking"
description: "I wanted to learn how to create a custom mesh with textures through code, and it spiraled into a chunk-based terrain painter that uses a dual grid system, plus a little dabble into instancing meshes through shaders."

details:
  Programs Used: "Odin Lang, Raylib"

blocks:
  - type: image
    id: "painting"
    title: "Painting Terrain"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832975/Terrain_Chunker_Painting_h60zst.webp"
    alt: "The autotiler in action with the painting mechanic"
    description: "Painting tiles onto the terrain, with the edges and corners picking the right tile automatically."

  - type: image
    id: "grass"
    title: "Instanced Grass"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832973/Terrain_Chunker_Grass_qb1jmx.webp"
    alt: "The grass blades shader in action"
    description: "Thousands of grass blades drawn in a single call with a custom shader."

  - type: image
    id: "chunks"
    title: "Chunk System"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832968/Terrain_Chunker_Chunks_qinjky.webp"
    alt: "The chunk system working as you move around"
    description: "Chunks load and unload around the camera as you move."

  - type: image
    id: "tilesheet"
    title: "Tilesheet"
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832969/Terrain_Chunker_TestTileSheet_t4mx4b.webp"
    alt: "Terrain tilesheet for the dual grid system"
    description: "The tilesheet I made for the dual grid system."

  - type: text
    id: "technical"
    title: "Technical"
    paragraphs:
      - "The world is a grid of chunks, and each chunk is a mesh I build by hand in code, with only the chunks near the camera being drawn. The tiles use a dual grid, where the visual tiles sit offset by half a tile and pick their sprite from the four tiles around them, so the whole tileset only needs 15 tiles. Painting only rewrites the UVs of the few visual tiles it touches instead of rebuilding the mesh."
      - "The grass is instanced. One small mesh of random blades is generated once, then a single draw call places it on every grass tile with its own transform, using a hash of the tile coordinates for the rotation so its varied."
---