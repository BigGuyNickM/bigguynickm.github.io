---
layout: portfolio-post
title: "2D Procedural Animations"
date: 2024-11-29
category: coding
priority: 2
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832060/Procedural_Animations_Final_ktneiz.webp"
blog_post: "2d-procedural-animations"
description: "A small 2D procedural animation prototype I made for my 2D Game Design class to explore new areas of coding. The salamander's body, legs, movement, and collisions are all generated and animated entirely with code, with no hand-drawn frames."

details:
  Programs Used: "Vanilla JavaScript, HTML"

blocks:
  - type: note
    id: "link"
    title: "Play it in your browser"
    text: "https://bigguynick.itch.io/2dgd-prototype"

  - type: image
    id: "final"
    title: "The Salamander"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832060/Procedural_Animations_Final_ktneiz.webp"
    alt: "Polished creature with collidable blocks and color orbs"
    description: "The finished creature chasing the mouse, picking up color changing orbs, and running into solid blocks."

  - type: image
    id: "collisions"
    title: "Collisions"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832059/Procedural_Animations_Collisions_wrotnr.webp"
    alt: "Collision points visualized with yellow circles"
    description: "The yellow circles are the collision points the creature checks against the block."

  - type: image
    id: "multiple"
    title: "Multiple Creatures"
    animated: true
    src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832061/Procedural_Animations_Multiple_tig9cx.webp"
    alt: "Multiple creatures at once"
    description: "The same system running on several creatures at once."

  - type: text
    id: "technical"
    title: "Technical"
    paragraphs:
      - "The body is a chain of points. The head steers toward a target with a limited turn speed, which gives it some weight, and every other point stays a fixed distance behind the one in front of it. Angle limits keep the body from folding over itself, and the smooth outline is drawn by curving through points offset to each side of the chain."
      - "The legs use inverse kinematics, stepping to a new spot whenever they stretch too far and kicking up a little dust, with opposite legs stepping out of phase. Collision is a custom check that finds the closest point on a block to each body segment and pushes the segment back out."
---