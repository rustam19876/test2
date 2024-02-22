import Reducer from './Reducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    todos:Reducer
})

export default rootReducer
