// import { createSlice } from '@reduxjs/toolkit'

import { createSlice } from "@reduxjs/toolkit";

const notifySlice=createSlice({


    name: 'notifyState',
    initialState: {
        type: 'notify',
        message: 'no error',
        requestPending:false,
    },
    reducers: {



        setError: (state, action) => {
            //action is the payload ,here the err msg
            state.message = action
            state.type = 'error'
        }
       
        , setPending: (state,action) => {
            state.requestPending=action;//request name
        }
       
        ,
        setSuccess: (state, action) => {
            //action is the payload ,here the err msg
            state.message = action
            state.type = 'success'
        },
        setNotification: (state, action) => {
            //action is the payload ,here the err msg
            state.message = action
            state.type = 'notification'
        }
    }
})

export  const actions=notifySlice.actions
export default notifySlice.reducer