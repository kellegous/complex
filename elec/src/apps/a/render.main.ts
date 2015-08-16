/// <reference path="../../dec/github-electron/github-electron-renderer.d.ts"/>
/// <reference path="../../lib/view.ts"/>
/// <reference path="../../lib/vec.ts"/>

module main {

	interface Evolver<T> {
		update(t: number, now: T, prv: T): boolean;
		copy(e: T): T;
	}

	class Agent {
		constructor(public p: k.Vec2, public v?: k.Vec2, public a?: k.Vec2) {
			this.v = v || k.Vec2.make(0, 0);
			this.a = a || k.Vec2.make(0, 0);
		}
	}

	class AgentEvolver implements Evolver<Agent> {
		update(t: number, now: Agent, prv: Agent): boolean {
			if (k.Vec2.len(prv.v) > 10) {
				k.Vec2.normalize(prv.v, prv.v);
				k.Vec2.scale(prv.v, 10);
			}

			k.Vec2.add(now.p, prv.p, prv.v);
			k.Vec2.add(now.v, prv.v, now.a);
			k.Vec2.set(now.a, 0, 0);
			return true;
		}

		copy(a: Agent): Agent {
			return new Agent(
				k.Vec2.clone(a.p),
				k.Vec2.clone(a.v),
				k.Vec2.clone(a.a));
		}
	}

	class World<T> {
		private a: T[] = [];
		private b: T[] = [];
		private t: number = 0;
		private forces: ((t: number, now: T, prv: T) => void)[] = [];

		constructor(
			private evolver: Evolver<T>,
			public width: number,
			public height: number) {
		}

		add(item: T) {
			this.a.push(item);
			this.b.push(this.evolver.copy(item));
		}

		addForce(f: (t: number, now: T, prv: T) => void) {
			this.forces.push(f);
		}

		private next(a: T[], b: T[]): number {
			this.a = b;
			this.b = a;
			return this.t++;
		}

		items(): T[] {
			return this.a;
		}

		update() : boolean {
			var t = this.next(this.a, this.b),
				evolver = this.evolver,
				b = this.b;

			this.forces.forEach((f) => {
				this.a.forEach((item: T, i: number) => {
					f(t, item, b[i]);
				});
			});

			this.a = this.a.filter((item: T, i: number) => {
				return evolver.update(t, item, b[i]);
			});

			return this.a.length > 0;
		}
	}

	function Render(ctx: CanvasRenderingContext2D, world: World<Agent>) {
		var canvas = ctx.canvas,
			w = canvas.width,
			h = canvas.height;

		ctx.clearRect(0, 0, w, h);
		world.items().forEach((item: Agent) => {
			ctx.fillStyle = '#09f';
			ctx.strokeStyle = '#666';
			ctx.beginPath();
			ctx.arc(
				k.Vec2.x(item.p),
				k.Vec2.y(item.p),
				4,
				0,
				2 * Math.PI,
				true);
			ctx.fill();
			ctx.stroke();
		});
	}

	function Begin(fn: () => boolean) {
		var update = () => {
			if (fn()) {
				requestAnimationFrame(update);
			}
		};

		update();
	}

	var ctx = view.MakeCanvas(document, 'a'),
		world = new World<Agent>(new AgentEvolver(), window.innerWidth, window.innerHeight),
		n = 25,
		dh = window.innerHeight / n;

	for (var i = 0; i < n; i++) {
		world.add(new Agent(
			k.Vec2.make(15, i * dh + dh/2),
			k.Vec2.make(0, 0),
			k.Vec2.make(0, 0)));
	}

	world.addForce((t: number, now: Agent, prv: Agent) => {
		var x = k.Vec2.x(now.p);
		if (x < 800) {
			k.Vec2.setX(now.a, 0.2);
		} else if (world.width - x < 800) {
			k.Vec2.setX(now.a, -0.2);
		} else {
			k.Vec2.setX(now.a, 0.0);
		}

		var y = k.Vec2.y(now.p);
		if (y < 500) {
			k.Vec2.setY(now.a, 0.2);
		} else if (world.height - y < 500) {
			k.Vec2.setY(now.a, -0.2);
		} else {
			k.Vec2.setY(now.a, 0.0);
		}
	});

	Begin(() => {
		Render(ctx, world);
		return world.update();
	});
}