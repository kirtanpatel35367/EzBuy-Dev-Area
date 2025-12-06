import { configureStore } from "@reduxjs/toolkit";
import adminproductReducer from './admin/product-slice'
import shopProductReducer from './product-slice/index'
import shoppingCartReducer from './shop/cart-slice/index'
import AddresscartReducer from './shop/address-slice/index'
import OrderDetailsReducer from './shop/order-slice/index'
import authReducer from './auth-slice'
import reviewReducer from './shop/review-slice/index'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminproducts: adminproductReducer,
        shopProducts: shopProductReducer,
        shoppingcart: shoppingCartReducer,
        addressCart: AddresscartReducer,
        orderDetails: OrderDetailsReducer,
        reviews: reviewReducer
    }
})

export default store