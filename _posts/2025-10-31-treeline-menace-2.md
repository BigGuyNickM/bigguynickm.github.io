---
layout: post
title: "Treeline Menace 2"
date: 2025-10-31
category: 3d
featured: true
hero_focus: 40
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415175/Treeline_Menace2_Final_Poster_rhzksa.webp"
description: "A full production pipeline project for my Advanced Modeling class. I had to create and render a 3D scene in Maya, texture everything in Substance Painter, and composite a photo of myself into it. I chose to remaster an older horror movie poster I made two years prior, originally done entirely in 2D vector art. This time I rebuilt everything from scratch in 3D."

details:
  Render Size: "2160×3240 px (4K 2:3)"
  Programs Used: "Blender, Autodesk Maya, Adobe Substance Painter, Adobe Photoshop, Figma"

toc:
  - label: "Renders"
    id: "renders"
  - label: "The Monster"
    id: "monster"
  - label: "Reference"
    id: "monster-ref"
    sub: true
  - label: "Sculpting"
    id: "sculpt"
    sub: true
  - label: "Retopology"
    id: "retopo"
    sub: true
  - label: "UVs"
    id: "uvs"
    sub: true
  - label: "Texturing"
    id: "monster-texture"
    sub: true
  - label: "Rigging"
    id: "rig"
    sub: true
  - label: "The Assets"
    id: "assets"
  - label: "Trees"
    id: "trees"
    sub: true
  - label: "Ground"
    id: "ground"
    sub: true
  - label: "Baseball Bat"
    id: "bat"
    sub: true
  - label: "Putting It Together"
    id: "scene"
  - label: "Photography"
    id: "photo"
    sub: true
  - label: "Scene Composition"
    id: "composition"
    sub: true
  - label: "Lighting & Post"
    id: "lighting-post"
  - label: "Lighting"
    id: "lighting"
    sub: true
  - label: "Post Production"
    id: "post"
    sub: true
  - label: "Movie Title"
    id: "title"
    sub: true

