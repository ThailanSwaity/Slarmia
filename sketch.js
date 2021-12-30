let grid = new Grid(0.02, 45, { width: 16, height: 128 }, 15);

let g = 0.01;
let border;

let chunkRadius = 16;
let player = new Player(0.1, 0);
let cursor = new Cursor(0);

let milliCounter = 0;
let debugBuffer;

let worldGraphicsBuffer;
let lastRedrawLocation = {};

let parallax = 0.2;

let invOpen = false;

let keys = {};
let mouseButtons = {};
let interactionState = 0;

// UI constants
let slotSize = 50;
let hotbarX;

let borderSpace = slotSize / 6;
let displaySize = slotSize / 1.5;

let invY;

//
// Textures
//

// Blocks
let blockList = [];

let rock4_decoration;

// Backgrounds
let backgroundImage;

// Character animation
let characterAnimator = new CharacterAnimator();
let idle;
let idleBlinking;
let walking;
let falling;

function preload() {
  blockList[1] = loadImage("textures/Ground_06.png");
  blockList[3] = loadImage("textures/Ground_11.png");
  blockList[4] = loadImage("textures/Ground_02.png");
  blockList[5] = loadImage("textures/Ground_12.png");
  blockList[6] = loadImage("textures/Ground_10.png");

  blockList[7] = loadImage("textures/Decor_Chest.png");
  blockList[8] = loadImage("textures/Furnace.png");
  blockList[9] = loadImage("textures/Well.png");
  blockList[10] = loadImage("textures/Street_Lantern.png");
  blockList[13] = loadImage("textures/Sign_01.png");
  blockList[14] = loadImage("textures/Chair.png");

  blockList[11] = loadImage("textures/Grass_01.png");
  blockList[12] = loadImage("textures/Grass_02.png");

  blockList[15] = loadImage("textures/Rock_04.png");
  blockList[16] = loadImage("textures/trees/Copa de arbol.jpg");
  blockList[17] = loadImage("textures/trees/bark-1024-colcor.png");

  backgroundImage = loadImage("textures/Background_01.png");
  
  idle = [
    loadImage("textures/character_idle/0_Reaper_Man_Idle_000.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_001.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_002.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_003.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_004.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_005.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_006.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_007.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_008.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_009.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_010.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_011.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_012.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_013.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_014.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_015.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_016.png"),
    loadImage("textures/character_idle/0_Reaper_Man_Idle_017.png")
  ];
  idleBlinking = [
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_000.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_001.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_002.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_003.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_004.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_005.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_006.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_007.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_008.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_009.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_010.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_011.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_012.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_013.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_014.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_015.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_016.png"),
    loadImage("textures/character_idle_blinking/0_Reaper_Man_Idle Blinking_017.png")
  ];
  walking = [
    loadImage("textures/character_walking/0_Reaper_Man_Walking_000.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_001.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_002.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_003.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_004.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_005.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_006.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_007.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_008.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_009.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_010.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_011.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_012.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_013.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_014.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_015.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_016.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_017.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_018.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_019.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_020.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_021.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_022.png"),
    loadImage("textures/character_walking/0_Reaper_Man_Walking_023.png")
  ];
  falling = [
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_000.png"),
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_001.png"),
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_002.png"),
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_003.png"),
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_004.png"),
    loadImage("textures/character_falling/0_Reaper_Man_Falling Down_005.png")
  ];
  
  characterAnimator.addAnimationType('idle', idle);
  characterAnimator.addAnimationType('walking', walking);
  characterAnimator.addAnimationType('falling', falling);
  characterAnimator.addAnimationType('idle blinking', idleBlinking);
}

function setup() {
  let seed = random(0, 999999);
  noiseSeed(seed);
  randomSeed(seed);
  createCanvas(1920, 1080, WEBGL);
  ortho();
  debugBuffer = createGraphics(300, 200);
  debugBuffer.textFont('Source Code Pro');
  debugBuffer.textAlign(LEFT, CENTER);
  debugBuffer.textSize(50);
  debugBuffer.fill(255);
  debugBuffer.stroke(0)
  debugBuffer.strokeWeight(5);
  debugBuffer.text('test', 0, debugBuffer.height * 0.5);
  
  worldGraphicsBuffer = createGraphics(2 * width, 2 * height, WEBGL);
  worldGraphicsBuffer.ortho();
  worldGraphicsBuffer.noStroke();
  
  hotbarX = -width / 2;
  invY = -height / 2 + slotSize * 1.5;
  
  setWorldGraphicsBuffer();
}

