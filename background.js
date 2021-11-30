console.log('background.js running')

chrome.action.onClicked.addListener((tab) => {
    let msg = {
        txt: 'popup button cliked'
    }
    
    if (chrome.tabs) {
        chrome.tabs.sendMessage(tab.id, msg)
    }
})

