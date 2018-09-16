// Minimize, Maximize, Exit logic
export default (electron) => {
    let win = electron.remote.getCurrentWindow()
    let buttons = {
        min : document.querySelector('#window #minimize'),
        max : document.querySelector('#window #maximize'),
        ext : document.querySelector('#window #exit')
    }
    // Minimalize Window
    buttons.min.onclick = () => {
        win.minimize()
    }
    // Maximalize Window
    buttons.max.onclick = () => {
        if (win.isMaximized())
            win.unmaximize()
        else
            win.maximize()
    }
    // Close Window
    buttons.ext.onclick = () => {
        win.close()
    }
}