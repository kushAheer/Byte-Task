import { createSlice } from "@reduxjs/toolkit";

const gitHubSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('gitUser') ? JSON.parse(localStorage.getItem('gitUser')) : null,
        
    
    },
    reducers: {
        gitLogin: (state, action) => {
            state.user = action.payload;
            
            localStorage.setItem('gitUser', JSON.stringify(action.payload));
            
        },
        gitLogout: (state) => {
            state.user = null;
            
            localStorage.removeItem('gitUser');
            
        },
        
    },
    
});

export const { gitLogin , gitLogout } = gitHubSlice.actions;

export default gitHubSlice.reducer;
