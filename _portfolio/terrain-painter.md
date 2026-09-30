---
layout: portfolio-post
title: "Terrain Painter"
date: 2024-11-29
category: game
priority: 2
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046451/Terrain_Brushes_uqdylq.webp"
blog_post: "terrain-painter"
description: "A 2D terrain painter I made in vanilla JavaScript for my 2D Game Design class. It auto-generates islands, and you can then reshape them however you like with a set of brushes and a custom lighting system."

details:
  Programs Used: "Vanilla JavaScript, HTML"

blocks:
  - type: note
    id: "link"
    title: "Play it in your browser"
    text: "https://bigguynick.itch.io/terrain-painter"

  - type: image
    id: "islands"
    title: "Generated Islands"
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046448/Terrain_screenshot2_rkfggw.webp"
    alt: "Custom islands"
    description: "Every map starts as a fresh island chain generated from noise."

  - type: image
    id: "brushes"
    title: "Brushes"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046451/Terrain_Brushes_uqdylq.webp"
    alt: "Brush tools in action"
    description: "Four brush modes for reshaping the land: erode, build, smooth, and flatten."

  - type: image
    id: "lighting"
    title: "Lighting System"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1774046450/Terrain_Lighting_eyiuse.webp"
    alt: "Dynamic lighting and shadows on terrain"
    description: "Shadows are cast from the peaks and update live as you sculpt."

  - type: text
    id: "technical"
    title: "Technical"
    paragraphs:
      - "The map is a 180 by 180 grid where every tile stores a single height value. The islands come from Perlin noise that I wrote myself, layered over five octaves so you get big landmasses with finer detail on top, and the height grabs a color from a range to simulate water, sand, grass, and mountain smoothly."
      - "The lighting finds ridges that face the sun and casts shadows from them, with taller peaks casting longer shadows that stop when they run into other terrain. To keep sculpting fast, only tiles that changed get redrawn, and shadows are only recalculated around the brush."
      - "This project does not use the GPU at all, which made it very difficult to get it working at a decent frame rate, especially with the shadows."
---