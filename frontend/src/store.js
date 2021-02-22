import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailsReducer } from './reducer/productReducer';
import { userLoginReducer, userProfileDetailsReducer, userProfileUpdateReducer, userRegisterReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';


// GET THE CART IN THE LOCAL STORAGE
const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  cart: {
    cartItems: cartLocalStorage
  },
  userLogin: {
    userInfo: userInfoStorage
  }
}

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer
})

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;