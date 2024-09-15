import { createSlice } from "@reduxjs/toolkit";

const privateRouteSlice = createSlice({
    name: "privateRoute",
    initialState: {
        gitHubVerified: localStorage.getItem("gitHubVerified") === "true" ? true : false,
        youTubeVerified: localStorage.getItem("youTubeVerified") === "true" ? true : false,
    },
    reducers: {
        setGitHubVerified: (state, action) => {
            state.gitHubVerified = action.payload;

            if (action.payload) {
                localStorage.setItem("gitHubVerified", "true");
            } else {
                localStorage.setItem("gitHubVerified", "false");
            }
        },
        setYouTubeVerified: (state, action) => {
            state.youTubeVerified = action.payload;

            if (action.payload) {
                localStorage.setItem("youTubeVerified", "true");
            } else {
                localStorage.setItem("youTubeVerified", "false");   
            }
        },
    },
});

export const { setGitHubVerified, setYouTubeVerified } = privateRouteSlice.actions;

export default privateRouteSlice.reducer;