class Block {
  constructor(blockID) {
    this.id = blockID;
    
    this.textureXoffset = 0;
    this.textureYoffset = 0;
    
    this.hitboxXoffset = 0;
    this.hitboxYoffset = 0;
    
    this.hitboxWidth = 1;
    this.hitboxHeight = 1;
    
    this.textureWidth = 1;
    this.textureHeight = 1;
    
    this.collidable = true;
    this.needSupport = false;
  }
  
  setTextureWidth(val) {
    this.textureWidth = val;
    return this;
  }
  
  setTextureHeight(val) {
    this.textureHeight = val;
    return this;
  }
  
  setHitboxWidth(val) {
    this.hitboxWidth = val;
    return this;
  }
  
  setHtiboxHeight(val) {
    this.hitboxHeight = val;
    return this;
  }
  
  setTextureXoffset(val) {
    this.textureXoffset = val;
    return this;
  }
  
  setTextureYoffset(val) {
    this.textureYoffset = val;
    return this;
  }
  
  setCollidable(bool) {
    this.collidable = bool;
    return this;
  }
  
  setHitboxXoffset(val) {
    this.hitboxXoffset = val;
    return this;
  }
  
  setHitboxYoffset(val) {
    this.hitboxYoffset = val;
    return this;
  }
  
  copy() {
    let bl = new Block(this.id);
    for (const key of Object.keys(this)) {
      bl[key] = this[key];
    }
    if ('init' in bl) bl.init();
    return bl;
  }
}