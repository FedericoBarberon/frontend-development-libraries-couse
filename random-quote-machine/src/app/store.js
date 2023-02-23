import { configureStore } from '@reduxjs/toolkit'
import quotesReducer from '../features/quotes/quotesSlice'

export const store = configureStore({
  reducer: {
    quotes: quotesReducer
  }
})
