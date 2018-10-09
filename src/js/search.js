// Website search
export default () => {
    let search = document.querySelector('#search')
    let webview = document.querySelector('webview')
    search.addEventListener('change', e => {
        webview.src = handleInput(e.target.value)
    })

    setLoading(webview)
}

/**
 * Set Loading Bar Progress while loading a website
 * @param {HTMLElement} webview - The electron's webview 
 */
function setLoading(webview) {
    let loading = document.querySelector('#loading #bar')

    webview.addEventListener('did-start-loading', () => {
        loading.style.opacity = 1
        loading.style.width = '33vw'
        preloadCSS(webview)
    })

    webview.addEventListener('did-get-response-details', () => {
        loading.style.width = '66vw'
        preloadCSS(webview)
    })

    webview.addEventListener('did-finish-load', () => {
        loading.style.width = '100vw'
        loading.style.opacity = 0
        preloadCSS(webview)
    })

    webview.addEventListener('did-stop-loading', () => {
        loading.style.width = '100vw'
        loading.style.opacity = 0
        preloadCSS(webview)
    })

    webview.addEventListener('did-fail-load', () => {
        webview.src = '../dist/failed_loading_page.html'
        loading.style.width = '100vw'
        loading.style.opacity = 0
        preloadCSS(webview)
    })

}

/**
 * Run this everytime you load a website
 */
function preloadCSS(webview) {
    // Custom ScrollBar
    webview.insertCSS(`
            body::-webkit-scrollbar {
                background-color: #222;
            }
            body::-webkit-scrollbar-thumb {
                background-color: #333;
                border-radius: 10px;
            }
            ::-webkit-scrollbar-corner {
                background-color: #222;
               }
        `)
}

// Handling input
function handleInput(inputText) {
    
    console.log(inputText + " #1")
    // Search for dot, to check if it is a adress
    if (!inputText.includes('.')) {
        // Search it in google
            inputText = 'https://www.google.com/search?q=' + inputText
        
    }
    else {
        // Search for and add "https://"
        if (inputText.search('https://') != 0) {
            inputText = 'https://' + inputText
        }
    }
    console.log(inputText + " #2")
    return inputText
}