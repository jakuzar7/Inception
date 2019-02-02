import search from './search'
import windowBar from './window_bar'
import tabs from './tabs'
// This is for parcel to not compile or else we get error :(
const electron = eval(`require('electron')`)


document.addEventListener('DOMContentLoaded', () => {
    search()
    windowBar(electron)
    tabs()
})