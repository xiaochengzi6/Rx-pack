import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Home from './Application/Home/index'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router/index.js'
const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Home>{renderRoutes(routes)}</Home>
      </HashRouter>
    </Provider>
  )
}
export default App