function draw() {
  // Handling key pressed
  background(80);
  
  handleKeyPress();
  handleMousePress();
  
  if (!player.isGrounded) {
    player.yVel += g;
  }
  
  player.update();
  
  checkCollisions();
  
  //
  // Prorcedural chunk generation
  //
  
  border = Math.ceil(width / grid.gridSize);
  for (let x = player.x - border; x < player.x + border + 1; x += grid.chunkSize.width) {
    if (!grid.isChunk(x)) grid.generateChunk(x);
  }
  
  // ----------------------------------------------------------------------------------
  
  renderBackground();
  
  if (needsRedraw()) {
    setWorldGraphicsBuffer();
  }
  
  image(
    worldGraphicsBuffer, 
    (-worldGraphicsBuffer.width/2) - grid.scale(player.x - lastRedrawLocation.x), 
    (-worldGraphicsBuffer.height/2) - grid.scale(player.y - lastRedrawLocation.y)
  );
  
  renderPlayer();
  renderUI();
}

function renderFrameRate() {
  const m = millis();
  noStroke();
  texture(debugBuffer);
  rect(-(width / 2) + (width - debugBuffer.width), -(height / 2), 300, 200);
  if (m - milliCounter < 500) return;
  debugBuffer.clear();
  debugBuffer.text(Math.round(frameRate()), debugBuffer.width - 60, 30);
  milliCounter = m;
}

function renderUI() {
  push();
  renderHotbar();
  renderInventory();
  renderCursor();
  renderFrameRate();
  pop();
}

function renderHotbar() {
  let selected = player.getSelectedHotbarIndex();
  for (let i = 0; i < player.hotbarSize; i++) {
    if (selected == i) {
      fill(255, 255, 153);
    } else {
      fill(255);
    }
    rect(hotbarX + slotSize * i, -height / 2, slotSize, slotSize);
    let hotbarItem = player.getHotbarItem(i);
    let tex = getTextureForItem(hotbarItem.id);
    if (tex == null) continue;
    texture(tex);
    rect(
      hotbarX + borderSpace + (displaySize + 2 * borderSpace) * i,
      -height / 2 + borderSpace,
      displaySize,
      displaySize
    );
  }
}

function renderInventory() {
  if (!invOpen) return;
  for (let i = 0; i < player.hotbarSize * 5; i++) {
    let y = Math.floor(i / player.hotbarSize);
    let x = i % player.hotbarSize;
    let invItem = player.getInventoryItem(i);
    fill(255);
    rect(hotbarX + slotSize * x, invY + slotSize * y, slotSize, slotSize);
    let item = player.getInventoryItem(i);
    if (item == 0) continue; // Move to next slot if there is no item in the current slot
    texture(getTextureForItem(item.id));
    rect(hotbarX + slotSize * x, invY + slotSize * y, slotSize, slotSize);
  }
}

function renderBackground() {
  push();
  noStroke();
  // Light green bottom fill
  fill(72, 129, 87);
  rect(
    -width / 2,
    -height / 2 + -grid.scale(player.y) * parallax + height - 1,
    width,
    height
  );

  // Light blue top fill
  fill(166, 224, 255);
  rect(
    -width / 2,
    -height / 2 + -grid.scale(player.y) * parallax - height / 2 - 1,
    width,
    height / 2
  );

  // Drawing the background texture
  texture(backgroundImage);
  rect(
    -width / 2,
    -height / 2 + -grid.scale(player.y) * parallax,
    width,
    height
  );
  pop();
}

function removeBlock(x, y, block) {
  worldGraphicsBuffer.push();
  worldGraphicsBuffer.translate(-grid.scale(lastRedrawLocation.x), -grid.scale(lastRedrawLocation.y));
  worldGraphicsBuffer.erase(255);
  worldGraphicsBuffer.rect(
          grid.scale(Math.floor(x) + block.textureXoffset),
          grid.scale(
            Math.floor(y) -
              (block.textureHeight - 1) +
              block.textureYoffset
          ),
          grid.scale(block.textureWidth),
          grid.scale(block.textureHeight)
        );
  worldGraphicsBuffer.pop();
}

function addBlock(x, y, block) {
  worldGraphicsBuffer.push();
  worldGraphicsBuffer.translate(-grid.scale(lastRedrawLocation.x), -grid.scale(lastRedrawLocation.y));
  worldGraphicsBuffer.texture(getTextureForItem(block.id));
  worldGraphicsBuffer.rect(
          grid.scale(Math.floor(x) + block.textureXoffset),
          grid.scale(
            Math.floor(y) -
              (block.textureHeight - 1) +
              block.textureYoffset
          ),
          grid.scale(block.textureWidth),
          grid.scale(block.textureHeight)
        );
  worldGraphicsBuffer.pop();
}

