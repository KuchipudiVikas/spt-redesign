// {
//     "id": "6719d6fa7e296a8b0bc3092e",
//     "user_id": "66dd28092aeddb7bc24b053f",
//     "username": "feathermage17",
//     "affiliate_id": 792,
//     "is_deleted": false,
//     "is_blocked": false,
//     "is_default_password": false,
//     "created_at": "2024-10-24T05:11:22.265Z",
//     "updated_at": "2024-10-24T05:11:22.265Z"
// }

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Affiliate {
    id: string;
    user_id: string;
    affiliate_id: number;
    is_deleted: boolean;
    is_blocked: boolean;
    is_default_password: boolean;
    created_at: string;
    updated_at: string;
}

interface AffiliateState {
    affiliateData: Affiliate | null;
    isLoading: boolean;
    loadingText: string;
    error: any;
}

const initialState: AffiliateState = {
    affiliateData: null,
    isLoading: false,
    loadingText: "Loading...",
    error: null,
};

export const affiliateSlice = createSlice({
    name: 'affiliate',
    initialState,
    reducers: {
        setAffiliateData: (state, action: PayloadAction<Affiliate>) => {
            state.affiliateData = action.payload;
        },
        setAffiliateIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        
        setAffiliateError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
    },
});


export const { setAffiliateData, setAffiliateIsLoading, setAffiliateError } =
  affiliateSlice.actions;

export default affiliateSlice.reducer;