---
layout: post
title: "Snow Globe"
date: 2025-11-22
category: 3d
featured: false
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340183/Snowglobe_Final_Render_whercf.jpg"
description: "A holiday-themed project for my Advanced Modeling class. I wanted to do something scene-based rather than a single prop, so I built a stylized snow globe with a snowman and presents inside, and hand-painted wooden house and tree decorations on the outside."

details:
  Render Size: "2048×2048 px"
  Programs Used: "Blender, Autodesk Maya, Adobe Substance Painter"
  Poly Count: "51,536 tris (High poly for rendering)"
  Texture Size: "2048×2048 px"

toc:
  - label: "Renders"
    id: "renders"
  - label: "Process"
    id: "process"
  - label: "Modeling"
    id: "model"
    sub: true
  - label: "Texturing"
    id: "texture"
    sub: true
  - label: "Lighting & Particles"
    id: "lighting"
    sub: true
  - label: "Final Render"
    id: "final"
    sub: true

sections:
  - title: "Final"
    accent: "Renders"
    label: "Renders"
    id: "renders"
    blocks:
      - type: gallery
        id: "renders"
        title: "Final & Clay Renders"
        columns: 2
        description: "Final textured render alongside the clay render."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340183/Snowglobe_Final_Render_whercf.jpg"
            alt: "Final render of the snow globe"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340186/Snowglobe_Clay_Render_fqxfb0.jpg"
            alt: "Clay render of the snow globe"

  - title: "The"
    accent: "Process"
    label: "Breakdown"
    id: "process"
    blocks:
      - type: text
        id: "model"
        title: "Modeling"
        paragraphs:
          - "I modeled everything in Blender. The inside of the globe has a snowman and some presents, and the outside is decorated with little wooden block shapes in the form of houses and trees, meant to look like hand-painted ornaments."

      - type: gallery
        id: "model-views"
        title: "Model Views"
        columns: 2
        description: "Clean and wireframe views of the individual pieces."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340259/Snowglobe_Clean1_c9sfk0.png"
            alt: "Clean model view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340330/Snowglobe_Wireframe1_humlbg.png"
            alt: "Wireframe view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340272/Snowglobe_Clean2_xijlkv.png"
            alt: "Clean model view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340253/Snowglobe_Wireframe2_pgctf8.png"
            alt: "Wireframe view 2"

      - type: image
        id: "model-assembly"
        title: "Full Assembly"
        src: "snow-globe-all-together"
        description: "Everything assembled together before texturing."

      - type: text
        id: "texture"
        title: "Texturing"
        paragraphs:
          - "I textured in Substance Painter. I went for a hand-painted look on the houses and trees to sell that wooden ornament feel, and I think it came out pretty well. For the rest I kept it simple and just used noise textures to get the effects I wanted, like the snow on the ground and the snowman."

      - type: gallery
        id: "texture-views"
        title: "Texture Views"
        columns: 3
        description: "Textured model from multiple angles in Substance Painter."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340306/Snowglobe_Texture1_awluoy.png"
            alt: "Texture view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340316/Snowglobe_Texture2_eiirzf.png"
            alt: "Texture view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340321/Snowglobe_Texture3_yefgm3.png"
            alt: "Texture view 3"

      - type: text
        id: "lighting"
        title: "Lighting & Particles"
        paragraphs:
          - "I brought everything into Maya for lighting and rendering. I set up a basic 3-point lighting with some extra lights for highlights. I also got to try out Maya's particle system for the first time to get the falling snow effect, which was a lot of fun to mess around with."

      - type: gallery
        id: "lighting-views"
        title: "Lighting & Particle Setup"
        columns: 2
        description: "The lighting setup and particle system setup in Maya."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340298/Snowglobe_Lighting_vlkelx.png"
            alt: "Lighting setup in Maya"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340302/Snowglobe_Particles_ycqlip.png"
            alt: "Particle system for snow effect"

      - type: image
        id: "final"
        title: "Final Render"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773340183/Snowglobe_Final_Render_whercf.jpg"
        description: "The finished render out of Maya. Pretty happy with how it all came together, especially the hand-painted ornaments on the outside."
---