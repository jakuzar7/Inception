import { setInterval } from 'timers'

// Website search
export default () => {
    let reload = document.querySelector('#reload')
    let search = document.querySelector('#search')
    let webview = document.querySelector('webview')
    let gotUrl = 0
    
    search.addEventListener('change', (e) => {
        gotUrl = 0
        
        webview.src = handleInput(e.target)
        webview.addEventListener('did-get-response-details', (e) => {
            
            if (gotUrl < 5)
                search.value = webview.getURL()
            gotUrl++
        })
        
    })
    window.rot = 0
    
    setLoading(webview)
    reloadAnim(reload, webview)

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
        console.log(search.value.match(/^(https:).*/))
        webview.src = '../dist/fail.html'
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
        ::-webkit-scrollbar {
            width:10px;
            height:10px;
        }
        ::-webkit-scrollbar * {
            background:transparent;
        }
        ::-webkit-scrollbar-thumb {
            background:rgba(0,0,0,0.5) !important;
            border-radius: 20px;
            transition: 300ms;
        }
        ::-webkit-scrollbar-corner {
            background: transparent;
        }
    `)
}

// Handling input
function handleInput(target) {
    
    let inputText = target.value 

    // Search for dot, to check if it is a adress
    if (inputText == '::fail') {
        return '../dist/fail.html'
    }
    if (!inputText.includes('.')) {
        //inputText = 'https://www.google.com/search?q=' + inputText
        inputText = 'https://duckduckgo.com/?q=' + inputText
    }
    else {
        // Search for and add "https://"
        if (inputText.search('https://') != 0) {
            inputText = 'https://' + inputText
        }
    }
    return inputText
}

function reloadAnim(reload, webview) {
    setInterval(function kappa () { 
        let rel = document.querySelector('#reload #load')
        if (webview.isLoading()) {
            window.rot += 360
            rel.style.transform = `rotate(${window.rot}deg)`
        }
    }, 600)
    reload.addEventListener('click', () => {
        webview.reload()
    })
}