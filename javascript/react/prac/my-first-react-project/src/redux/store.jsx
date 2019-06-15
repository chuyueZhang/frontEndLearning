import {createStore, applyMiddleware, combineReducers} from 'redux'
import {counter, comments} from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
export const store = createStore(
    combineReducers({counter, comments}),
    composeWithDevTools(applyMiddleware(thunk))
    )