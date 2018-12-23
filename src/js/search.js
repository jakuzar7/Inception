import { setInterval } from "timers";
import { TIMEOUT } from "dns";

// Website search
export default () => {
    let reload = document.querySelector('#reload')
    let search = document.querySelector('#search')
    let webview = document.querySelector('webview')
    
    search.addEventListener('change', (e) => {
        webview.src = handleInput(e.target)
        webview.addEventListener('did-get-response-details', () => {
            search.value = webview.getURL()
        })
        
    })
    window.rot = 180
    
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
        // if (window.reloading) {
        //     console.log('clir');
        //     clearInterval(window.reloading)
        // }
    })

    webview.addEventListener('did-stop-loading', () => {
        loading.style.width = '100vw'
        loading.style.opacity = 0
        preloadCSS(webview)
        if (window.reloading) {
            console.log('clir');
            clearInterval(window.reloading)
        }
    })

    webview.addEventListener('did-fail-load', () => {
        webview.src = '../dist/failed_loading_page.html'
        loading.style.width = '100vw'
        loading.style.opacity = 0
        preloadCSS(webview)
        if (window.reloading) {
            console.log('clir')
            clearInterval(window.reloading)
        }   
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
function handleInput(target) {
    
    let inputText = target.value 

    console.log(inputText + " #1")
    // Search for dot, to check if it is a adress
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
    console.log(inputText + " #2")
    return inputText
}

function reloadAnim(reload, webview) {
    reload.addEventListener('click', () => {
        setInterval(function kappa () { 
            rotateAnim(webview)
            let rel = document.querySelector('#reload')
            if (webview.isLoading()) {
                window.rot += 360
                rel.style.transform = `rotate(${window.rot}deg)`
                clearInterval(kappa)
                // clearInterval(kappa)
            }
        }, 400)
        webview.reload()
    })
}

function rotateAnim(webview){
    
}
