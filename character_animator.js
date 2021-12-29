class CharacterAnimator {
  constructor() {
    this.frame = 0;
    
    this.animations = {};
  }
  
  addAnimationType(key, frames) {
    this.animations[key] = frames;
  }
  
  setAnimation(anim) {
    if (this.animation == 'idle blinking' && anim == 'idle') return;
    if (this.animation == anim) return;
    this.animation = anim;
    this.frame = 0;
  }
  
  getAnimationTypes() {
    let types = [];
    for (const key in this.animations) types.push(key);
    return types;
  }
  
  getAnimationFrame() {
    if (this.animations[this.animation] == undefined) return null;
    if (this.animation == 'idle' || this.animation == 'idle blinking') {
      if (this.frame == this.animations[this.animation].length - 1) { // Occurs after the last animation ends
        let rand = random(0, 50);
        if (rand <= 10) this.animation = 'idle blinking';
        else this.animation = 'idle';
        this.frame = 0;
      }
      this.frame += 0.25;
    }
    else if (this.animation == 'walking') this.frame += 1;
    let length = this.animations[this.animation].length
    this.frame = this.frame % length;
    return this.animations[this.animation][Math.floor(this.frame)];
  }
}