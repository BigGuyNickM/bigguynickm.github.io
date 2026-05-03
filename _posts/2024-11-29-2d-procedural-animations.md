---
layout: post
title: "2D Procedural Animations"
date: 2024-11-29
category: coding
featured: false
hero_animated: true
thumbnail: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832063/Procedural_Animtions_Step_3_cbvakc.gif"
description: "I made this small 2D procedural animation prototype for my 2D game design class, mostly to explore new areas of coding and expand my skillset. Everything is generated with code."

details:
  Programs Used: "Vanilla Javascript, HTML"

toc:
  - label: "Visual Process"
    id: "visual-process"
  - label: "Main Script"
    id: "main-script"
  - label: "Parameters & Initialize"
    id: "parameters-initialize"
    sub: true
  - label: "Animation Loop"
    id: "animation-loop"
    sub: true
  - label: "Particles"
    id: "particles"
    sub: true
  - label: "Helper Functions"
    id: "helper-functions"
    sub: true
  - label: "User Input"
    id: "user-input"
    sub: true
  - label: "Creature Script"
    id: "creature-script"
  - label: "Salamander Object"
    id: "salamander-object"
    sub: true
  - label: "CreateAnimal"
    id: "create-animal"
    sub: true
  - label: "CreatePoints"
    id: "create-points"
    sub: true
  - label: "DrawAnimal & DrawPart"
    id: "draw-animal"
    sub: true
  - label: "Animate Script"
    id: "animate-script"
  - label: "CalculateMovement"
    id: "calculate-movement"
    sub: true
  - label: "Constraints"
    id: "constraints"
    sub: true
  - label: "Legs IK"
    id: "legs-ik"
    sub: true
  - label: "Collision"
    id: "collision"
    sub: true
  - label: "Final Note"
    id: "final-note"

