// Tab management

export default () => {
    let tabs = document.querySelectorAll('.tab')
    let webview = document.querySelector('webview')


    setInterval(() => {
        for (let tab of tabs) {
            let rect = tab.getBoundingClientRect()

            if (rect.width < 100) {
                tab.children[1].style.display = 'none'
                tab.style.maxWidth = '45px'
            }

            else {
                tab.children[1].style.display = 'inline-block'
                tab.style.maxWidth = '150px'
            }
        }
    }, 100)
    tabUpdate(tabs[0], webview) // tymczasowo pierwszy tylko
}

function tabUpdate(tab, webview) {
    let url = document.querySelector('#search').value
    // search for '/' and cut everything after '.com/'

    url = url.slice(8) // get rid of 'https://' (slashes)
    let slashPosition = url.indexOf('/')
    url = url.substring(0,slashPosition)

    let src = 'https://' + url + '/favicon.ico'  // add '/favicon.ico'
    tab.querySelector('img').src = src

    //tutaj dodać obrazek ze strony startowa z ustawien


    let name = webview.getTitle()
    console.log(name + ' name')
    tab.querySelector('span').innerHTML = name

} 