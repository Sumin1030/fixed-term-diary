import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    lang: "ENG"
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload;
            axios.post('/api/setLanguage', {lang: action.payload}).then((res) => {
                // if(typeof res.data == 'object') lang = res.data.val;
                // callback(this.getLangObj(res.data));
                console.log('lang set', res.data);
            });
        }
    }
});

export default languageSlice.reducer;
export const languageActions = languageSlice.actions;