sections:
  - title: "Final"
    accent: "Renders"
    label: "Renders"
    id: "renders"
    blocks:
      - type: gallery
        id: "finals"
        title: "Final Products"
        columns: 3
        description: "The clean composite, the finished movie poster, and the original 2D vector poster from two years prior that this whole project is a remaster of."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415174/Treeline_Menace2_Final_Clean_phduj4.webp"
            alt: "Final clean composite"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415175/Treeline_Menace2_Final_Poster_rhzksa.webp"
            alt: "Final movie poster"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773438930/Treeline_Menace1_Poster_zghs8e.webp"
            alt: "Original 2D poster from two years prior"

      - type: gallery
        id: "renders"
        title: "3D Renders"
        columns: 2
        description: "Beauty and clay renders straight out of Maya."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415283/Treeline_Menace2_Render_txjghe.webp"
            alt: "Final render"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415171/Treeline_Menace2_Clay_Render_bvkzff.webp"
            alt: "Clay render"

  - title: "The"
    accent: "Monster"
    label: "Monster"
    id: "monster"
    blocks:
      - type: image
        id: "monster-ref"
        title: "Reference Sketch"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415265/Treeline_Menace2_Monster_Ref_vtquou.webp"
        description: "I started the whole project with the hero asset: the monster. Drew out a reference first to have something to work from."

      - type: gallery
        id: "sculpt"
        title: "Sculpting"
        columns: 3
        description: "I brought the reference into Blender and built a blockout first, then sculpted out the base form before moving on to the finer details."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415170/Treeline_Menace2_Blockout_1_swfria.webp"
            alt: "Blockout front"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415170/Treeline_Menace2_Blockout_2_r9uzc1.webp"
            alt: "Blockout side"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415178/Treeline_Menace2_Finished_sculpt_MatCap_hw78by.webp"
            alt: "Finished sculpt with matcap"

      - type: gallery
        id: "retopo"
        title: "Retopology"
        columns: 2
        description: "With the sculpt done I had to retopologize the whole thing since I planned on rigging it. It was grueling, but necessary to speed up the later stages."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415287/Treeline_Menace2_Retopology_2_y60sam.webp"
            alt: "Retopology in progress"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415288/Treeline_Menace2_Retopology_3_on6mj7.webp"
            alt: "Retopology in progress"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415292/Treeline_Menace2_Retopology_Finished_Front_j6oevm.webp"
            alt: "Finished retopo front"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415291/Treeline_Menace2_Retopology_Finished_Back_ducpx6.webp"
            alt: "Finished retopo back"

      - type: gallery
        id: "uvs"
        title: "UVs"
        columns: 2
        description: "After retopo I unwrapped the UVs before bringing it into Substance Painter. Checked the stretching with a grid texture to make sure everything was clean."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415302/Treeline_Menace2_UVs_uahk2v.webp"
            alt: "UV shells"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415302/Treeline_Menace2_UVs_2_kwf5i6.webp"
            alt: "Grid texture on monster to check UV stretching"

      - type: image
        id: "monster-texture-bake"
        title: "Baking"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415273/Treeline_Menace2_Normals_Baked_nbnvzr.webp"
        description: "I brought the retopo mesh into Substance Painter and baked the high res sculpt detail down onto it. Getting a clean normal bake here is what makes the whole texture work."

      - type: gallery
        id: "monster-texture"
        title: "Texturing"
        columns: 2
        description: "I wanted it to look really pasty and fleshy. Pale, almost sickly skin with a rough surface quality to it."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415298/Treeline_Menace2_Texture_Front_rvzka3.webp"
            alt: "Textured monster front"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415297/Treeline_Menace2_Texture_Back_to7ejn.webp"
            alt: "Textured monster back"

      - type: image
        id: "rig"
        title: "Rig"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415269/Treeline_Menace2_Monster_Rig_sasp6w.webp"
        description: "Brought the character into Maya to rig it. I tried making a decently advanced shoulder rig, and I think it worked pretty well and gave me a really nice range of motion when posing the monster."

      - type: gallery
        id: "rig-details"
        columns: 3
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415269/Treeline_Menace2_Monster_Rig_Pose_xxzg45.webp"
            alt: "Monster rig posed"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415269/Treeline_Menace2_Monster_Rig_Weights_zyngma.webp"
            alt: "Skin weights"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415272/Treeline_Menace2_Monster_Rig_Weights2_upnvei.webp"
            alt: "Skin weights detail"

  - title: "The"
    accent: "Assets"
    label: "Assets"
    id: "assets"
    blocks:
      - type: gallery
        id: "tree-build"
        title: "Trees"
        columns: 3
        description: "I built a pine tree and textured it in Substance Painter. The leaves are just planes with a leaf texture on them, same trick I used for the grass blades later."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415277/Treeline_Menace2_Pine_Tree_Model_hbflwt.webp"
            alt: "Pine tree model"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415280/Treeline_Menace2_Pine_Tree_Texture_jojmql.webp"
            alt: "Pine tree in Substance Painter"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415275/Treeline_Menace2_Pine_Tree_Finished_xszqs2.webp"
            alt: "Finished pine tree"

      - type: gallery
        id: "tree-renders"
        title: "Tree Renders"
        columns: 3
        description: "I rendered out 3 variants of the tree to scatter across the background of the scene."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773416356/Treeline_Menace2_Pine_1_mcluoy.webp"
            alt: "Pine tree render variant 1"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773416361/Treeline_Menace2_Pine_2_tanxdj.webp"
            alt: "Pine tree render variant 2"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773416355/Treeline_Menace2_Pine_3_bca6d3.webp"
            alt: "Pine tree render variant 3"

      - type: image
        id: "ground"
        title: "Ground"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415220/Treeline_Menace2_Ground_Texture_vvyeig.webp"
        description: "I sculpted the terrain in Maya and textured it in Substance Painter. This was my first time making a realistic scene so it was fun to figure out how to make it look genuinely real."

      - type: gallery
        id: "bat"
        title: "Baseball Bat"
        columns: 2
        description: "The last asset. I Modeled it in Blender and ran it through the same pipeline as everything else."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415169/Treeline_Menace2_Baseball_Bat_Mesh_hyu4um.webp"
            alt: "Baseball bat mesh"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415169/Treeline_Menace2_Baseball_Bat_Texture_kw3rsg.webp"
            alt: "Baseball bat texture"

  - title: "Putting It"
    accent: "Together"
    label: "Composition"
    id: "scene"
    blocks:
      - type: image
        id: "photo"
        title: "Photography"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415264/Treeline_Menace2_Me_Photo_bvh4xs.webp"
        description: "I booked the green screen studio on campus and used one of the school's professional cameras. I wanted a shot of me looking up at the monster holding the bat, a standoff kind of feel. The photo didn't come out as great as I hoped, but I knew I could fix it with editing later."

      - type: image
        id: "scene-sketch"
        title: "Composition Sketch"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415282/Treeline_Menace2_Poster_Sketch_eqmeou.webp"
        description: "Before touching Maya I sketched out how I wanted the scene to look. I didn't end up following it exactly, but it helped me nail down the general idea."

      - type: gallery
        id: "blockout"
        title: "Blocking Out the Scene"
        columns: 2
        description: "I built out a base composition in Maya, constantly checking the rendered view as I went to make sure I liked where it was heading."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415292/Treeline_Menace2_Scene_Blockout_f4n26p.webp"
            alt: "Scene blockout"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415293/Treeline_Menace2_Scene_Blockout_Render_pqt86z.webp"
            alt: "Scene blockout render"

      - type: gallery
        id: "composition"
        title: "Finished Scene"
        columns: 2
        description: "After many hours of tweaking every single asset I finally had the scene where I wanted it. I ended up going with a completely different pose for the monster than I originally planned, but it turned out way better."
        images:
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415176/Treeline_Menace2_Final_Scene_bylhhg.webp"
            alt: "Finished scene"
          - src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415178/Treeline_Menace2_Final_Scene_2_tdicei.webp"
            alt: "Finished scene angle 2"

  - title: "Lighting &"
    accent: "Post"
    label: "Final Touches"
    id: "lighting-post"
    blocks:
      - type: image
        id: "lighting-fog"
        title: "Foreground Lighting"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415186/Treeline_Menace2_Fog_Lighting_qld4vn.webp"
        description: "I lit the scene in passes. I started with the foreground fog since it set the tone for the kind of lighting I wanted across the whole piece."

      - type: image
        id: "lighting-monster"
        title: "Midground Lighting"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415264/Treeline_Menace2_Monster_Lighting_kbj8so.webp"
        description: "Then I lit the monster, making sure it felt grounded in the scene and not like it was floating in front of a backdrop."

      - type: image
        id: "lighting-env"
        title: "Background Lighting"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415173/Treeline_Menace2_Environment_Lighting_onjgax.webp"
        description: "Finally I added the environment lighting to tie everything together."

      - type: image
        id: "render"
        title: "Render"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415283/Treeline_Menace2_Render_txjghe.webp"
        description: "The finished render out of Maya."

      - type: image
        id: "post-import"
        title: "Importing to Photoshop"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415255/Treeline_Menace2_Imported_rjxpqv.webp"
        description: "I brought a JPEG render and a handful of useful AOVs into Photoshop and tweaked them with various blend modes to make certain parts of the image pop."

      - type: image
        id: "post"
        title: "Compositing"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415172/Treeline_Menace2_Composited_kp1kgx.webp"
        description: "I composited myself into the scene, added a moon and stars, and adjusted the overall lighting. The composite could've been cleaner, but I was working with what I had from that greenscreen shoot."

      - type: image
        id: "post-final"
        title: "Final Product"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415174/Treeline_Menace2_Final_Clean_phduj4.webp"
        description: "I ran everything through Camera Raw to dial in the colors, then added some vignetting to the edges and top of the image."

      - type: image
        id: "title"
        title: "Movie Title"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415273/Treeline_Menace2_Movie_Title_Figma_ajgqxd.webp"
        description: "I wanted to pay homage to the original poster, which had a pretty dumb name that I love. I brought the finished image into Figma and went through a ton of different title styles before settling on this jagged neon sign look. I'm not totally sold on it and might revisit it someday."

      - type: image
        id: "final-poster"
        title: "Final Poster"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1773415175/Treeline_Menace2_Final_Poster_rhzksa.webp"

      - type: note
        id: "final-notes"
        title: "Reflections"
        text: "I learned a lot doing this project. Going in I had some experience with lighting and rigging, but this pushed both of those skills further than I'd taken them before. I'm still not going to claim mastery over either, but I'm happy with where I ended up. And like any project, there's a long list of things I'd do differently if I did it again."
---