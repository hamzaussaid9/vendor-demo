import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";


export const checkTokenThunk = createAsyncThunk('/auth/reset/checkToken', async (token: string, {rejectWithValue})=>{
    const response = await agent.auth.validateToken(token);
    console.log("token check resposbne" ,response);
    if(response.length !== 0){
        return response[0].email;
    }
    else{
        console.log('token is invalid');
        return rejectWithValue(response.message as string );
    }
})

export interface IResetState {
    email: string | null,
    isLoading: true | false,
    errorMessage: string
}

const initialState:IResetState = {
    isLoading: true,
    errorMessage: '',
    email: null
}

const resetSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(checkTokenThunk.pending, (state)=>({...state, isLoading: true}))
        builder.addCase(checkTokenThunk.rejected, (state, action) =>{
            return {
                ...state,
                isLoading: false,
                email: null,
                errorMessage: action.error.message || 'error'
            }
        })
        builder.addCase(checkTokenThunk.fulfilled, (state, action)=>{
            return {
                ...state,
                email: (action.payload as unknown) as string,
                isLoading: false,
                errorMessage: ''
            }
        })
    }
});

export const {} = resetSlice.actions;

export default resetSlice.reducer;