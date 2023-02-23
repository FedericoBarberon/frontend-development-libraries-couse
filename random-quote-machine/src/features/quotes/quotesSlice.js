import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRandomNumber } from '../../utils/getRandomNumber'

const QUOTES_URL = 'https://quotable.io/quotes'
const TOTAL_PAGES = 103

export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
  const data = await fetch(`${QUOTES_URL}?page=${getRandomNumber(TOTAL_PAGES)}`)
  const quotes = await data.json()

  return quotes
})

const initialState = {
  quotes: [],
  status: 'idle',
  error: null
}

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(fetchQuotes.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.quotes = action.payload.results
    })

    builder.addCase(fetchQuotes.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    })
  }
})

export const getQuotes = (state) => state.quotes.quotes
export const getQuotesStatus = (state) => state.quotes.status
export const getQuotesError = (state) => state.quotes.error

export default quotesSlice.reducer
