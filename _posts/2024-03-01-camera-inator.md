---
layout: post
title: "Camera-Inator"
date: 2024-03-01
category: 3d
featured: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773163636/CameraInator_Final_Render_ef1gch.jpg"
description: "Here's a description about the post."

details:
  Render Size: "2048×2048 px"
  Programs Used: "Blender, Autodesk Maya, Adobe Substance Painter"
  Poly Count: "14,200 tris"
  Texture Size: "2048×2048 px"

toc:
  - label: "Section One"
    id: "one"
  - label: "Image"
    id: "image"
    sub: true
  - label: "Quote"
    id: "quote"
    sub: true
  - label: "Text"
    id: "text"
    sub: true
  - label: "Code"
    id: "code"
    sub: true
  - label: "Warning"
    id: "warning"
    sub: true
  - label: "Note"
    id: "note"
    sub: true

  - label: "Section Two"
    id: "two"
  - label: "Gallery"
    id: "gallery"
    sub: true
  - label: "Gallery 2"
    id: "gallery 2"
    sub: true
  - label: "Comparison"
    id: "comparison"
    sub: true

sections:
  - title: "Section"
    accent: "One"
    label: "First"
    id: "one"
    blocks:
      - type: image
        id: "image"
        title: "Image"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773163636/CameraInator_Final_Render_ef1gch.jpg"
        description: "Here's a description about the image."

      - type: quote
        id: "quote"
        text: "Here's a quote"
        author: "Mr. Man"

      - type: text
        id: "text"
        title: "Text"
        paragraphs:
          - "Here's a sentence."
          - "Oh man a second sentence!?"

      - type: code
        title: "Code"
        id: "code"
        lang: "odin"
        code: |
          package render

          RenderConfig :: struct {
            width:    int,
            height:   int,
            filepath: string,
          }

          default_config :: proc() -> RenderConfig {
            return RenderConfig{
              width    = 2048,
              height   = 2048,
              filepath = "/renders/final",
            }
          }
        description: "Here's a description about the code."

      - type: warning
        id: "warning"
        title: "Warning"
        text: "Here's a warning."

      - type: note
        id: "note"
        title: "Note"
        text: "Here's a Note"

  - title: "Section"
    accent: "Two"
    label: "Second"
    id: "two"
    blocks:
      - type: gallery
        id: "gallery"
        title: "Gallery"
        description: "Four images, 3 columns."
        images:
          - src: "https://picsum.photos/seed/g1/800/800"
            alt: "one"
          - src: "https://picsum.photos/seed/g2/800/800"
            alt: "two"
          - src: "https://picsum.photos/seed/g3/800/800"
            alt: "three"
          - src: "https://picsum.photos/seed/g4/800/800"
            alt: "four"

      - type: gallery
        id: "gallery 2"
        title: "Gallery 2"
        columns: 2
        description: "Four images, 2 columns."
        images:
          - src: "https://picsum.photos/seed/clay1/800/800"
            alt: "one"
          - src: "https://picsum.photos/seed/final1/800/800"
            alt: "two"
          - src: "https://picsum.photos/seed/clay2/800/800"
            alt: "three"
          - src: "https://picsum.photos/seed/final2/800/800"
            alt: "four"

      - type: compare
        id: "comparison"
        title: "Comparison"
        before:
          src: "https://picsum.photos/seed/clay1/800/800"
          alt: "one"
        after:
          src: "https://picsum.photos/seed/final1/800/800"
          alt: "two"
        description: "Here's two images being compared (use the slider)."

---