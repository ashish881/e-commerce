import { ADD_TO_CART, REMOVE_FROM_CART } from "../constant/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // new product in the cart..
            const item = action.payload
            //check the cart if the same product exist..
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                // check the cart if item is already in cart then update new one or else is it.
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                //if not then push the new one in the cart array
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state

    }

};
