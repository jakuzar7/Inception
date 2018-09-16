// Website search
export default () => {
    let search = document.querySelector('#search')
    let webview = document.querySelector('webview')
    search.addEventListener('change', e => {
        webview.src = e.target.value
    })

    setLoading(webview)
}

/**
 * Set Loading Bar Progress while loading a website
 * @param {HTMLElement} webview - The electron's webview 
 */
function setLoading (webview) {
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
        
}

/**
 * Run this everytime you load a website
 */
function preloadCSS (webview) {
    // Custom ScrollBar
    webview.insertCSS(`
            body::-webkit-scrollbar {
                background-color: #222;
            }
            body::-webkit-scrollbar-thumb {
                background-color: #333;
                border-radius: 10px;
            }
        `)
}