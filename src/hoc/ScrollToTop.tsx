import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

interface IScrollToTop {
  children: JSX.Element
}

interface StateType {
  scrollToTopDisable?: boolean
}

interface IHistoryListener {
  hash: string
  state?: StateType | null
}

/**
  * A HOC which listens to history changes and scrolls to top of the page when triggered.
  *
  * To disable Scroll to top on history.push, you should pass scrollToTopDisable: true state, e.g.:
  * history.push({
  *   state: {
  *     scrollToTopDisable: true,
  *   },
  * })
  *
  * @component
  * @param {HTMLElement} children The children covered by the listener.
  */
const ScrollToTop: React.FC<IScrollToTop> = ({ children }) => {
  const history = useHistory()

  useEffect(() => {
    const unlisten = history.listen((location: any) => {
      const { hash, state } = location as IHistoryListener

      if (!_isEmpty(state) && state?.scrollToTopDisable) {
        return
      }

      if (hash !== '') {
        return
      }

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }, 0)
    })
    return unlisten
  }, [history])

  return children
}

export default ScrollToTop
