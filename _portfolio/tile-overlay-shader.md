---
layout: portfolio-post
title: "Tile Overlay Shader"
date: 2026-02-13
category: coding
priority: 1
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589988/Sorry_Youre_Dead_Shader_v1kfwb.webp"
blog_post: "sorry-youre-dead-game"
blog_anchor: "tiles-shaders"
description: "A shader I made that overlays large, tileable textures across tiles using world coordinates, with seeded random detail placement. It gives nearly infinite visual variety from one tile-sheet with almost no extra work from the artist."

blocks:
  - type: image
    id: "editor"
    title: "How it's used"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589988/Sorry_Youre_Dead_Shader_v1kfwb.webp"
    alt: "Shader running in the Godot editor"

  - type: gallery
    id: "textures"
    title: "Overlay & Detail Textures"
    columns: 3
    description: "The 5x5 tile overlay texture, plus the grass and flower detail textures the shader places randomly. The detail textures are split as quarter tiles for even more variation."
    images:
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589983/Sorry_Youre_Dead_Grass_Overlay_kelz8o.webp"
        alt: "Grass overlay texture"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589981/Sorry_Youre_Dead_Grass_Details_pesemo.webp"
        alt: "Grass blades decor"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589979/Sorry_Youre_Dead_Flower_Details_ra2ijg.webp"
        alt: "Flowers decor"

  - type: image
    id: "in-game"
    title: "In-Game"
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773589982/Sorry_Youre_Dead_Grass_Finished_dbew93.webp"
    alt: "Grass in game with shader and dual grid"

  - type: image
    id: "more-tiles"
    title: "More tiles"
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309899/Sorry_Youre_Dead_Tile_Types_szi5uf.webp"
    alt: "More tiles"
    description: "Using the same shader you can achieve a lot of variety on as many tilesheets as you want."

  - type: image
    id: "tiles-in-action"
    title: "Some Tiles in Action"
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777309897/Sorry_Youre_Dead_Road_vnwiv9.webp"
    alt: "Road tiles in game"
    description: "Several tile types working together to create a road."

  - type: text
    id: "technical"
    title: "Technical"
    paragraphs:
      - "The shader finds pixels in the tile art that match a mask color and swaps them for a large overlay texture. It samples the overlay by world position instead of per tile, so one texture flows seamlessly across many tiles."
      - "Details like grass tufts and flowers are placed by hashing each quarter tile cell's position with a seed, since shaders have no random function. The result looks random but is identical every run, and changing the seed gives a whole new layout."
---