const superagent = require("superagent")
const config = require("./config")


const _baseURL = config.target.baseURL

function _toMinutes(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000)
    const minute = Math.floor(seconds / 60)
    return `${minute}:${seconds}`
}

function _getImage(images, dataOrFetch) {
    if(dataOrFetch) {
        for(let i = 0; i < images.length; i++) {
            if(images[i].size === "medium") {
                return images[i]['#text']
            }
        }
        console.log('No match')
    } else {
        for(let i = 0; i < images.length; i++) {
            if(images[i].size === "extralarge") {
                return images[i]['#text']
            }
        }
        console.log('No match')
    }
}

async function trackSearch(query = "") {
    try {
        const searchURL = `${_baseURL}&method=track.search&track=${query}`
        const searchResult = await superagent.get(searchURL)
        if (searchResult.body.results["opensearch:totalResults"] > 0) {
            const trackArray = []
            searchResult.body.results.trackmatches.track.forEach(track => {
                if (track.mbid != "") {
                    trackArray.push({ name: track.name, artist: track.artist, mbid: track.mbid, image: _getImage(track.image, true)})
                }
            })
            return trackArray
        } else {
            console.log("No results found for your query.")
        }
    } catch (error) {
        console.log(error)
    }
}

async function fetchData(mbid) {
    try {
        const fetchURL = `${_baseURL}&method=track.getinfo&mbid=${mbid}`
        const fetchResults = await superagent.get(fetchURL)
        const body = fetchResults.body.track
        const data = {}
        data.name = body.name
        data.image = _getImage(body.album.image, false)
        data.artist = body.artist.name
        data.album = body.album.title
        data.playcount = body.playcount
        data.duration = _toMinutes(body.duration)
        const tagArray = []
        body.toptags.tag.forEach(tag => {
            tagArray.push(tag.name)
        })
        data.tags = tagArray.join(", ")
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = {trackSearch, fetchData}