const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let win;

const createBrowserWindow = function () {
  win = new BrowserWindow({
    width: '800',
    height: '600',
    autoHideMenuBar: true,
    show: false
  });

  win.maximize();

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('ready-to-show', function () {
    win.show();
  });

  win.on('closed', function () {
    win = null;
  });
};

app.on('ready', createBrowserWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createBrowserWindow();
  }
});