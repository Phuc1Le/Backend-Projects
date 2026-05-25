const {JSDOM} = require('jsdom')
const crawlPage = async (baseUrl, currentUrl, pages) => {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
    if(baseUrlObj.hostname !== currentUrlObj.hostname){
        return pages
    }
    const normalizeCurrentUrl = normalizeUrl(currentUrl)
    if(pages[normalizeCurrentUrl] > 0){
        pages[normalizeCurrentUrl]++;
        return pages
    }
    pages[normalizeCurrentUrl] = 1
    console.log(`Actively crawling at ${currentUrl}`)

    try {
        const resp = await fetch(currentUrl)
        if(resp.status > 399){
            console.log(`Error in fetch with status code ${resp.status} at ${currentUrl}`)
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log('Content type is not html')
            return pages
        }
        const htmlBody = await resp.text()
        const nextUrls = getUrlFromHtml(htmlBody, baseUrl)
        for(const nextUrl of nextUrls){
            pages = await crawlPage(baseUrl, nextUrl, pages)
        }
    } catch (error) {
        console.log(`error in fetch: ${error}`)
    }
    return pages
    
}
const getUrlFromHtml = (htmlBody, baseUrl) => {
    const urls = [];
    const dom = new JSDOM(htmlBody)
    const elements = dom.window.document.querySelectorAll('a')
    for(const ele of elements){
        if(ele.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL(`${baseUrl}${ele.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url at ${baseUrl}${ele.href}: ${err.message}`)
            }
        }
        else if(ele.href.length === 0){
            continue;
        }
        else{
            try{
                const urlObj = new URL(ele.href)
                urls.push(urlObj.href)
            } catch (err) {
                // console.log(ele.href)
                console.log(`error with absolute url ${ele.href}: ${err.message}`)
            }
        }
    }
    return urls;
}
const normalizeUrl = (urlString)=>{
    const urlObj = new URL(urlString)
    hostPath = `${urlObj.hostname}${urlObj.pathname}`
    // console.log(hostPath)
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeUrl,
    getUrlFromHtml,
    crawlPage
}