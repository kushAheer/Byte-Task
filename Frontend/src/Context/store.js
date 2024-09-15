import { configureStore } from "@reduxjs/toolkit";
import gitHubSlice from "./Slice/gitHubSlice";
import googleSlice from "./Slice/googleSlice";
import privateRouteSlice from "./Slice/privateRouteSlice";

const store = configureStore({
    reducer: { 
        githubs : gitHubSlice,
        googles : googleSlice,
        privateRoutes : privateRouteSlice

    }
})

export default store;