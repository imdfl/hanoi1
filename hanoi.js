const MAX_TILES = 11;
const MIN_TILES = 3;

class Hanoi {
	constructor() {
		this.towers = [0, 0, 0];
		this.delayMS = 1000;
	}

	async go() {
		for (let i = 0, len = this.towers[0]; i < len; ++i) {
			this.moveOne(0, 1);
			await(this.delay());
		}
	}

	init() {
		$("#ntowers").on("change", function(evt) {
			this.setNumberOfTiles($(evt.currentTarget).val())
		}.bind(this))
		.change();
		$("#ndelay").on("change", function(evt) {
			var d = $(evt.currentTarget).val();
			if (!isNaN(d)) {
				this.delayMS = Math.max(0.1, Math.min(d, 2)) * 1000;
			}
		})
		.change();

		$("#btn-go").click(function() {
			this.go();
		}.bind(this));
	}

	setNumberOfTiles(n) {
		if (isNaN(n)) {
			n = 3;
		}
		else {
			n = Math.max(MIN_TILES, Math.min(n, MAX_TILES));
		}
		this.towers = [Number(n), 0, 0];
		this.render();
	}

	moveOne(from, to) {
		if (this.towers[from] > 0) {
			this.towers[from]--;
			this.towers[to]++;
			this.render();
		}
	}

	render() {
		this.renderTower(0);
		this.renderTower(1);
		this.renderTower(2);
	}

	renderTower(ind) {
		var $t = $(`.tower[data-index="${ind}"]`);
		$t.find(".tile").remove();
		for (let i = 0; i < this.towers[ind]; ++i) {
			$t.prepend($(`<div class="tile"></div>`));
		}
	}

	delay() {
		return new Promise((resolve) => {
			setTimeout(resolve, this.delayMS);
		})
	}


}

export const towers = new Hanoi();
towers.init();