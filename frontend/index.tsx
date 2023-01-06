import { createStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')

let filter: string = 'Title'

interface Action {
  type: string
  payload: string
}

function filterReducer(state = filter, action: Action) {
  filter = action.payload
  return state
}

export function setFilter(payload: string) {
  return { type: 'SET_FILTER', payload }
}

export const filterStore = createStore(filterReducer)

ReactDOM.render(
  <Provider store={filterStore}>
    <App></App>
  </Provider>,
  rootElement
)
