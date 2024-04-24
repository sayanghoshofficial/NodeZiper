import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userLoginReducers, userRegisterReducer } from '../reducers/userReducers';
import { noteReducer } from '../reducers/noteReducers';


const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducer,
    noteList: noteReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null
const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const middleWere = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWere))
)

export default store;