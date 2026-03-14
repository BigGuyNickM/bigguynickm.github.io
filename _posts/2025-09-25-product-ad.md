---
layout: post
title: "Product Ad"
date: 2025-09-25
category: 3d
featured: false
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359175/Product-Ad_FinalProduct_vdl2yr.webp"
description: "A project for my Advanced Modeling class where I modeled a bottle in Maya, textured it using both Maya's aiStandardSurface and Photoshop, then rendered it and composited it into a finished product ad."

details:
  Render Size: "1920×1080 px"
  Programs Used: "Autodesk Maya, Adobe Photoshop"

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
  - label: "Lighting & Render"
    id: "lighting"
    sub: true
  - label: "AOVs & Compositing"
    id: "composite"
    sub: true
  - label: "Final Composite"
    id: "final-composite"
    sub: true

sections:
  - title: "Final"
    accent: "Renders"
    label: "Renders"
    id: "renders"
    blocks:
      - type: gallery
        id: "renders"
        columns: 2
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359184/Product-Ad_Render_q1nkmy.webp"
            alt: "Beauty render"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359169/Product-Ad_ClayRender_d0dv33.webp"
            alt: "Clay render"

  - title: "The"
    accent: "Process"
    label: "Breakdown"
    id: "process"
    blocks:
      - type: image
        id: "model"
        title: "Modeling"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359164/Product-Ad_BottleHighPolyScreenshot_p607rl.webp"
        description: "I started by modeling the bottle in low poly, then applied Maya's subdivision to bring it up to high poly."

      - type: image
        id: "texture"
        title: "Texturing"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359178/Product-Ad_LabelTextureScreenshot_x8c2er.webp"
        description: "For the label and cap I made the textures in Photoshop. The bottle body and liquid were handled entirely in Maya using aiStandardSurface, tweaking the refraction and transmission values to get the glass and liquid looking right."

      - type: gallery
        id: "lighting"
        title: "Lighting & Render"
        columns: 2
        description: "I set up the lighting and scene in Maya, then rendered out as an EXR with AOVs split so I'd have more control in the compositing step."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359181/Product-Ad_LightsScreenshot_lncuiy.webp"
            alt: "Scene lighting setup"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359184/Product-Ad_Render_q1nkmy.webp"
            alt: "Render out of Maya"

      - type: gallery
        id: "composite"
        title: "AOVs & Compositing"
        columns: 2
        description: "I brought all the AOVs into Photoshop and layered them up to get the final look. Once the render was dialed in I added the text and other graphic elements to finish it off as an ad."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359159/Product-Ad_AOVSScreenshot_ullimu.webp"
            alt: "AOVs in Photoshop"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359172/Product-Ad_DetailsScreenshot_wfkosk.webp"
            alt: "Compositing details in Photoshop"

      - type: image
        id: "final-composite"
        title: "Final Composite"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773359175/Product-Ad_FinalProduct_vdl2yr.webp"
        description: "After we had a critique in class, I changed the text and layout of the elements with the feedback I was given. I believe the end result is definitely better than my first pass at it."
---