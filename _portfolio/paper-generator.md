---
layout: portfolio-post
title: "Paper Generator"
date: 2026-10-01
category: coding
priority: 1
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909583/Paper_Generator_Showcase_jjlfm0.webp"
blog_post: "paper-generator"
description: "A Blender add-on that turns a PDF or a folder of images into 3D pages, then scatters them along a curve or inside a shape."

details:
  Programs Used: "Python, Blender 5.2"

blocks:
  - type: text
    id: "how-it-works"
    title: "How It Works"
    paragraphs:
      - "Pick either a PDF or a folder of images, and the add-on turns every page into its own 3D object with automatic materials. PDFs are converted to images first using PyMuPDF, which installs with one click the first time you use it."
      - "Then, customize how your pages are scattered. Curve mode stacks them along a bezier curve, and the shape modes scatter them inside a generated mesh. You can play around with the offset and rotation parameters, or [TAB] into edit mode to alter the scatter-mesh or curve. There are two types of applicable paper textures, which are textured and wrinkled, which automatically get applied to the pages. Finalize converts everything into individual 3D objects with their materials."

  - type: note
    id: "link"
    title: "Get It on GitHub"
    text: "https://github.com/BigGuyNickM/Paper-Generator-Blender-Addon"

  - type: image
    id: "setup"
    title: "Quick Setup"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909579/Paper_Generator_Setup_rmendy.webp"
    alt: "Setting up the Paper Generator panel in Blender"
    description: "Choose a source, set the page size, pick a placement type, and hit Generate from the sidebar panel."

  - type: image
    id: "showcase"
    title: "Showcase"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909583/Paper_Generator_Showcase_jjlfm0.webp"
    alt: "Paper pages generated and scattered by the add-on"
    description: "You can play around with the rotation and offset parameters, then hit finalize once you're happy with the result."

  - type: gallery
    id: "material-geonodes"
    title: "Material & Geometry Nodes"
    columns: 2
    description: "The pages are built with Geometry Nodes, and the materials generated during the finalization."
    images:
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909578/Paper_Generator_Materials_dhcrda.webp"
        alt: "Material setup used by the add-on"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909578/Paper_Generator_Geo_Nodes_mbiour.webp"
        alt: "Geometry Nodes setup used by the add-on"

  - type: gallery
    id: "curves"
    title: "Curve Placement"
    columns: 1
    description: "Pages stacked along a curve, which you can edit at any time."
    images:
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909578/Paper_Generator_Curve_1_rlhfom.webp"
        alt: "Pages placed along a curve"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909579/Paper_Generator_Curve_2_gwpeov.webp"
        alt: "Pages placed along a second curve"

  - type: gallery
    id: "3d-shapes"
    title: "3D Shape Scatter"
    columns: 2
    description: "Pages scattered inside volumes, here is a sphere and a cube."
    images:
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909583/Paper_Generator_Sphere_k7exan.webp"
        alt: "Pages scattered inside a sphere"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909583/Paper_Generator_Square_l8ww77.webp"
        alt: "Pages scattered inside a cube"

  - type: gallery
    id: "2d-shapes"
    title: "2D Shape Scatter"
    columns: 3
    description: "Pages scattered across flat shapes. Square, circle, and triangles are a few of the shapes available."
    images:
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909578/Paper_Generator_Circle_numn6l.webp"
        alt: "Pages scattered in a circle"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909578/Paper_Generator_Rectangle_djbyd0.webp"
        alt: "Pages scattered in a rectangle"
      - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1790909583/Paper_Generator_Triangle_ocvyhu.webp"
        alt: "Pages scattered in a triangle"
---