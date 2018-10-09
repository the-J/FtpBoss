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

/**
 * Defining global ipcMain / ipcRenderer commands
 * @type {{CONNECT_FTP: string, SEND_TO_RENDERER: string}}
 */
global.ipc = {
    CONNECT_FTP: 'connect-ftp',
    SEND_TO_RENDERER: 'send-to-renderer'
};

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

    console.log('ftp connect');

    ftp.connect(config);

    ftp.on('open', () => {
        ftp.ls('/', ( err, list ) => {
            if (err) console.error({ err });
            else mainWindow.send(ipc.SEND_TO_RENDERER, list);
        });

        ftp.close();
    });
}

ipcMain.on(ipc.CONNECT_FTP, () => connectFtp());