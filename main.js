const electron = require('electron')
const { app, BrowserWindow, Menu } = electron

process.env.NODE_ENV = 'development'
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({show: false})
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html')
    mainWindow.on('closed', () => {
        app.quit()
    })
    // Don't show the page rendering process 
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

// TODO: pozbędziemy się ramki windowsowej (i cross platformowej)
// na rzecz naszej własnej ramki, którą zrobimy potem
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })

}