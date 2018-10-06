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

const Client = require('ftp');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680
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
    console.log('ftp started');

    const config = {
        host: '',
        port: '',
        user: '',
        password: ''
    };

    const client = new Client();

    client.on('ready', function () {
        client.list(function ( err, list ) {
            if (err) {
                console.log(err);
            }

            console.dir(list);

            client.end();
        });
    });
    // connect to localhost:21 as anonymous
    client.connect(config);
}

ipcMain.on('connect-ftp', ( event, arg ) => {
    console.log(arg);
    connectFtp();
});