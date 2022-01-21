// use the express router to create endpoints in our server
const express = require('express')
const router = express.Router()

// require in the custom node module previously built
const search = require('search')




// localhost:8888/api/search
router.get('/search', async (req, res) => {

    try {
        const searchResults = await search.trackSearch(req.query.track)
        res.json(searchResults)
    } catch (err) {
        res.json({ err })
    }
})

// localhost:8888/api/fetch
router.get('/fetch', async (req, res) => {


    try {
        const fetchResults = await search.fetchData(req.query.mbid)
        res.json(fetchResults)
    } catch (err) {
        res.json({ err });
    }
});

module.exports = router