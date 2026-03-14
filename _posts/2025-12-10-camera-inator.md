---
layout: post
title: "Camera-inator"
date: 2025-12-10
category: 3d
featured: false
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773163636/CameraInator_Final_Render_ef1gch.jpg"
description: "A hard surface modeling project for my Advanced Modeling class — had to design a Doofenshmirtz-inspired Inator, so I made the Camera-inator, a device that freezes time in the form of an image (get it?). Went for a hand-painted texture style and kept the poly count low with game asset work in mind."

details:
  Render Size: "2048×2048 px"
  Programs Used: "Blender, Autodesk Maya, Adobe Substance Painter"
  Poly Count: "11,968 tris"
  Texture Size: "2048×2048 px"

toc:
  - label: "Renders"
    id: "renders"
  - label: "Process"
    id: "process"
  - label: "Reference Sketch"
    id: "sketch"
    sub: true
  - label: "Modeling"
    id: "model"
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
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773163636/CameraInator_Final_Render_ef1gch.jpg"
            alt: "Final render of the Camera-inator"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338334/Camera-Inator_Clay_Render_v4e42c.jpg"
            alt: "Clay render of the Camera-inator"

  - title: "The"
    accent: "Process"
    label: "Breakdown"
    id: "process"
    blocks:
      - type: image
        id: "sketch"
        title: "Reference Sketch"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338130/Camera-Inator-Sketch_uubw5e.png"
        description: "I knew I wanted to do a camera, so I sketched out a quick concept before jumping in. The goal was to make it feel overly complicated in that classic inator way, so I just kept piling on random elements until it somehow still felt like a cohesive design."

      - type: text
        id: "model"
        title: "Modeling"
        paragraphs:
          - "With the sketch as a loose guide I built the model out in Blender. I kept the poly count intentionally low as both a challenge and to keep up the habit of thinking like a game asset modeler."

      - type: gallery
        id: "model-views"
        title: "Model Views"
        columns: 2
        description: "Clean and wireframe views from multiple angles."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338269/Camera-Inator_clean_1_ky5jps.png"
            alt: "Clean model view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338258/Camera-Inator_wireframe_1_mnf3fl.png"
            alt: "Wireframe view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338292/Camera-Inator_clean_2_ptk0pn.png"
            alt: "Clean model view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338261/Camera-Inator_wireframe_2_hdkydn.png"
            alt: "Wireframe view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338325/Camera-Inator_clean_3_a6svbg.png"
            alt: "Clean model view 3"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338263/Camera-Inator_wireframe_3_k2zoxd.png"
            alt: "Wireframe view 3"

      - type: text
        id: "texture"
        title: "Texturing"
        paragraphs:
          - "I brought the model into Substance Painter to texture it. I wanted to try a hand-painted look instead of my usual PBR approach, which was a fun challenge. I think it suits the personality of the model pretty well."

      - type: gallery
        id: "texture-views"
        title: "Texture Views"
        columns: 3
        description: "Textured model from multiple angles in Substance Painter."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338251/Camera-Inator_Texture_1_xwxpcx.png"
            alt: "Texture view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338253/Camera-Inator_Texture_2_eov2nm.png"
            alt: "Texture view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338256/Camera-Inator_Texture_3_rxfhys.png"
            alt: "Texture view 3"

      - type: image
        id: "lighting"
        title: "Lighting & Composition"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773338249/Camera-Inator_Lighting_ywthjo.png"
        description: "I brought the model into Maya to set up the scene and lighting. I went with a floor that has some subtle reflections, which is pretty different from my usual setups. Honestly it might clash a bit with the painterly textures but I think it works out."

      - type: image
        id: "final"
        title: "Final Render"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773163636/CameraInator_Final_Render_ef1gch.jpg"
        description: "The finished render out of Maya. Pretty happy with how it came together overall — the painted style gave it a lot of character and I think it fits the vibe of the project well."
---