// const axios  = require("axios")

import axios from "axios"
const OMDb_API_KEY = '42cc3285'

export default defineEventHandler(async (event) => {
  const payload = getQuery(event)

  const { title, type, page, year, id } = payload
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const data = await $fetch(url)
    if (data.Error) {
      setResponseStatus(event, 400)
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
