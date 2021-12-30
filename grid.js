class Grid {
  
  constructor(step, amplitude, chunkSize, surfaceOffset) {
    this.chunks = {};
    this.step = step;
    this.amplitude = amplitude;
    this.chunkSize = chunkSize;
    this.surfaceOffset = surfaceOffset;
    
    this.gridSize = 30;
    this.worldPosOffset = 50000;
  }
  
  getBlockIndex(x, y) {
    let bl = {};
    bl.chunkNumber = this.getChunkIndex(x);
    bl.x = 0;
    //bl.x = (x < 0) ? ((this.chunkSize.width - 1) - Math.floor(abs(x) % this.chunkSize.width) : Math.floor(x % this.chunkSize.width);
    if (x < 0) bl.x = (this.chunkSize.width - 1) - Math.floor(abs(x) % this.chunkSize.width);
    else bl.x = Math.floor(x % this.chunkSize.width);
    bl.y = Math.floor(y);
    return bl;
  }
  
  hasDirectNeighbor(x, y) {
    let bl1 = this.getBlock(x, y - 1);
    let bl2 = this.getBlock(x - 1, y);
    let bl3 = this.getBlock(x + 1, y);
    let bl4 = this.getBlock(x, y + 1);
    return (bl1 != 0 || bl2 != 0 || bl3 != 0 || bl4 != 0);
  }
  
  scale(v) {
    return v * this.gridSize;
  }
  
  getBlock(x, y) {
    
    let bl = this.getBlockIndex(x, y);
    
    return this.getChunk(bl.chunkNumber)[bl.y][bl.x];
  }
  
  setBlock(x, y, block) {
    let bl = this.getBlockIndex(x, y);
    
    this.getChunk(bl.chunkNumber)[bl.y][bl.x] = block;
  }
  
  getChunkIndex(x) {
    return Math.floor(x / this.chunkSize.width);   
  }
  
  getChunk(i) {
    return this.chunks[i];
  }
  
  isChunk(x) {
    let spot = this.getChunkIndex(x);
    return (spot in this.chunks);
  }
  
  isBlock(x, y) {
    return (this.getBlock(x, y) != undefined);
  }
  
  getHeight(x) {
    let chunkNumber = this.getChunkIndex(x);
    let j;
    
    if (x < 0) j = (this.chunkSize.width - 1) - Math.floor(abs(x) % this.chunkSize.width);
    else j = Math.floor(x % this.chunkSize.width);
    
    let c = this.getChunk(chunkNumber);
    if (c == undefined) return this.chunkSize.height;
    for (let i = 0; i < this.chunkSize.height; i++) {
      if (c[i][j] == 0) continue;
      if (c[i][j].id == BLOCK_GRASS1.id || c[i][j].id == BLOCK_GRASS2.id) continue;
      return i;
    }
    return this.chunkSize.height;
  }

  generateTree(x, y) {
    const leafGenPattern = [
    [-1,-3],[0,-3],[1,-3],
    [-1,-2],[0,-2],[1,-2],
    [-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],
    [-2,0],[-1,0],[0,0],[1,0],[2,0]];
    const treeHeight = Math.round(random(1, 10));

    //grid.setBlock(x, y, BLOCK_WOOD.copy());
    for (let i = 0; i < treeHeight; i++) {
      grid.setBlock(x, y - i, BLOCK_WOOD.copy());
    }
    for (const leaf of leafGenPattern) {
      grid.setBlock(x + leaf[0], y - treeHeight + leaf[1], BLOCK_LEAVES.copy());
    }
  }
  
  generateGrass(chunk, i, j, y, y1) {
    if (Math.floor(y) != Math.floor(y1)) return;
    let rand = Math.floor(random(0, 6));
    if (rand == 1) chunk[i - 1][j] = BLOCK_GRASS1.copy();
    else if (rand == 2) chunk[i - 1][j] = BLOCK_GRASS2.copy();
  }
  
  // Maybe implement biomes -- ALSO a nice code cleanup.. would be good :)
  generateChunk(x) {
    let chunk = [];
    let spot = this.getChunkIndex(x);
    let rand;
    
    let y;
    let y1;
    for (let i = 0; i < this.chunkSize.height; i++) {
      chunk[i] = [];
      for (let j = 0; j < this.chunkSize.width; j++) {
        y = this.surfaceOffset + noise((spot * this.chunkSize.width + j) * this.step + this.worldPosOffset) * this.amplitude;
        y1 = this.surfaceOffset + noise((spot * this.chunkSize.width + (j + 1)) * this.step + this.worldPosOffset) * this.amplitude;
        if (i > y) {
          chunk[i][j] = BLOCK_DIRT.copy();
          continue;
        }
        if (i == Math.floor(y)) {
          chunk[i][j] = BLOCK_GRASS.copy();
          // Generating grass and rock decoration
          this.generateGrass(chunk, i, j, y, y1);
          rand = Math.floor(random(0, 50));
          if (rand > 0 && rand < 3) chunk[i - 1][j] = BLOCK_ROCK4.copy();
          continue
        }
        chunk[i][j] = 0;
      }
    }
    this.chunks[spot] = chunk;
    let xt;
    let yt;
    let checkBlock;
    for (let i = 3; i < this.chunkSize.width - 3; i++) {
      rand = Math.round(random(0, 25));
      if (rand >= 3) continue;
      xt = this.getChunkIndex(x) * this.chunkSize.width + i;
      yt = this.getHeight(xt);
      checkBlock = grid.getBlock(xt, yt);
      if (checkBlock.id == BLOCK_ROCK4.id) continue;
      else if (checkBlock.id == BLOCK_GRASS1.id) continue;
      else if (checkBlock.id == BLOCK_GRASS2.id) continue;
      else if (checkBlock.id == BLOCK_LEAVES.id) continue;
      this.generateTree(xt, yt - 1);
    }
  }
}