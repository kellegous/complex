module k {
	export interface Vec2 extends Float64Array {
	}

	export module Vec2 {
		export function make(x?: number, y?: number): Vec2 {
			var v = new Float64Array(2);
			Vec2.set(v, x, y);
			return v;
		}

		export function add(dst: Vec2, a: Vec2, b: Vec2) {
			dst[0] = a[0] + b[0];
			dst[1] = a[1] + b[1];
		}

		export function dot(a: Vec2, b: Vec2): number {
			return a[0] * b[0] + a[1] * b[1];
		}

		export function set(dst: Vec2, x: number, y: number) {
			dst[0] = x;
			dst[1] = y;
		}

		export function x(src: Vec2) : number {
			return src[0];
		}

		export function setX(src: Vec2, x: number) {
			src[0] = x;
		}

		export function y(src: Vec2) : number {
			return src[1];
		}

		export function setY(src: Vec2, y: number) {
			src[1] = y;
		}

		export function len(src: Vec2) : number {
			return Math.sqrt(src[0] * src[0] + src[1] * src[1]);
		}

		export function normalize(dst: Vec2, src: Vec2) {
			var n = Vec2.len(src);
			dst[0] = src[0] / n;
			dst[1] = src[1] / n;
		}

		export function scale(dst: Vec2, f: number) {
			dst[0] *= f;
			dst[1] *= f;
		}

		export function clone(src: Vec2): Vec2 {
			return Vec2.make(src[0], src[1]);
		}
	}
}