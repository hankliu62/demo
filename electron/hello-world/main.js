var electron = require('electron');
var url = require('url');
var path = require('path');

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var win;

function createMainWindow () {
  win = new BrowserWindow({
    width: '100%',
    height: '100%',
    title: 'Hello Hank',
    autoHideMenuBar: true,
    show: false
  });

  win.maximize();

  win.webContents.openDevTools();

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:'
  }));

  win.on('ready-to-show', function () {
    win.show();
  });

  win.on('closed', function () {
    win = null;
  });
}

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createMainWindow();
  }
});