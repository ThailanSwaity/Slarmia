class Inventory {
  constructor() {
    this.hotbarSize = 9;
    this.hotbar = [];
    
    this.hotbar[0] = BLOCK_DIRT;
    this.hotbar[1] = BLOCK_GRASS;
    this.hotbar[2] = BLOCK_ROAD;
    this.hotbar[3] = BLOCK_LEFTROAD;
    this.hotbar[4] = BLOCK_RIGHTROAD;
    this.hotbar[5] = BLOCK_CHEST;
    this.hotbar[6] = BLOCK_FURNACE;
    this.hotbar[7] = BLOCK_WELL;
    this.hotbar[8] = BLOCK_STREETLIGHT;
    
    this.inventory = [];
    
    this.inventory[11] = BLOCK_GRASS1;
    this.inventory[12] = BLOCK_GRASS2;
    this.inventory[13] = BLOCK_SIGN;
    this.inventory[0] = BLOCK_CHAIR;
    this.inventory[1] = BLOCK_ROCK4;
    
    this.selected = 0;
  }
  
  getHotbarItem(i) {
    if (this.hotbar[i] == undefined) return 0;
    return this.hotbar[i];
  }
  
  setHotbarItem(i, item) {
    this.hotbar[i] = item;
  }
  
  getInventoryItem(i) {
    if (this.inventory[i] == undefined) return 0;
    return this.inventory[i];
  }
  
  setInventorySlot(x, y, item) {
    let i = (y * this.hotbarSize) + x;
    this.inventory[i] = item;
  }
  
  getInventorySlot(x, y) {
    let i = (y * this.hotbarSize) + x;
    return this.inventory[i];
  }
  
  getSelectedHotbarItem() {
    return this.getHotbarItem(this.selected);
  }
  
  getSelectedHotbarIndex() {
    return this.selected;
  }
}