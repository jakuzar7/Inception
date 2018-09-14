export default () => {
    let search = document.querySelector('#search')
    let webview = document.querySelector('webview')
    search.addEventListener('change', e => {
        webview.src = e.target.value
    })
}