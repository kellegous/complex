/// <reference path="../../lib/github-electron/github-electron.d.ts"/>

module main {
	var app = <GitHubElectron.App>require('app'),
		BrowserWindow = <new (...args: any[]) => GitHubElectron.BrowserWindow>require('browser-window');

app.on('ready', () => {
	var win = new BrowserWindow({
		width: 1024,
		height: 768,
		frame: false,
	});

	win.loadUrl('file://' + __dirname + '/render.html');
});

}