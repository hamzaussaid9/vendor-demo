import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { RootState } from "../../store";

export const loginAsyncThunk = createAsyncThunk('/auth/signin/getUser',async (token:string, {rejectWithValue})=>{
    const response = await agent.auth.getUser(token);
        console.log('auth response',response);
        if(response.length !== 0){
            return response[0];
        }
        else{
            console.log('token removed from thunk');
            localStorage.removeItem('token');
            return rejectWithValue(response.message as string );
        }
});

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    contactNo: string
}

export interface IAuthState {
    user: IUser | null,
    isLoading: true | false,
    isLoggedIn: true | false,
    errorMessage: string
}

const initialState :IAuthState ={
    isLoggedIn: false,
    isLoading: false,
    errorMessage: '',
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) =>{
            state = {
                errorMessage: '',
                isLoading: false,
                isLoggedIn: false,
                user: null
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsyncThunk.pending, (state)=>({...state, isLoading: true}))
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {
            return{
                ...state,
                isLoading: false,
                errorMessage: action.error.message || 'error',
                user: null,
                isLoggedIn: false
            }
    })

        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            errorMessage: '',
            user: (action.payload as unknown) as IUser
        }))
    }

});

export const {
    logout
} = authSlice.actions;

export const getAuthSelector = (state: RootState) => state.auth

export default authSlice.reducer;