sections:
  - title: "Visual"
    accent: "Process"
    label: "Step by Step"
    id: "visual-process"
    blocks:
      - type: warning
        id: "old-code-warning"
        title: "Old Code"
        text: "The code in this project (as of 2026 me, this was made in 2024) is quite bad and unorganized, and very very verbose. The code itself doesn't reflect my current skillset, however the result of said code is pretty cool so I felt it was worthy to show off."

      - type: note
        id: "Link"
        title: "Playable Example"
        text: "https://bigguynick.itch.io/2dgd-prototype"

      - type: image
        id: "step-1"
        title: "Step 1 - Segments Following Each Other"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832061/Procedural_Animtions_Step_1_nmbdc5.gif"
        alt: "GIF of segments following each other"
        description: "I started by creating an array of points that are constrained to each other, so when the head point moves the rest follows naturally."
        animated: true

      - type: image
        id: "step-2"
        title: "Step 2 - Draw Body"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832062/Procedural_Animtions_Step_2_qxn2av.gif"
        alt: "GIF of body drawn over segments"
        description: "I then draw a cleaner representation of the creature over those segments."
        animated: true

      - type: image
        id: "step-3"
        title: "Step 3 - Constraints & Clean-up"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832063/Procedural_Animtions_Step_3_cbvakc.gif"
        alt: "GIF of creature with movement constraints and legs"
        description: "I added more movement constraints to make it behave more naturally, and made it resemble a salamander. I also added legs and eyes!"
        animated: true

      - type: image
        id: "step-4"
        title: "Step 4 - Polish"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832060/Procedural_Animations_Final_ktneiz.webp"
        alt: "GIF of polished creature with collidable blocks and color orbs"
        description: "Finally, I polished up the movement, added collidable blocks, and color changing orbs. I also added footstep particles but they're not very visible here."
        animated: true

  - title: "The"
    accent: "Main Script"
    label: "Core Loop"
    id: "main-script"
    blocks:
      - type: code
        id: "parameters-initialize"
        title: "Parameters & Initialize()"
        lang: javascript
        description: "These are all just some basic parameters for the program to use. Nowadays I would definitely break a lot of these systems up into separate scripts, such as the particles, game objects, and colors."
        code: |
          var mouse = {x: 0, y: 0}

          var animals = []

          const minAngle = toRadians(120)

          var Collidables = [
          	{x: 1000, y: 200, w: 400, h: 200, color: '#c75a66'},
          ]

          var ColorPalletes = [
          	{animal: '#3cba7b', ground: '#323d54', wall: '#c75a66', groundOffset: '#2a344a', wallOffset: '#b54854'},
          	{animal: '#c75a66', ground: '#323d54', wall: '#c75a66', groundOffset: '#2a344a', wallOffset: '#b54854'},
          	{animal: '#d0d175', ground: '#323d54', wall: '#c75a66', groundOffset: '#2a344a', wallOffset: '#b54854'},
          	{animal: '#a471d1', ground: '#323d54', wall: '#c75a66', groundOffset: '#2a344a', wallOffset: '#b54854'},
          	{animal: '#719fd1', ground: '#323d54', wall: '#c75a66', groundOffset: '#2a344a', wallOffset: '#b54854'},
          ]

          var Colors = ColorPalletes[0]

          var particleBuffer = []
          var gameObjects = []

          initialize()

          function initialize(){
          	createAnimal(salamander)
          	startAnimating(60)
          }

      - type: code
        id: "animation-loop"
        title: "Animation Loop"
        lang: javascript
        description: "These functions are the main update/animation loop for the program, and handle calling all necessary functions for the game to run and render."
        code: |
          var frameCount = 0
          var fps, fpsInterval, startTime, now, then, elapsed

          function startAnimating(fps) {
          	fpsInterval = 1000 / fps
          	then = window.performance.now()
          	startTime = then
          	animate()
          }

          function animate(newtime) {
          	requestAnimationFrame(animate)
          	now = newtime
          	elapsed = now - then

          	if (elapsed > fpsInterval) {
          		then = now - (elapsed % fpsInterval)
          		var sinceStart = now - startTime
          		var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100

          		c.clearRect(0, 0, canvas.width, canvas.height)

          		if (particleBuffer.length > 0) {
          			drawParticles()
          		}
          		if (gameObjects.length > 0) {
          			drawObjects()
          		}

          		//moveBlock()
          		let animalLen = animals.length
          		for(let i = 0; i < animalLen; i++){
          			animals[i].debug = []
          			HeadConstraint(animals[i], minAngle)
          			angleConstraint(animals[i], minAngle)
          			calculateMovement(animals[i])
          			checkTileCollisions(animals[i])
          			checkObjCollisions(animals[i])
          			createPoints(animals[i])
          			drawAnimal(animals[i])
          			if(gameObjects.length > 0){
          				animals[i].targetX = gameObjects[0].x
          				animals[i].targetY = gameObjects[0].y
          			} else {
          				animals[i].targetX = mouse.x
          				animals[i].targetY = mouse.y
          			}
          		}

          		if(Collidables.length > 0){
          			for(let i = 0; i < Collidables.length; i++){
          				drawTile(Collidables[i])
          			}
          		}
          	}
          }

      - type: code
        id: "particles"
        title: "Particles"
        lang: javascript
        description: "These functions handle the creation and rendering of particles. I made the direction they move random, and each particle has basic parameters like size, color, and amount."
        code: |
          function particles(x, y, color, amt, size, speed, duration){
          	for(let i = 0; i < amt; i++){
          		let targetAngle = (ran()*2) * pi
          		let targetX = x + Math.cos(targetAngle) * (duration * ran())
          		let targetY = y + Math.sin(targetAngle) * (duration * ran())
          		let col = hexToRGB(color)
          		particleBuffer.push({x: x, y: y, size: size*ran(), targetX: targetX, targetY: targetY, color: col, transparency: 1, speed: 1+(speed*ran())})
          	}
          	drawParticles()
          }

          function drawParticles() {
          	// Update particles
          	for (let i = particleBuffer.length - 1; i >= 0; i--) {
          		let part = particleBuffer[i]
          		part.x = lerp(part.x, part.targetX, 0.1 / part.speed)
          		part.y = lerp(part.y, part.targetY, 0.1 / part.speed)
          		part.transparency = lerp(part.transparency, 0, 0.1 / part.speed)
          		part.size = lerp(part.size, 5, 0.1 / part.speed)
          		if (part.transparency < 0.01) {
          			particleBuffer.splice(i, 1)
          		} else {
          			c.beginPath()
          			c.fillStyle = `rgba(${part.color}, ${part.transparency})`
          			c.arc(part.x, part.y, part.size, 0, 2 * pi)
          			c.fill()
          			c.closePath()
          		}
          	}
          }

      - type: code
        id: "helper-functions"
        title: "Helper Functions"
        lang: javascript
        description: "These functions are just simple trigonometry equations that help with all of the vector math this project requires. There is also a hex to RGB converter because I apparently decided to store the colors as hex and then convert to RGB later on, which is an interesting choice."
        code: |
          function toDegrees(radians) {
          	return radians * (180 / pi);
          }

          function toRadians(degrees) {
          	return normalizeAngle(degrees * (pi / 180));
          }

          function calculateDistance(x1, y1, x2, y2) {
          	return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          }

          function calculateAngle(x1, y1, x2, y2) {
          	return Math.atan2(y2 - y1, x2 - x1);
          }

          function normalizeAngle(angle){
          	return ((angle + 2*pi) % (2*pi));
          }

          function averageAngle(part, i) {
          	let angle1 = part.angle[i - 1]
          	let angle2 = part.angle[i + 1]
          	let x1 = Math.cos(angle1)
          	let y1 = Math.sin(angle1)
          	let x2 = Math.cos(angle2)
          	let y2 = Math.sin(angle2)
          	let avgX = (x1 + x2) / 2
          	let avgY = (y1 + y2) / 2
          	return normalizeAngle(Math.atan2(avgY, avgX))
          }

          function averageAngle2(i, j) {
          	let x1 = Math.cos(i)
          	let y1 = Math.sin(i)
          	let x2 = Math.cos(j)
          	let y2 = Math.sin(j)
          	let avgX = (x1 + x2) / 2
          	let avgY = (y1 + y2) / 2
          	return normalizeAngle(Math.atan2(avgY, avgX))
          }

          function nearestAngle(angle, increment, exclusion) {
          	let nearest = normalizeAngle(round(angle / increment) * increment)
          	if (nearest === exclusion) {
          		let nearPos = normalizeAngle(nearest + increment)
          		let nearNeg = normalizeAngle(nearest - increment)
          		let diff1 = normalizeAngle(nearPos - angle)
          		let diff2 = normalizeAngle(angle - nearNeg)
          		if (diff1 === diff2)
          			nearest = nearPos
          		else nearest = diff1 < diff2 ? nearPos : nearNeg
          	}
          	return nearest
          }

          function hexToRGB(hex) {
          	hex = hex.replace(/^#/, '')
          	let r = parseInt(hex.substring(0, 2), 16)
          	let g = parseInt(hex.substring(2, 4), 16)
          	let b = parseInt(hex.substring(4, 6), 16)
          	return `${r}, ${g}, ${b}`
          }

      - type: code
        id: "user-input"
        title: "User Input"
        lang: javascript
        description: "The event listeners just listen for the user's input and call the corresponding functions for the action."
        code: |
          addEventListener('mousemove', (event) => {
          	mouse.x = event.clientX
          	mouse.y = event.clientY
          })

          addEventListener('mousedown', (event) => {
          	particles(
          		mouse.x,
          		mouse.y,
          		Colors.groundOffset,
          		8,
          		40,
          		1,
          		50
          	)
          	spawnAnimalOrb(mouse.x, mouse.y)
          })

  - title: "The"
    accent: "Creature Script"
    label: "Body & Drawing"
    id: "creature-script"
    blocks:
      - type: code
        id: "salamander-object"
        title: "Salamander Object"
        lang: javascript
        description: "This is an object for all of the 'salamander' creature's parameters. I made this system to be able to create different creature types with various limbs, segments, sizes, etc. The main issue here is that it's still pretty limited so it kind of fails to achieve the whole goal of the system since everything ends up looking mostly the same."
        code: |
          var salamander = {
          	targetX: undefined,
          	targetY: undefined,
          	len: 9,
          	dist: 40,
          	speed: 5,
          	turn: 8,
          	color: '#3cba7b',
          	x: [],
          	y: [],
          	angle: [],
          	dist: 40,
          	dista: [40, 40, 40, 40, 40, 40, 40, 40, 40],
          	size: [30, 20, 30, 30, 30, 20, 10, 7, 4],
          	points: [],
          	eyes: [],
          	legAttachs: [2, 2, 4, 4],
          	legs: [
          		{
          			startX: 0,
          			startY: 0,
          			targetX: 0,
          			targetY: 0,
          			stepX: 0,
          			stepY: 0,
          			len: 3,
          			x: [],
          			y: [],
          			angle: [],
          			points: [],
          			legLengths: [35, 35],
          			size: [10, 10, 10]
          		},
          	],
          }

      - type: code
        id: "create-animal"
        title: "CreateAnimal()"
        lang: javascript
        description: "createAnimal() creates a new animal object based on the type you pass through, and populates its starting parameters, then calls functions to construct its actual body. I absolutely dislike that I passed through 'a', which is just shorthand for 'animal', but is so abstract that it just creates pointless confusion. I'd never do something like this today."
        code: |
          function createAnimal(a){
          	let newAnimal = JSON.parse(JSON.stringify(a))
          	newAnimal.x[0] = ran()*canvas.width//canvas.width/2
          	newAnimal.y[0] = ran()*canvas.height//canvas.height/2
          	newAnimal.angle[0] = 0

          	for(let i = 1; i < a.len; i++){
          		newAnimal.x[i] = newAnimal.x[i-1] - newAnimal.dista[i]
          		newAnimal.y[i] = newAnimal.y[i-1] + 1
          		distanceConstraint(newAnimal.x[i], newAnimal.y[i], newAnimal.x[i-1], newAnimal.y[i-1], newAnimal, i, newAnimal.dist)
          	}

          	newAnimal.legs[0].startX = newAnimal.x[newAnimal.legAttachs[0]]
          	newAnimal.legs[0].startY = newAnimal.y[newAnimal.legAttachs[0]]

          	for(let i = 1; i < newAnimal.legAttachs.length; i++){
          		let newLeg = JSON.parse(JSON.stringify(newAnimal.legs[0]))
          		newLeg.startX = newAnimal.x[newAnimal.legAttachs[i]]
          		newLeg.startY = newAnimal.y[newAnimal.legAttachs[i]]
          		newAnimal.legs.push(newLeg)
          		setLegTarget(newAnimal)
          		for (let i = 0; i < newAnimal.legs.length; i++) {
          			solveIK(newAnimal.legs[i])
          		}
          	}

          	animals.push(newAnimal)
          }

      - type: code
        id: "create-points"
        title: "CreatePoints()"
        lang: javascript
        description: "createPoints() sets the points used to draw the creature. The way this works is by having two points on every segment on the creature (or more for head and tail) on each side of the segment. These points are then connected to the corresponding points on the neighboring segments when drawn."
        code: |
          function createPoints(a){
          	a.points = []

          	pushPoint(a.angle[a.len-1], 0, a, a.len-1, -a.size[a.len-1], a.points, 0)
          	for(let i = a.len-1; i > 0; i--){
          		pushPoint(a.angle[i], 0.5, a, i, a.size[i], a.points, 0)
          	}
          	pushPoint(a.angle[0], 0.5, a, 0, a.size[0], a.points, -a.size[0]*0.9)
          	pushPoint(a.angle[0], 0.5, a, 0, a.size[0], a.points, a.size[0]/2)
          	for(let i = -0.075; i <= 0.075; i += 0.15){
          		pushPoint(a.angle[0], -i, a, 0, a.size[0], a.points, a.size[0]/3)
          	}
          	pushPoint(a.angle[0], -0.5, a, 0, a.size[0], a.points, a.size[0]/2)
          	pushPoint(a.angle[0], -0.5, a, 0, a.size[0], a.points, -a.size[0]*0.9)
          	for(let i = 1; i < a.len; i++){
          		pushPoint(a.angle[i], -0.5, a, i, a.size[i], a.points, 0)
          	}

          	if(a.legs.length > 0){
          		for(let i = 0; i < a.legs.length; i++){
          			let leg = a.legs[i]
          			leg.points = []
          			for(let j = 0; j < leg.len; j++){
          				pushPoint(leg.angle[j], 0.5, leg, j, leg.size[j], leg.points, 0)
          			}
          			pushPoint(leg.angle[leg.len-1], 0, leg, leg.len-1, leg.size[leg.len-1], leg.points, 0)
          			for(let j = leg.len-1; j >= 0; j--){
          				pushPoint(leg.angle[j], -0.5, leg, j, leg.size[j], leg.points, 0)
          			}
          			pushPoint(leg.angle[0], 1, leg, 0, leg.size[leg.len-1], leg.points, 0)
          		}
          	}

          	a.eyes = []
          	for(let i = -0.5; i <= 0.5; i++){
          		pushPoint(a.angle[0], i, a, 0, a.size[0]*0.5, a.eyes, 0)
          	}

          	function pushPoint(angle, change, part, i, dist, array, offset){
          		let newAngle = normalizeAngle(angle + (change * pi))
          		let x = part.x[i] + Math.cos(newAngle) * dist + (Math.cos(part.angle[i]) * offset)
          		let y = part.y[i] + Math.sin(newAngle) * dist + (Math.sin(part.angle[i]) * offset)
          		array.push({x: x, y: y})
          	}
          }

      - type: code
        id: "draw-animal"
        title: "DrawAnimal() & DrawPart()"
        lang: javascript
        description: "drawAnimal() loops through each point array and calls drawPart() for it. drawPart() then loops through each point in the array and draws a smoothed vector."
        code: |
          function drawAnimal(a) {
          	if (a.legs.length > 0) {
          		for (let i = 0; i < a.legs.length; i++) {
          			drawPart(a.legs[i].points)
          		}
          	}
          	if (a.eyes.length > 0){
          		for(let i = 0; i < a.eyes.length; i++){
          			c.beginPath()
          			c.fillStyle = Colors.wallOffset
          			c.arc(a.eyes[i].x, a.eyes[i].y, 7, 0, 2*pi)
          			c.fill()
          			c.closePath()
          		}
          	}
          }

          function drawPart(array) {
          	c.beginPath()
          	c.lineWidth = 2
          	c.fillStyle = Colors.animal
          	c.moveTo(array[0].x, array[0].y)

          	for (let i = 1; i < array.length - 1; i++) {
          		let xc = (array[i].x + array[i + 1].x) / 2
          		let yc = (array[i].y + array[i + 1].y) / 2
          		c.quadraticCurveTo(array[i].x, array[i].y, xc, yc)
          	}

          	let lastPoint = array[array.length - 1]
          	let firstPoint = array[0]
          	let finalMidpoint = {
          		x: (lastPoint.x + firstPoint.x) / 2,
          		y: (lastPoint.y + firstPoint.y) / 2
          	}

          	c.quadraticCurveTo(lastPoint.x, lastPoint.y, finalMidpoint.x, finalMidpoint.y)
          	c.quadraticCurveTo(finalMidpoint.x, finalMidpoint.y, firstPoint.x, firstPoint.y)
          	c.fill()
          	c.closePath()
          }

  - title: "The"
    accent: "Animate Script"
    label: "Movement & Collision"
    id: "animate-script"
    blocks:
      - type: code
        id: "calculate-movement"
        title: "CalculateMovement()"
        lang: javascript
        description: "calculateMovement() calculates how the creature is supposed to turn and move towards a target. I made it so the creature has to turn slowly instead of just snapping to a new direction to add more 'weight' to it."
        code: |
          function calculateMovement(a) {
          	if (!a.targetX && !a.targetY) return

          	const dist = calculateDistance(a.x[0], a.y[0], a.targetX, a.targetY)
          	if (dist >= a.speed) {
          		let angle = calculateAngle(a.x[0], a.y[0], a.targetX, a.targetY)
          		angle = normalizeAngle(angle)
          		let radTurn = toRadians(a.turn)
          		let angleDifference = (angle - a.angle[0] + (2 * pi)) % (2 * pi)
          		if (angleDifference > pi) {
          			angleDifference -= 2 * pi
          		}
          		let turn = Math.max(-radTurn, Math.min(radTurn, angleDifference))
          		a.angle[0] += turn
          		a.angle[0] = normalizeAngle(a.angle[0])
          		if (dist <= a.speed) {
          			a.angle[0] = angle
          			a.speed = dist
          		}
          		a.x[0] += Math.cos(a.angle[0]) * a.speed
          		a.y[0] += Math.sin(a.angle[0]) * a.speed
          	}

          	for (let i = 1; i < a.len; i++) {
          		distanceConstraint(a.x[i], a.y[i], a.x[i - 1], a.y[i - 1], a, i, a.dista[i])
          	}

          	if (a.legs.length > 0) {
          		setLegTarget(a)
          		for (let i = 0; i < a.legs.length; i++) {
          			solveIK(a.legs[i])
          		}
          	}
          }

      - type: code
        id: "constraints"
        title: "DistanceConstraint(), HeadConstraint() & AngleConstraint()"
        lang: javascript
        description: "distanceConstraint() handles keeping each segment constrained to a certain distance from its front neighbor. HeadConstraint() handles constraining the head to the rest of the body, as it has no front neighbor to follow, and has to follow extra rules for how it turns. angleConstraint() handles how much each segment can turn away from its front neighbor, so that segments can't clip into each other or flip 180 degrees and ruin rendering."
        code: |
          function distanceConstraint(x1, y1, x2, y2, part, i, dist) {
          	const distance = calculateDistance(x1, y1, x2, y2)
          	if (distance !== dist) {
          		let angle = calculateAngle(x1, y1, x2, y2)
          		angle = normalizeAngle(angle)
          		part.angle[i] = angle
          		const distToMove = round(distance - dist)
          		part.x[i] += Math.cos(angle) * distToMove
          		part.y[i] += Math.sin(angle) * distToMove
          	}
          }

          function HeadConstraint(part, angleThreshhold) {
          	let angle1 = normalizeAngle(part.angle[0]-pi)
          	let angle2 = part.angle[1]
          	angleDiff = normalizeAngle(angle1 - angle2)
          	if (angleDiff < angleThreshhold*2 || angleDiff > (2 * pi) - angleThreshhold*2) {
          		adjustSegmentPosition(part, 1, angleDiff, angleThreshhold)
          	}

          	function adjustSegmentPosition(part, i) {
          		let targetAngle = averageAngle2(part.angle[i-1], part.angle[i])
          		let inverseTAngle = normalizeAngle(targetAngle - pi)
          		let targetX = part.x[i - 1] + Math.cos(inverseTAngle) * part.dist
          		let targetY = part.y[i - 1] + Math.sin(inverseTAngle) * part.dist
          		part.x[i] = targetX
          		part.y[i] = targetY
          		part.angle[i] = targetAngle
          		part.debug.push({x: part.x[i], y: part.y[i]})
          	}
          }

          function angleConstraint(part, angleThreshhold) {
          	for (let i = 2; i < part.len; i++) {
          		var angleABC = calculateAngleBetweenSegments(
          			{ x: part.x[i - 2], y: part.y[i - 2] },
          			{ x: part.x[i - 1], y: part.y[i - 1] },
          			{ x: part.x[i], y: part.y[i] }
          		)
          		if (angleABC < angleThreshhold || angleABC > (2 * pi) - angleThreshhold) {
          			adjustSegmentPosition(part, i, angleABC, angleThreshhold)
          		}
          	}

          	function calculateAngleBetweenSegments(A, B, C) {
          		const angle1 = normalizeAngle(calculateAngle(B.x, B.y, A.x, A.y))
          		const angle2 = normalizeAngle(calculateAngle(B.x, B.y, C.x, C.y))
          		return normalizeAngle(angle2 - angle1)
          	}

          	function adjustSegmentPosition(part, i, currentAngle, thresh) {
          		let angleDifference = (currentAngle > (2 * pi) - thresh) ? -thresh : thresh
          		let targetAngle = normalizeAngle(part.angle[i - 1] + angleDifference)
          		part.x[i] = part.x[i - 1] + Math.cos(targetAngle) * part.dist
          		part.y[i] = part.y[i - 1] + Math.sin(targetAngle) * part.dist
          		part.debug.push({x: part.x[i], y: part.y[i]})
          	}
          }

      - type: code
        id: "legs-ik"
        title: "Legs IK"
        lang: javascript
        description: "I set up an Inverse Kinematics system for the legs so that they would be smooth and natural, to keep in line with the rest of the creature's movements. I definitely could've set this up in a better way though."
        code: |
          function setLegTarget(a) {
          	const phaseOffset = 1
          	for (let i = 0; i < a.legs.length; i++) {
          		let leg = a.legs[i]
          		let dir = i % 2 ? -0.2 : 0.2
          		let angle = a.angle[a.legAttachs[i]] + (dir * pi)
          		let targetDist = a.dist + (leg.legLengths[0]*leg.len)/3
          		leg.startX = a.x[a.legAttachs[i]]
          		leg.startY = a.y[a.legAttachs[i]]
          		leg.stepX = a.x[a.legAttachs[i]] + Math.cos(angle) * targetDist
          		leg.stepY = a.y[a.legAttachs[i]] + Math.sin(angle) * targetDist
          		let dist = calculateDistance(leg.targetX, leg.targetY, leg.stepX, leg.stepY)
          		let maxdist = leg.legLengths[0] * leg.len
          		if (dist >= maxdist && (i % 2 === 0 || (i % 2 === 1 && frameCount % Math.floor(fpsInterval * phaseOffset) === 0))) {
          			particles(
          				leg.targetX,
          				leg.targetY,
          				Colors.groundOffset,
          				5,
          				15,
          				0.1,
          				30
          			)
          			leg.targetX = leg.stepX
          			leg.targetY = leg.stepY
          		}
          	}
          }

          function lerp(start, end, t) {
          	return start + (end - start) * t
          }

          function solveIK(leg) {
          	let len = leg.len;
          	const smoothFactor = 0.5
          	leg.x[len - 1] = lerp(leg.x[len - 1], leg.targetX, smoothFactor)
          	leg.y[len - 1] = lerp(leg.y[len - 1], leg.targetY, smoothFactor)

          	for (let j = len - 1; j > 0; j--) {
          		let dx = leg.x[j] - leg.x[j - 1]
          		let dy = leg.y[j] - leg.y[j - 1]
          		let distance = Math.sqrt(dx * dx + dy * dy)
          		if (distance > 0.0001) {
          			let ratio = leg.legLengths[j - 1] / distance
          			leg.x[j - 1] = leg.x[j] - dx * ratio
          			leg.y[j - 1] = leg.y[j] - dy * ratio
          		} else {
          			leg.x[j - 1] = leg.x[j]
          			leg.y[j - 1] = leg.y[j]
          		}
          	}

          	leg.x[0] = leg.startX
          	leg.y[0] = leg.startY

          	for (let j = 1; j < len; j++) {
          		let dx = leg.x[j] - leg.x[j - 1]
          		let dy = leg.y[j] - leg.y[j - 1]
          		let distance = Math.sqrt(dx * dx + dy * dy)
          		if (distance > 0.0001) {
          			let ratio = leg.legLengths[j - 1] / distance
          			leg.x[j] = leg.x[j - 1] + dx * ratio
          			leg.y[j] = leg.y[j - 1] + dy * ratio
          		} else {
          			leg.x[j] = leg.x[j - 1]
          			leg.y[j] = leg.y[j - 1]
          		}
          	}

          	leg.angle[len - 1] = normalizeAngle(calculateAngle(leg.x[len - 2], leg.y[len - 2], leg.x[len - 1], leg.y[len - 1]))
          	for (let i = len - 2; i >= 0; i--) {
          		leg.angle[i] = normalizeAngle(calculateAngle(leg.x[i], leg.y[i], leg.x[i + 1], leg.y[i + 1]))
          	}
          	for (let i = 1; i < len - 1; i++) {
          		leg.angle[i] = averageAngle(leg, i)
          	}
          }

      - type: code
        id: "collision"
        title: "Collision"
        lang: javascript
        description: "checkTileCollisions() is the higher-level function for checking if a creature is colliding with an object. I decided I didn't want to try to find some premade solution online, so I attempted to make my own custom collision detector. It creates a point on the edge of the solid object in the direction of each creature segment, then does a simple circle collision check, and from there it can handle decently complex collisions."
        code: |
          function checkTileCollisions(a) {
          	Collidables.forEach(wall => {
          		for (let i = 0; i < a.len; i++) {
          			let wallX = wall.x + (wall.w / 2)
          			let wallY = wall.y + (wall.h / 2)
          			let angle = normalizeAngle(calculateAngle(wallX, wallY, a.x[i], a.y[i]))
          			let dist = squarePerimeter(wall, angle)
          			let x = wallX + Math.cos(angle) * dist
          			let y = wallY + Math.sin(angle) * dist
          			if (a.x[i] > wall.x && a.x[i] < wall.x + wall.w) {
          				x = a.x[i]
          			}
          			if (a.y[i] > wall.y && a.y[i] < wall.y + wall.h) {
          				y = a.y[i]
          			}
          			angle = normalizeAngle(calculateAngle(x, y, a.x[i], a.y[i]))
          			c.beginPath()
          			c.fillStyle = 'yellow'
          			c.arc(x, y, 5, 0, 2 * pi)
          			c.fill()
          			c.closePath()
          			let collisionDist = calculateDistance(x, y, a.x[i], a.y[i])
          			if (collisionDist <= a.size[i]) {
          				let diff = a.size[i] - collisionDist
          				a.x[i] += Math.cos(angle) * diff
          				a.y[i] += Math.sin(angle) * diff
          			}
          		}
          	})
          }

          function isColliding(point, rect) {
          	return (
          		point.x < rect.x + rect.w &&
          		point.x > rect.x &&
          		point.y < rect.y + rect.h &&
          		point.y > rect.y
          	)
          }

          function squarePerimeter(square, angle) {
          	let cx = square.x + square.w / 2
          	let cy = square.y + square.h / 2
          	let dx = Math.cos(angle)
          	let dy = Math.sin(angle)
          	let t_values = [
          		(square.x - cx) / dx,
          		(square.x + square.w - cx) / dx,
          		(square.y - cy) / dy,
          		(square.y + square.h - cy) / dy
          	]
          	let points = [
          		{ x: square.x, y: cy + t_values[0] * dy, t: t_values[0] },
          		{ x: square.x + square.w, y: cy + t_values[1] * dy, t: t_values[1] },
          		{ x: cx + t_values[2] * dx, y: square.y, t: t_values[2] },
          		{ x: cx + t_values[3] * dx, y: square.y + square.h, t: t_values[3] }
          	]
          	points = points.filter(p =>
          		p.x >= square.x && p.x <= square.x + square.w &&
          		p.y >= square.y && p.y <= square.y + square.h
          	)
          	let closest = points.reduce((a, b) => (a.t < b.t ? a : b))
          	return sqrt((closest.x - cx) ** 2 + (closest.y - cy) ** 2)
          }

          function checkObjCollisions(a){
          	gameObjects.forEach((obj, index) => {
          		let dist = calculateDistance(obj.x, obj.y, a.x[0], a.y[0])
          		if(dist < a.size[0]){
          			Colors.animal = obj.color
          			gameObjects.splice(index, 1)
          		}
          	})
          }

      - type: image
        id: "collisions-gif"
        title: "Collisions GIF"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832059/Procedural_Animations_Collisions_wrotnr.webp"
        alt: "GIF of collision points visualized with yellow circles"
        description: "Here is a GIF of those collision points in action, visualized with the yellow circles."
        animated: true

  - title: "Final"
    accent: "Note"
    label: "Wrap-up"
    id: "final-note"
    blocks:
      - type: text
        id: "final-note"
        paragraphs:
          - "This project was very fun to do, and I learned quite a bit about coding and a lot of trigonometry in the process. There's a lot I'd change if I restarted it, such as making everything more abstract instead of hard coded. Also, this works with several creatures at once:"

      - type: image
        id: "multiple-gif"
        src: "https://res.cloudinary.com/dbmhdbjxa/image/upload/v1777832061/Procedural_Animations_Multiple_tig9cx.webp"
        alt: "GIF of multiple creatures at once"
        animated: true
---
