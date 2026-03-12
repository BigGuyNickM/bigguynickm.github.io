---
layout: post
title: "Jack O' Lantern"
date: 2025-11-03
category: 3d
featured: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341277/JackOLantern_Final_Render_zvy0v7.jpg"
description: "A jack o' lantern project for my Advanced Modeling class. I went with a cat o' lantern since I love cats (who doesn't?). Sculpted the base in Blender, retopologized it, then baked and textured in Substance Painter."

details:
  Render Size: "2048×2048 px"
  Programs Used: "Blender, Autodesk Maya, Adobe Substance Painter"
  Poly Count: "19,344 tris"
  Texture Size: "2048×2048 px"

toc:
  - label: "Renders"
    id: "renders"
  - label: "Breakdown"
    id: "breakdown"
  - label: "Sculpt"
    id: "sculpt"
    sub: true
  - label: "Retopology"
    id: "retopo"
    sub: true
  - label: "Texturing"
    id: "texture"
    sub: true
  - label: "Lighting & Composition"
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
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341277/JackOLantern_Final_Render_zvy0v7.jpg"
            alt: "Final render of the cat o' lantern"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341280/JackOLantern_Clay_Render_allqid.jpg"
            alt: "Clay render of the cat o' lantern"

  - title: "The"
    accent: "Process"
    label: "Breakdown"
    id: "breakdown"
    blocks:
      - type: image
        id: "sculpt"
        title: "Sculpt"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341356/JackOLantern_Sculpt_l9pk70.png"
        description: "I started by sculpting the pumpkin shape in Blender. Sculpting let me get all the organic bumps and surface detail in without worrying about clean topology at this stage."

      - type: image
        id: "retopo"
        title: "Retopology"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341325/JackOLantern_Retopology_vqebqp.png"
        description: "I then retopologized it to get a cleaner mesh that's easier to UV unwrap and work with. Since this is a static object I wasn't too strict about the topology, I just needed it clean enough to look good in the render and hold the baked details well."

      - type: text
        id: "texture"
        title: "Texturing"
        paragraphs:
          - "In Substance Painter I baked the high poly sculpt details down onto the retopo mesh, so all that surface texture carries over without the heavy geometry. From there I used a mix of noise textures and hand painted parts to give the pumpkin a realistic skin look."

      - type: image
        id: "texture-view"
        title: "Texture View"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341367/JackOLantern_Texture_okn3cz.png"
        description: "The textured model in Substance Painter after baking."

      - type: image
        id: "lighting"
        title: "Lighting & Composition"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341321/JackOLantern_Lighting_oz8wja.png"
        description: "I brought it into Maya to set up the camera and lighting. I used a basic 3-point setup and added a light inside the pumpkin to get that glow coming out of the eyes and mouth. I went with a deep purple background to complement the orange of the pumpkin."

      - type: image
        id: "final"
        title: "Final Render"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773341277/JackOLantern_Final_Render_zvy0v7.jpg"
        description: "The finished render out of Maya. Really happy with how the cat face came out and the glow effect on the eyes and mouth."
---