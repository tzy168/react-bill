import billReducer from "./reducer/bill";

import { configureStore } from "@reduxjs/toolkit";//组合

const store = configureStore({
    reducer: {
        bill: billReducer
    }
})

export default store;