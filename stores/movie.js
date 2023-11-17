import _uniqBy from 'lodash/uniqBy'
const _defaultMessage = 'Search for the movie title!'

export const movieStore = defineStore('movie', {
  // namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),

  actions: {
    async resetMovies() {
      this.movies = [],
      this.message = _defaultMessage,
      this.loading = false
    },
    async searchMovies(payload) {
      if (this.loading) return

      this.message = ''
      this.movies = []
      this.loading = true

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })

        const { Search, totalResults } = res.body

        this.movies = _uniqBy(Search, 'imdbID')
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.body

            this.movies = [
              ...this.movies,
              ..._uniqBy(Search, 'imdbID'),
            ]
          }
        }
      } catch (error) {
        this.movies = [],
        this.message = error.statusMessage
      } finally {
        this.loading = false
      }
    },
    async searchMovieWithId(payload) {
      if (this.loading) return

      this.theMovie = {}
      this.loading = true
      
      try {
        const res = await _fetchMovie(payload)
        this.theMovie = res.body
      } catch (error) {
        this.theMovie = {}
      } finally {
        this.loading = false

      }
    }
  },
})
async function _fetchMovie(payload) {
  // return await axios.post('/api/movie', payload)
  return await  $fetch('/api/movie', { method: 'post', query: payload })
}
