import { createSlice } from '@reduxjs/toolkit';

const googleSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('googlUser') ? JSON.parse(localStorage.getItem('googlUser')) : null,
        
        
        
    },
    reducers: {
        googleLogin: (state, action) => {
            state.user = action.payload;
            
            localStorage.setItem('googlUser', JSON.stringify(action.payload));
            
        },
        googleLogout: (state) => {
            state.user = null;
            
            localStorage.removeItem('googlUser');
            
        },
        
    },
});

export const { googleLogin, googleLogout } = googleSlice.actions;

export default googleSlice.reducer;