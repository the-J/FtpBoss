/**
 * Created by juliusz.jakubowski@gmail.com on 03.10.18.
 */

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const settings = require('electron-settings');
const EasyFtp = require('easy-ftp');

const defaultCredentials = require('../private/credentials');

const {
    CONNECT_FTP,
    SEND_TO_RENDERER
} = require('../src/utils/const');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        show: false
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    const template = [ {
        label: 'Dev',
        submenu: [ {
            label: 'DevConsole',
            accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
            click() {
                mainWindow.webContents.openDevTools();
            }
        } ]
    } ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function connectFtp() {
    const ftp = new EasyFtp();
    const config = defaultCredentials;

    const client = new Client();

    client.on('ready', function () {
        client.list(function ( err, list ) {
            if (err) {
                console.log(err);
            }

    ftp.connect(config);

    ftp.on('open', () => {
        ftp.ls('/', ( err, list ) => {
            if (err) console.error({ err });
            else mainWindow.send(SEND_TO_RENDERER, list);
        });

        ftp.close();
    });
}

ipcMain.on(CONNECT_FTP, () => connectFtp());