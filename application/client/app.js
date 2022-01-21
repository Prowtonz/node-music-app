const local = "localhost"
const rpi = "192.168.1.103"

const lastfm = new Vue({
    el: '#lastfm',
    data: {
        trackName: '',
        searchResults: [],
        fetchResults: {},
        areResultsPresent: false
    },
    computed: {
        getResponseLength: function() {
            return this.searchResults.length
        }
    },
    methods: {
        searchTrack: async function() {
            this.fetchResults = {}
            this.areResultsPresent = false
            try {
                axios.get(`http://${rpi}/api/search?track=${this.trackName}`)
                .then(response => (this.searchResults = response.data))
            } catch(error) {
                console.log(`There was an error.\n${error}`)
            }
        },
        fetchData: async function(mbid) {
            this.searchResults = []
            try {
                axios.get(`http://${rpi}/api/fetch?mbid=${mbid}`)
                .then(response => (this.fetchResults = response.data))
                this.areResultsPresent = true
            } catch(error) {
                console.log(`There was an error: ${error}`)
            }
        }
    }
})
