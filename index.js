'use strict';
const electron = require('electron');

const {app} = electron;

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Fequire('electron-reload')(__dirname, {
//   electron: require('electron-prebuilt')
// });
try {
  require('electron-reloader')(module)
} catch (_) {}

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			sandbox: false
		}
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.webContents.openDevTools();
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