function setWorldGraphicsBuffer() {
  let startTime = millis();
  
  let xRad = Math.ceil(width / grid.gridSize);
  let yRad = Math.ceil(height / grid.gridSize);
  
  let blockY;
  let blockX;
  let block;
  
  //console.log('World tiles drawn to buffer!');
  
  worldGraphicsBuffer.push();
  worldGraphicsBuffer.clear();
  worldGraphicsBuffer.translate(-grid.scale(player.x), -grid.scale(player.y));
  for (let y = -yRad; y < yRad + 1; y++) {
    blockY = player.y + y;
    if (blockY < 1 || blockY > grid.chunkSize.height - 1) continue;
    for (let x = -xRad; x < xRad + 1; x++) {
      blockX = player.x + x;
      if (!grid.isChunk(blockX)) continue;
      block = grid.getBlock(blockX, blockY);
      if (block == 0) continue;
      worldGraphicsBuffer.texture(getTextureForItem(block.id));
      worldGraphicsBuffer.rect(
        grid.scale(Math.floor(blockX) + block.textureXoffset),
        grid.scale(
          Math.floor(blockY) -
            (block.textureHeight - 1) +
            block.textureYoffset
        ),
        grid.scale(block.textureWidth),
        grid.scale(block.textureHeight)
      );
    }
  }
  worldGraphicsBuffer.pop();
  lastRedrawLocation = {
    x: player.x,
    y: player.y
  };
  
  //console.log('It took ' + Math.round(millis() - startTime) + 'ms to render the world');
}

function needsRedraw() {
  if (abs(grid.scale(player.x - lastRedrawLocation.x)) > worldGraphicsBuffer.width / 5) return true;
  if (abs(grid.scale(player.y - lastRedrawLocation.y)) > worldGraphicsBuffer.height / 5) return true;
  return false;
}

function renderPlayer() {
  push();
  translate(-grid.scale(player.x), -grid.scale(player.y));
  characterAnimator.setAnimation(player.state);
  let animationFrame = characterAnimator.getAnimationFrame();
  if (animationFrame == null) {
    fill(255);
    stroke(0);
    rect(
      grid.scale(player.x),
      grid.scale(player.y),
      grid.scale(player.width),
      grid.scale(player.height)
    );
  } else {
    texture(animationFrame);
    noStroke();
    rect(
      grid.scale(player.x + player.textureXoffset),
      grid.scale(player.y + player.textureYoffset),
      grid.scale(player.textureWidth),
      grid.scale(player.textureHeight)
    );
  }
  pop();
}

function getTextureForItem(itemNum) {
  let tex = blockList[itemNum];
  if (tex == undefined) return null;
  return tex;
}

function renderCursor() {
  if (cursor.getItem() == 0) return;
  let itemSize = 25;

  let item = cursor.getItem();
  let tex = getTextureForItem(item.id);
  texture(tex);
  noStroke();
  rect(
    mouseX - width / 2 + itemSize / 2,
    mouseY - height / 2 + itemSize / 2,
    itemSize,
    itemSize
  );
}

function handleCollision(j, i, w, h) {
  // This is pretty good. Issues with jumping into walls while moving

  let collided = {};
  collided.x = collided.y = false;
  while (yCausesCollision(j, i, w, h)) {
    player.y -= player.yVel;
    if (player.getYDirection() == 1) player.yVel = 0.1;
    else player.yVel *= 0.5;
    collided.y = true;
  }

  while (xCausesCollision(j, i, w, h)) {
    player.x -= player.xVel;
    player.xVel *= 0.1;
    collided.x = true;
  }

  return collided;
}

function xCausesCollision(j, i, w, h) {
  const direction = player.getXDirection();
  const movement = player.xVel;
  const hasCollision = player.isColliding(j, i, w, h);
  player.x -= movement;
  const hadCollision = player.isColliding(j, i, w, h);
  player.x += movement;
  return hasCollision && !hadCollision;
}

function yCausesCollision(j, i, w, h) {
  const direction = player.getYDirection();
  const movement = player.yVel;
  const hasCollision = player.isColliding(j, i, w, h);
  player.y -= movement;
  const hadCollision = player.isColliding(j, i, w, h);
  player.y += movement;
  return hasCollision && !hadCollision;
}

