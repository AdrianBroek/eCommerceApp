import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import {BrowserRouter} from 'react-router-dom'
// Apollo
import {ApolloProvider} from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

const client = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbguyu910qs001t16nfw3ixe/master',
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(



    <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </ApolloProvider>
    </Provider>

);