const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWindow
let mainWindowConfig = Object.freeze({
    show: false,
    frame: false
})

app.on('ready', () => {
    mainWindow = new BrowserWindow(mainWindowConfig)
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html')
    mainWindow.on('closed', () => {
        app.quit()
    })
    // Don't show the page rendering process 
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.setMenu(null)
    devMode(mainWindow)
})

/**
 * This function checks if you are running electron
 * in emulator. If so, it turnes developnment mode on.
 * @param {BrowserWindow} mainWindow - the window object
 */
function devMode (window) {
    // Import global key listener
    const keys = electron.globalShortcut
    // Check if it's development
    if (process.argv.includes('--dev'))
        process.DEV = true
    else
        process.DEV = false
    // Register bindings to devTools and reload
    if (process.DEV) {
        keys.register('f5', () => {
            window.reload()
        })
        keys.register('f1', () => {
            window.openDevTools()
        })
    }
}