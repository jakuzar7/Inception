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
                pathname: path.join(__dirname, 'dist/pug.03f0838c.html'), 
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

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })

}