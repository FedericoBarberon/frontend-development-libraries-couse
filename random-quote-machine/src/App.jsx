import { FaQuoteLeft, FaTwitter, FaTumblr } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotes, fetchQuotes, getQuotesStatus, getQuotesError } from './features/quotes/quotesSlice'
import { useEffect, useState } from 'react'
import './app.scss'
import Spinner from './components/Spinner/Spinner'
import { changeColor } from './utils/changeColor'

export default function App () {
  const dispatch = useDispatch()
  const quotes = useSelector(getQuotes)
  const quotesStatus = useSelector(getQuotesStatus)
  const quotesError = useSelector(getQuotesError)
  const [quote, setQuote] = useState({})
  const [index, setIndex] = useState(0)

  const getNewQuote = () => {
    setQuote(quotes[index])
    if (index === quotes.length - 1) {
      dispatch(fetchQuotes())
      setIndex(0)
    } else {
      changeColor()
      setIndex(index + 1)
    }
  }

  useEffect(() => {
    if (quotesStatus === 'idle') {
      dispatch(fetchQuotes())
    } else if (quotesStatus === 'succeeded') {
      getNewQuote()
    } else if (quotesStatus === 'error') {
      setQuote({ content: 'There was an error loading the quote :(', author: 'Error messenger' })
    }
  }, [quotes])

  return (
    <div className='App'>
      <main className='quote-box' id='quote-box'>
        {
          quotesStatus === 'loading'
            ? <Spinner />
            : (
              <>
                <p className='quote-box__text' id='text'>
                  <FaQuoteLeft className='quote-box__text__icon' />
                  {quote?.content}
                </p>
                <p className='quote-box__author' id='author'>- {quote?.author}</p>
              </>
              )
        }
        <div className='quote-box__actions'>
          <div className='quote-box__actions__links'>
            <a href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote?.content}" - ${quote?.author}`} id='tweet-quote' className='button' title='Tweet this quote!' target='_blank' rel='noreferrer'><FaTwitter /></a>
            <a href={`https://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quote?.author}&content=${quote?.content}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} id='tumblr-quote' className='button' title='Post this quote on tumblr!' target='_blank' rel='noreferrer'><FaTumblr /></a>
          </div>
          <button id='new-quote' className='button' onClick={getNewQuote} disabled={Boolean(quotesError)}>New Quote</button>
        </div>
      </main>
    </div>
  )
};
