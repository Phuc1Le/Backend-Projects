const {crawlPage} = require('./crawl.js')
const main = async () => {
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("Too many arguments")
        process.exit(1)
    }
    console.log("Start crawling")
    const baseUrl = process.argv[2];
    const pages = await crawlPage(baseUrl, baseUrl, {})
    console.log(pages)
}
main()