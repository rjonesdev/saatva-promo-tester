let updateButton = document.getElementById('updateButton')
let sitewideMsgInput = document.getElementById('promoMsgInputSitewide')
let pdpMsgInput = document.getElementById('promoMsgInputPDP')
let refreshButton = document.getElementById('refreshButton')
let boldButton = document.getElementById('boldButton')

document.addEventListener('DOMContentLoaded', async () => {
    let msg = {
        action: 'REQUEST_DOM_INFO'
    }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) 
    chrome.tabs.sendMessage(tab.id, msg, (msg) => {
        if (msg.sitewideBanner) {
            document.getElementById('sitewide-no').style['display'] = "none"
        } else {
            document.getElementById('sitewide-yes').style['display'] = "none"
        }
        if (msg.pdpBanner) {
            document.getElementById('pdp-no').style['display'] = "none"
        } else {
            document.getElementById('pdp-yes').style['display'] = "none"
        }
    })
})

updateButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) 

    let msg = {
        tabId: tab.id,
        sitewide: sitewideMsgInput.value,
        pdp: pdpMsgInput.value,
        action: 'UPDATE_SITEWIDE_BANNER'
    }

    chrome.tabs.sendMessage(tab.id, msg)
})

refreshButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.reload(tab.id)
})


boldButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    let msg = {
        action: 'BOLD_SELECTION'
    }

    chrome.tabs.sendMessage(tab.id, msg)
})