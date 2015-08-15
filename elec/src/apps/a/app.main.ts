/// <reference path="../../dec/github-electron/github-electron.d.ts"/>
/// <reference path="../../dec/github-electron/github-electron-main.d.ts"/>

module main {
var app = require('app'),
	BrowserWindow = require('browser-window');


app.on('ready', () => {
	var win = new BrowserWindow({
		width: 1024,
		height: 768,
		frame: false,
	});

	win.loadUrl('file://' + __dirname + '/render.html');
});

}