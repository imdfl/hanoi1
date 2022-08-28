const MAX_TILES = 11;
const MIN_TILES = 3;

class Hanoi {
	constructor() {
		this.towers = [0, 0, 0];
		this.delayMS = 1000;
		this.numTiles = 0;
	}

	async go() {
		while (this.towers[0].length > 1) {
			var from = this.randomIndex(),
				to = this.randomIndex(from);
			this.moveOne(from, to);
			await (this.delay());
		}
	}

	init() {
		$("#ntowers").on("change", function (evt) {
			this.setNumberOfTiles($(evt.currentTarget).val())
		}.bind(this))
			.change();
		$("#ndelay").on("change", (evt) => {
			var d = $(evt.currentTarget).val();
			if (!isNaN(d)) {
				this.delayMS = Math.max(0.1, Math.min(Number(d), 2)) * 1000;
			}
		})
			.change();

		$("#btn-go").click(() => {
			this.go();
		});
	}

	setNumberOfTiles(n) {
		if (isNaN(n)) {
			n = 3;
		}
		else {
			n = Math.max(MIN_TILES, Math.min(n, MAX_TILES));
		}
		this.numTiles = n;
		this.towers = [[], [], []];
		for (let i = 0; i < n; ++i) {
			this.towers[0].push(n - i - 1);
		}
		this.render();
		$(".towers").css("min-height", `${n * 30}px`);
	}

	moveOne(from, to) {
		var toMove = this.lastItem(from);
		var atMove = this.lastItem(to);
		if (toMove !== null) {
			if (atMove !== null && toMove > atMove) {
				console.warn(`Cannot move tile ${toMove} above tile ${atMove}`);
				return;
			}
			this.towers[from].pop();
			this.towers[to].push(toMove);
			this.renderTower(from);
			this.renderTower(to);
		}
	}

	lastItem(n) {
		var arr = this.towers[n];
		var len = arr.length;
		return len === 0 ?
			null : arr[len - 1];
	}

	render() {
		this.renderTower(0);
		this.renderTower(1);
		this.renderTower(2);
	}

	renderTower(ind) {
		var $t = $(`.tower[data-index="${ind}"]`);
		$t.find(".tile").remove();
		var arr = this.towers[ind];
		for (let i = 0; i < arr.length; ++i) {
			var current = arr[i];
			var percent = 100 - (this.numTiles - current - 1) * 5;
			$t.prepend($(`<div class="tile" data-index="${current}" style="width: ${percent}%"></div>`));
		}
	}

	delay() {
		return new Promise((resolve) => {
			setTimeout(resolve, this.delayMS);
		})
	}

	randomIndex(toAvoid) {
		var rand = Math.random();
		var ret = rand < 0.33 ? 0 : rand < 0.66 ? 1 : 2;
		return ret === toAvoid ? this.randomIndex(toAvoid) : ret;
	}


}

export const towers = new Hanoi();
towers.init();