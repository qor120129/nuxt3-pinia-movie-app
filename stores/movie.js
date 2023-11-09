import axios from 'axios'
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

  getters: {
  },
  
  actions: {
    // updateState(state, payload) {
    //   Object.keys(payload).forEach(key => {
    //     state[key] = payload[key]
    //   })
    // },
    // resetMovies(state) {
    //   state.movies = [],
    //     state.message = _defaultMessage,
    //     state.loading = false
    // },
    async searchMovies(payload) {
      console.log('payload', payload)
      if (this.loading) return                 

      this.message= ''
      this.movies= []
      this.loading= true
      // updateState({
      //   message: '',
      //   movies: [],
      //   loading: true,
      // })
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })

        const { Search, totalResults } = res.data
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
            const { Search } = res.data
            this.movies= [
              ...this.movies,
              ..._uniqBy(Search, 'imdbID'),
            ]
          }
        }
      } catch ({ message }) {
        this.movies= [],
        this.message
  
      } finally {
        this.loadin= false
    
      }
    },
    async searchMovieWithId(payload) {
      if (this.loading) return 

      this.theMovie= {}
      this.loading= true
      // updateState({
      // })

      try {
        const res = await _fetchMovie(payload)
        updateState({
          theMovie: res.data
        })
        console.log('res', res)
      } catch (error) {
        updateState({
          theMovie: {}
        })
      } finally {
        updateState({
          loading: false,
        })
      }
    }
  },


})
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}
// function updateState(state, payload) {
//   Object.keys(payload).forEach(key => {
//     state[key] = payload[key]
//   })
// }