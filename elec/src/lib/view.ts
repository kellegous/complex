module view {
	export function MakeCanvas(doc: HTMLDocument, title: string) : CanvasRenderingContext2D {
		var w = window.innerWidth,
			h = window.innerHeight,
			canvas = doc.createElement('canvas'),
			style = canvas.style;

		canvas.width = w;
		canvas.height = h;

		style.position = 'absolute';
		style.top = '0';
		style.left = '0';

		document.title = title;
		document.body.appendChild(canvas);

		return canvas.getContext('2d');
	}
}