import { createStore, combineReducers } from "redux";
import { appReducer } from './reducer';

const reducers = combineReducers({
    app:appReducer
});


 const  store = createStore(reducers);

 export default store