const electron = require('electron')
const url = require('url');
const path = require('path')

const { app, BrowserWindow, Menu } = electron;


process.env.NODE_ENV = 'development';

let mainWindow;



app.on('ready', () => {


    mainWindow = new BrowserWindow({});

    
    mainWindow.loadURL(
        url.format(
            {
                pathname: path.join(__dirname, 'mainWindow.html'),
                protocol: 'file:',
                slashes: true
            }));

    
    mainWindow.on('closed', () => {
        app.quit();
    });


    
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];