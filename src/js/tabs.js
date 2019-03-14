// Tab management

export default () => {
    let tabs = document.querySelectorAll('.tab')
    
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
}