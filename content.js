console.log('Saatva Promo Tester loaded')

let sitewideBanner = document
                ?.querySelector("section[data-selector='promo-sales-banner']")
                ?.querySelector(".container")
                ?.querySelector(".banner__content")
                ?.getElementsByTagName("span")

let pdpBanner = document
                ?.querySelector(".bannerPDPDiscount__text")
                ?.querySelector(".u-hidden--md-down")
                ?.getElementsByTagName("span")

chrome.runtime.onMessage.addListener((msg, sender, response) => {

    let { action, sitewide, pdp } = msg

    switch (action) {
        case ('UPDATE_SITEWIDE_BANNER'): {            
            if (sitewideBanner && sitewide !== '') {
                sitewideBanner[1].outerHTML = `<span class='t-weight--normal'>${sitewide}</span>`
            }
            if (pdpBanner && pdp !== '') {
                pdpBanner[0].outerHTML = `<span class='t-weight--normal'>${pdp}</span>`
            }
            refreshReferences()
            break
        }
        case ('REQUEST_DOM_INFO'): {
            response({ pdpBanner , sitewideBanner })
            break
        }
        case ('BOLD_SELECTION'): {
            let selection = window.getSelection()
            let replacedSelection = selection.anchorNode.data.replace(selection.toString(), `<span class=\'t-weight--bold\'>${selection.toString()}</span>`)
            let wrappedSelection = `<span class=\'t-weight--normal\'>${replacedSelection}</span>`

            if (selection.anchorNode.data === sitewideBanner[1].innerHTML) {
                tmpText = 
                sitewideBanner[1].outerHTML = wrappedSelection
            }
            if (selection.anchorNode.data === pdpBanner[0].innerHTML) {
                pdpBanner[0].outerHTML = wrappedSelection
            }
            selection.anchorNode.firstChild.outerHTML = wrappedSelection
            refreshReferences()
            break
        }
        default: {
            console.error(`Unhandled message action type: ${action}`)
            break
        }
    }
})

const refreshReferences = () => {
    sitewideBanner = document
            ?.querySelector("section[data-selector='promo-sales-banner']")
            ?.querySelector(".container")
            ?.querySelector(".banner__content")
            ?.getElementsByTagName("span")

    pdpBanner = document
            ?.querySelector(".bannerPDPDiscount__text")
            ?.querySelector(".u-hidden--md-down")
            ?.getElementsByTagName("span")
}