---
layout: post
title: "Game Ready Character"
date: 2026-02-10
category: 3d
featured: true
hero_focus: 10
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370314/Game-Ready-Character_Final_cm497k.webp"
description: "I created a low poly character for a personal game project I'm working on in Godot, and attempted 3D animation for the first time."

details:
  Programs Used: "Blender, Adobe Substance Painter, Godot"

toc:
  - label: "Process"
    id: "process"
  - label: "Reference"
    id: "reference"
    sub: true
  - label: "Rough Model"
    id: "rough"
    sub: true
  - label: "Remodel"
    id: "remodel"
    sub: true
  - label: "Texturing"
    id: "texturing"
    sub: true
  - label: "Rig & Animations"
    id: "rig-animations"
  - label: "Rig"
    id: "rig"
    sub: true
  - label: "Animations"
    id: "animations"
    sub: true

sections:
  - title: "The"
    accent: "Process"
    label: "Breakdown"
    id: "process"
    blocks:
      - type: image
        id: "reference"
        title: "Reference Drawing"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370647/Game-Ready-Character_char_ref_wfnumu.webp"
        description: "I wanted to go for a very cartoony body type, so I drew it kind of stocky and rounded off."

      - type: gallery
        id: "rough"
        title: "Rough Model & Texture"
        columns: 3
        description: "I created a rough mock-up of the character with some textures to get down the proportions and style early on. I decided to exaggerate parts like the hands and the lean of the character. I also decided to have separated arms since the character is so low poly and stylized, having connected shoulders would be difficult to make look good."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370268/Game-Ready-Character_Rough_1_jjzijz.webp"
            alt: "Rough model front"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370272/Game-Ready-Character_Rough_2_p8zrlt.webp"
            alt: "Rough model side"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370275/Game-Ready-Character_Rough_Tex_dpzpqn.webp"
            alt: "Rough model with texture"

      - type: gallery
        id: "remodel"
        title: "Remodel"
        columns: 2
        description: "I remodeled the character to be overall higher poly, but still conserving most of the poly count towards the shape and silhouette. I wanted a more refined look overall, with cleaner topology and better defined forms compared to the rough."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370328/Game-Ready-Character_Refined_1_iplcnz.webp"
            alt: "Refined model front"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370332/Game-Ready-Character_Refined_2_bkopu0.webp"
            alt: "Refined model side"

      - type: image
        id: "texturing"
        title: "Texturing"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370279/Game-Ready-Character_Substance_r2owza.webp"
        description: "I used Substance Painter to texture the character and went for a cartoon-esque style. I went with 512x512 resolution since the character will be decently sized on screen, but not directly in front of the camera."

      - type: gallery
        id: "texture-views"
        columns: 2
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370306/Game-Ready-Character_Body_Tex_m9bggq.webp"
            alt: "Body texture view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370310/Game-Ready-Character_Body_Tex_2_btu8tf.webp"
            alt: "Body texture view 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370298/Game-Ready-Character_Arm_Tex_1_ferom4.webp"
            alt: "Arm texture view 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370302/Game-Ready-Character_Arm_Tex_2_dydloq.webp"
            alt: "Arm texture view 2"

  - title: "Rig &"
    accent: "Animations"
    label: "Bringing it to Life"
    id: "rig-animations"
    blocks:
      - type: image
        id: "rig"
        title: "Rig"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370265/Game-Ready-Character_Rig_bybh0j.webp"
        description: "I set up a simple rig in Blender with basic leg IK controls. Nothing too complex, just enough to get clean deformations and make the animation process manageable. It was also interesting dealing with deformations at such a low poly count, I had to manually triangulate most of the rig to ensure it looked correct when posed."

      - type: image
        id: "animations"
        title: "Idle"
        animated: true
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370283/Game-Ready-Character_Idle_ajyhs9.webp"
        alt: "Idle animation"

      - type: image
        id: "walk"
        title: "Walk"
        animated: true
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370294/Game-Ready-Character_Walk_civj2w.webp"
        alt: "Walk animation"

      - type: image
        id: "run"
        title: "Run"
        animated: true
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370287/Game-Ready-Character_Run_x4la9k.webp"
        alt: "Run animation"

      - type: image
        id: "sprint"
        title: "Sprint"
        animated: true
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773370290/Game-Ready-Character_Sprint_ovtrwy.webp"
        alt: "Sprint animation"

      - type: note
        id: "anim-note"
        title: "First Time Animating"
        text: "I've never animated in 3D before, and I've had very limited experience with animating in general. I also didn't look up references or guides, I wanted to challenge myself to learn the skill completely on my own. I think the animations turned out pretty well all things considered, though they might be slightly stiff."

      - type: note
        id: "godot-note"
        title: "Godot"
        text: "I made this character for a game I'm working on in Godot. I've mostly scripted the movement code but it isn't done yet, so I haven't included it here."
---