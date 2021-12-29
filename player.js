class Player extends Inventory {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 1.3;
    this.height = 2.6;
    
    
    this.textureWidth = 4;
    this.textureHeight = 4.96;
    this.textureXoffset = -1.3;
    this.textureYoffset = -1.5;
    
    this.xVel = 0;
    this.yVel = 0;
    
    this.direction = 1;
    
    this.speed = 0.05;
    this.topspeed = 0.11;
    
    this.isGrounded = false;
    
    this.state = 'idle';
  }
  
  update() {
    this.x += this.xVel;
    this.y += this.yVel;
    
    let dir = this.getXDirection();
    if (dir != 0) this.direction = dir;
    
    if (dir == 1) {
      this.textureXoffset = -1.3;
      this.textureWidth = 4;
    } else {
      this.textureXoffset = 2.6;
      this.textureWidth = -4;
    }
    
    if (this.isGrounded) {
      if (abs(this.xVel) < 0.1) this.state = 'idle';
      else if (abs(this.xVel) >= 0.1) this.state = 'walking';
      return;
    }
    this.state = 'falling';
  }
  
  getXDirection() {
    if (this.xVel == 0) return 0;
    if (this.xVel < 0) return -1;
    return 1;
  }
  
  getYDirection() {
    if (this.yVel == 0) return 0;
    if (this.yVel < 0) return -1;
    return 1;
  }
  
  isColliding(x, y, width, height) {
    return (
      this.x < x + width &&
      this.x + this.width > x &&
      this.y < y + height &&
      this.y + this.height > y
    );
  }
  
  applyFriction(groundFriction) {
    this.xVel *= groundFriction;
  }
  
  walkLeft() {
    if (this.xVel > -this.topspeed) {
      this.xVel -= this.speed;
    }
  }
  
  walkRight() {
    if (this.xVel < this.topspeed) {
      this.xVel += this.speed;
    }
  }
}