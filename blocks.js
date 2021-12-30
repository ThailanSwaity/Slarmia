const BLOCK_DIRT = new Block(1);
const BLOCK_GRASS = new Block(3);
const BLOCK_ROAD = new Block(4);
const BLOCK_LEFTROAD = new Block(5);
const BLOCK_RIGHTROAD = new Block(6);
const BLOCK_CHEST = new Block(7);
BLOCK_CHEST.needSupport = true;
BLOCK_CHEST.textureWidth = 2;
BLOCK_CHEST.textureHeight = 2;
BLOCK_CHEST.hitboxWidth = 2;
BLOCK_CHEST.hitboxHeight = 1;
BLOCK_CHEST.collidable = false;
const BLOCK_FURNACE = new Block(8);
BLOCK_FURNACE.needSupport = true;
BLOCK_FURNACE.textureWidth = 3;
BLOCK_FURNACE.textureHeight = 3;
BLOCK_FURNACE.hitboxWidth = 3;
BLOCK_FURNACE.hitboxHeight = 2.1;
BLOCK_FURNACE.collidable = false;
const BLOCK_WELL = new Block(9);
BLOCK_WELL.textureWidth = 4;
BLOCK_WELL.textureHeight = 4;
BLOCK_WELL.textureXoffset = -1;
BLOCK_WELL.hitboxWidth = 2;
BLOCK_WELL.hitboxHeight = 3;
const BLOCK_STREETLIGHT = new Block(10);
BLOCK_STREETLIGHT.needSupport = true;
BLOCK_STREETLIGHT.textureWidth = -6;
BLOCK_STREETLIGHT.textureHeight = 6;
BLOCK_STREETLIGHT.textureXoffset = 5.5;
BLOCK_STREETLIGHT.collidable = false;
BLOCK_STREETLIGHT.setDirection = function(dir) {
  if (dir > 0) {
        this.textureWidth = -6;
    this.textureXoffset = 5.5;
  } else {
    this.textureWidth = 6;
    this.textureXoffset = -4.5;
  }
}
const BLOCK_GRASS1 = new Block(11);
BLOCK_GRASS1.needSupport = true;
BLOCK_GRASS1.textureWidth = 2;
BLOCK_GRASS1.collidable = false;
const BLOCK_GRASS2 = new Block(12);
BLOCK_GRASS2.needSupport = true;
BLOCK_GRASS2.textureWidth = 2;
BLOCK_GRASS2.collidable = false;
const BLOCK_SIGN = new Block(13);
BLOCK_SIGN.textureHeight = 2;
BLOCK_SIGN.textureYoffset = 1;
BLOCK_SIGN.hitboxHeight = 0.3;
BLOCK_SIGN.hitboxYoffset = -0.7;
BLOCK_SIGN.setDirection = function(dir) {
  if (dir > 0) {
    this.textureWidth = -2;
    this.textureXoffset = 2;
    this.hitboxWidth = 2;
    this.hitboxXoffset = 0;
  } else {
    this.textureWidth = 2;
    this.textureXoffset = -1;
    this.hitboxWidth = 2;
    this.hitboxXoffset = -1;
  }
}
const BLOCK_CHAIR = new Block(14);
BLOCK_CHAIR.textureWidth = 2;
BLOCK_CHAIR.textureHeight = 2;
BLOCK_CHAIR.hitboxXoffset = 0.2;
BLOCK_CHAIR.hitboxWidth = 1.6;
BLOCK_CHAIR.hitboxHeight = 1.1;
const BLOCK_ROCK4 = new Block(15);
BLOCK_ROCK4.needSupport = true;
BLOCK_ROCK4.textureYoffset = 0.13;
BLOCK_ROCK4.textureHeight = 0.6;
BLOCK_ROCK4.init = function() {
  this.textureXoffset = random(-0.5, 0.5);
}
BLOCK_ROCK4.collidable = false;
const BLOCK_WOOD = new Block(17);
BLOCK_WOOD.collidable = false;
const BLOCK_LEAVES = new Block(16);