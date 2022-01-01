class MultiFrameRenderer {
	constructor(width, height, blocks_per_frame = 50) {
		this._contextA = createGraphics(width, height, WEBGL);
		this._contextB = createGraphics(width, height, WEBGL);
		this._contextA.ortho();
		this._contextB.ortho();

		this._CAPosition = { x: 0, y: 0 };
		this._CBPosition = { x: 0, y: 0 };

		this.blocks_per_frame = blocks_per_frame;
		this._block_count = 0;
		this.i = 0;

		this._usingContextA = true;
		this._activeRender = false;
	}

	renderWorld(x, y) {
		if (this._activeRender) {
			this._activeRender = !this._renderWorld().next().done;
			if (!this._activeRender) {
				this._switchActiveContext();
				this._block_count = 0;
				this.i = 0;
			}
			return;
		}
		let position = this._getInactiveContextPosition();
		position.x = x;
		position.y = y;

		// Sudo code
		// this._renderWorld();
		this._activeRender = true;
		this._clearInactiveContext();
		this.renderWorld(x, y);
	}

	*_renderWorld() {
		const position = this._getInactiveContextPosition();
		const context = this._getInactiveContext();

		let blockX;
		let blockY;
		let block;

		const xRad = Math.ceil(width * 2 / grid.gridSize);
		const yRad = Math.ceil(height * 2 / grid.gridSize);

		const xWidth = 2 * xRad;
		const yHeight = 2 * yRad;

		this._block_count = 0;

		context.push();
		context.translate(-grid.scale(position.x), -grid.scale(position.y));
		let x;
		let y;
		for (let j = this.i; j < xWidth * yHeight; j++) {
			y = Math.floor(j / xWidth);
			x = j % xWidth;
			blockY = position.y + (y - yRad);
			blockX = position.x + (x - xRad);
			if (blockY < 0 || blockY > grid.chunkSize.height - 1) continue;
			if (!grid.isChunk(blockX)) continue;
			let block = grid.getBlock(blockX, blockY);
			if (block == 0) continue;
			context.texture(getTextureForItem(block.id));
			context.rect(
				grid.scale(Math.floor(blockX) + block.textureXoffset),
				grid.scale(Math.floor(blockY) + block.textureYoffset - (block.textureHeight - 1)),
				grid.scale(block.textureWidth),
				grid.scale(block.textureHeight)
			);
			this._block_count++;
			if (this._block_count >= this.blocks_per_frame) {
				this._block_count = 0;
				this.i = j;
				context.pop();
				yield { done: false };
			}
		}
		context.pop();
		return { done: true };
	}

	_clearInactiveContext() {
		let context = this._getInactiveContext();
		context.clear();
	}

	_switchActiveContext() {
		this._usingContextA = !this._usingContextA;
	}

	_getInactiveContext() {
		if (this._usingContextA) return this._contextB;
		return this._contextA;
	}

	getActiveContext() {
		if (this._usingContextA) return this._contextA;
		return this._contextB;
	}

	_getInactiveContextPosition() {
		if (this._usingContextA) return this._CBPosition;
		return this._CAPosition;
	}

	getActiveContextPosition() {
		if (this._usingContextA) return this._CAPosition;
		return this._CBPosition;
	}

	isActive() {
		return this._activeRender;
	}

	removeBlock(x, y, block) {
		this._removeBlock(x, y, block, this._contextA, this._CAPosition);
		this._removeBlock(x, y, block, this._contextB, this._CBPosition);
	}

	_removeBlock(x, y, block, context, position) {
		context.push();
		context.translate(-grid.scale(position.x), -grid.scale(position.y));
		context.erase(255);
	  	context.rect(
         	grid.scale(Math.floor(x) + block.textureXoffset),
        	grid.scale(
        	Math.floor(y) - (block.textureHeight - 1) + block.textureYoffset),
        	grid.scale(block.textureWidth),
          	grid.scale(block.textureHeight)
        );
  		context.pop();
	}

	placeBlock(x, y, block) {
		this._placeBlock(x, y, block, this._contextA, this._CAPosition);
		this._placeBlock(x, y, block, this._contextB, this._CBPosition);
	}

	_placeBlock(x, y, block, context, position) {
  		context.push();
  		context.translate(-grid.scale(position.x), -grid.scale(position.y));
  		context.texture(getTextureForItem(block.id));
  		context.rect(
          	grid.scale(Math.floor(x) + block.textureXoffset),
          	grid.scale(
            Math.floor(y) - (block.textureHeight - 1) + block.textureYoffset),
          	grid.scale(block.textureWidth),
          	grid.scale(block.textureHeight)
        );
  		context.pop();
	}
}