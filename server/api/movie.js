
const { OMDb_API_KEY } = process.env
export default defineEventHandler(async (event) => {
  const payload = getQuery(event)

  const { title, type, page, year, id } = payload
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const data = await $fetch(url)
    if (data.Error) {
      throw createError({
        statusCode: 400,
        statusMessage: data.Error,
      })
    }
    return {
      statusCode: 200,
      body: data
    }
  } catch (error) {
    return error
  }
})
