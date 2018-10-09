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

const defaultCredentials = require('./credentials');

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

    mainWindow.webContents.on('did-finish-load', function () {
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

/**
 * Defining global ipcMain / ipcRenderer commands
 */
global.ipc = {
    SEND_TO_RENDERER: 'send-to-renderer',
    LIST_DIRECTORY_FILES: 'list-directory-files'
};

/**
 * @todo electron-settings
 * @returns {{host, user, password, type}|*}
 */
function serverCredentials() {
    return defaultCredentials;
}

/**
 * ftp methods
 */

/**
 * @param {String} [dirPath] - path to directory
 * @return {Array}
 *
 * returns 'ls /' if no path specified
 */
function listDirectoryFiles( dirPath ) {
    if (!dirPath) dirPath = '';

    // @todo validate path
    console.log('listDirectoryFiles', { dirPath });

    const ftp = new EasyFtp();
    ftp.connect(serverCredentials());

    ftp.on('open', () => {
        if (dirPath) {
            ftp.ls('./' + dirPath, ( err, list ) => {
                if (err) console.log(err);
                else mainWindow.send(ipc.SEND_TO_RENDERER, list);
            });
        }
        else {
            ftp.ls('/', ( err, list ) => {
                if (err) console.log(err);
                else mainWindow.send(ipc.SEND_TO_RENDERER, list);
            });
        }

        ftp.close();
    });
}

ipcMain.on(ipc.LIST_DIRECTORY_FILES, ( event, arg ) => listDirectoryFiles(arg));