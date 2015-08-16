/// <reference path="../../dec/github-electron/github-electron.d.ts"/>
/// <reference path="../../dec/github-electron/github-electron-main.d.ts"/>

module main {
	var app = require('app'),
		BrowserWindow = require('browser-window'),
		ipc = require('ipc');

	app.on('ready', () => {
		var display = require('screen').getPrimaryDisplay(),
			f = 0.9;

		var win = new BrowserWindow({
			width: (display.bounds.width * f) | 0,
			height: (display.bounds.height * f) | 0,
			frame: false,
		});

		win.loadUrl('file://' + __dirname + '/render.html');

		win.webContents.on('did-finish-load', () => {
			// win.openDevTools({
			// 	detach: true,
			// });
		});
	});

}