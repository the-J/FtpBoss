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
const electronSettings = require('electron-settings');
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
        getSettings();
    });

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
        mainWindow.send(ipc.SEND_SERVER_PARAMS);
    }
});

/**
 * Defining global ipcMain / ipcRenderer commands
 */
global.ipc = {
    SEND_LIST: 'send-directory-list',
    SEND_SERVER_PARAMS: 'send-server-credentials',
    SEND_SETTINGS_ON_LOAD: 'send-settings',
    GET_DIRECTORY_FILES: 'list-directory-files',
    GET_SETTINGS: 'get-settings',
    SET_SETTINGS: 'set-settings',
    CREATE_DIRECTORY: 'create-directory',
    CREATE_DIRECTORY_CB: 'create-directory-callback',
    REMOVE_DIR_OR_FILE: 'remove-directory-or-file',
    REMOVE_DIR_OR_FILE_CB: 'remove-directory-or-file-callback'
};

/**
 * @todo electron-settings - it's still dev version
 * @returns {{host, user, password, type}|*}
 */
function serverCredentials() {
    const serverParams = electronSettings.get('serverParams');

    if (serverParams) return serverParams;
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
    const ftp = new EasyFtp();
    ftp.connect(serverCredentials());

    ftp.ls(dirPath, ( err, list ) => {
        if (err) console.log(err);
        else mainWindow.send(ipc.SEND_LIST, list);

        ftp.close();
    });
}

// @todo check if directory exists
function createDirectory( arg ) {
    const ftp = new EasyFtp();
    ftp.connect(serverCredentials());

    const { dirPath, dirName } = { ...arg };

    ftp.mkdir(dirPath + '/' + dirName, err => {
        if (err) return conole.log('creating di failed', err);
        else mainWindow.send(ipc.CREATE_DIRECTORY_CB);

        ftp.close();
    });
}

// function uploadFiles( arg ) {
//     const ftp = new EasyFtp();
//     ftp.connect(serverCredentials());
//
//     const { dirPath, files } = { ...arg };
//
//     ftp.on('open', () => {
//
//     });
// }

function removeFileOrDirectory( arg ) {
    const ftp = new EasyFtp();
    ftp.connect(serverCredentials());

    const { dirPath, dirOrFileName } = { ...arg };

    ftp.rm(dirPath + '/' + dirOrFileName, err => {
        if (err) conole.log('removing di failed', err);
        else mainWindow.send(ipc.REMOVE_DIR_OR_FILE_CB);

        ftp.close();
    });
}

/**
 *
 * @param {Object} settings
 * @param {String} settings.settingsKey
 * @param {Object} settings.values
 */
function setSettings( settings ) {
    const settingsKey = Object.keys(settings)[ 0 ];
    const settingsValues = settings[ settingsKey ];

    electronSettings.set(settingsKey, settingsValues);

    // @todo  way for handling diff messages
    mainWindow.send(ipc.SEND_SERVER_PARAMS);
}

function getSettings() {
    const settings = electronSettings.getAll();

    if (settings && Object.values(settings).length) {
        return mainWindow.send(ipc.SEND_SETTINGS_ON_LOAD, settings);
    }
}

ipcMain.on(ipc.SET_SETTINGS, ( event, arg ) => setSettings(arg));
ipcMain.on(ipc.GET_DIRECTORY_FILES, ( event, arg ) => listDirectoryFiles(arg));
ipcMain.on(ipc.GET_SETTINGS, ( event, arg ) => getSettings(arg));
ipcMain.on(ipc.CREATE_DIRECTORY, ( event, arg ) => createDirectory(arg));
ipcMain.on(ipc.REMOVE_DIR_OR_FILE, ( event, arg ) => removeFileOrDirectory(arg));