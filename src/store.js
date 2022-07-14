import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducers'; //como el archico se llama index.js podemos obviar su nombre, pero es ese el archivo desde el que estamos importando

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store;