function checkCollisions() {
  let collided = {};
  collided.x = collided.y = false;

  for (let y = -6; y < 7; y++) {
    let blockY = player.y + y;
    if (blockY < 0 || blockY > grid.chunkSize.height) continue;
    for (let x = -6; x < 7; x++) {
      let blockX = player.x + x;
      if (!grid.isChunk(blockX)) continue;
      let block = grid.getBlock(blockX, blockY);
      if (block == 0 || !block.collidable) continue;
      let tCollide = handleCollision(
        Math.floor(blockX) + block.hitboxXoffset,
        Math.floor(blockY) - (block.hitboxHeight - 1) + block.hitboxYoffset,
        block.hitboxWidth,
        block.hitboxHeight
      );
      if (tCollide.y) {
        collided.y = tCollide.y;
      }
      if (tCollide.x) {
        collided.x = tCollide.x;
      }
    }
  }
  handleGravity(collided);
}

function handleGravity(collided) {
  if (!collided.y) {
    player.isGrounded = false;
    return;
  }
  if (player.getYDirection() == 1) {
    player.isGrounded = true;
    player.xVel *= 0.8;
    return;
  }
  player.isGrounded = false;
}

function handleKeyPress() {
  for (const key in keys) {
    if (key == 65) {
      // Move camera left
      player.walkLeft();
    }
    if (key == 68) {
      // Move camera right
      player.walkRight();
    }
    if (key == 32) {
      if (player.isGrounded) {
        player.yVel = -0.33;
        player.isGrounded = false;
      }
    }
    if (key == 189) {
      // Zoom camera out
      grid.gridSize -= 0.1;
      setWorldGraphicsBuffer();
    }
    if (key == 187) {
      // Zoom camera in
      grid.gridSize += 0.1;
      setWorldGraphicsBuffer();
    }
    if (key == 27) {
      if (!keys[key]) {
        invOpen = !invOpen;
        keys[key] = true;
      }
    }
  }
}

function checkInventoryClick(button) {
  if (!invOpen || mouseButtons[button]) return;
  let hotbarX = Math.floor(mouseX / slotSize);
  let hotbarY = Math.floor(mouseY / slotSize);
  
  let invX = Math.floor(mouseX / slotSize);
  let invY = Math.floor((mouseY - slotSize * 1.5) / slotSize);
  
  if (invY < 0 && invX < player.hotbarSize) {
    let item = player.getHotbarItem(hotbarX);
    player.setHotbarItem(hotbarX, cursor.getItem());
    cursor.setItem(item);
    mouseButtons[button] = true;
    return;
  }
  if (invY >= 5 || invX >= player.hotbarSize) return;
  let item = player.getInventorySlot(invX, invY);
  if (item != undefined) {
    player.setInventorySlot(invX, invY, cursor.getItem());
    cursor.setItem(item);
    mouseButtons[button] = true;
    return;
  }
  player.setInventorySlot(invX, invY, cursor.getItem());
  cursor.setItem(0);
  mouseButtons[button] = true;
}

function placeBlock(blockX, blockY, sel) {
  if (!grid.hasDirectNeighbor(blockX, blockY || sel == 0)) return;
  if ("setDirection" in sel) sel.setDirection(player.getXDirection());
  let block = sel.copy();
  grid.setBlock(blockX, blockY, block);
  addBlock(blockX, blockY, block);
  interactionState = 1;
}

function handleMousePress() {
  for (const button in mouseButtons) {
    if (button != 0) continue;
    checkInventoryClick(button);
    if (mouseX < player.hotbarSize * slotSize && mouseY < 6.5 * slotSize && invOpen) continue;

    let blockX = (mouseX + grid.scale(player.x) - width / 2) / grid.gridSize;
    let blockY = (mouseY + grid.scale(player.y) - height / 2) / grid.gridSize;
    if (Math.floor(blockY) < 1 || Math.floor(blockY) > grid.chunkSize.height - 1) continue;
    
    let bl = grid.getBlock(blockX, blockY);
    if (bl == 0 && interactionState != 2) {
      let sel = player.getSelectedHotbarItem();
      placeBlock(blockX, blockY, sel);
    }
    if (interactionState == 1) continue;
    if (bl == 0) continue;
    grid.setBlock(blockX, blockY, 0);
    removeBlock(blockX, blockY, bl);
    interactionState = 2;
    let topBlock = grid.getBlock(blockX, blockY - 1);
    if (!topBlock.needSupport) continue;
    grid.setBlock(blockX, blockY - 1, 0);
    removeBlock(blockX, blockY - 1, topBlock);
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    let dir = player.selected - 1;
    player.selected -= 1;
    if (player.selected < 0) player.selected = player.hotbarSize - 1;
  } else if (event.delta > 0) {
    player.selected = (player.selected + 1) % player.hotbarSize;
  }
}

function mousePressed(event) {
  mouseButtons[event.button] = false;
}

function mouseReleased(event) {
  delete mouseButtons[event.button];
  interactionState = 0;
}

function keyPressed() {
  keys[keyCode] = false;
}

function keyReleased() {
  delete keys[keyCode];
}
