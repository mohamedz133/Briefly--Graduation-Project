import { configureStore } from "@reduxjs/toolkit";

import notifyReducer from './slices/NotifySlice'

export default configureStore({reducer:{ notifyState: notifyReducer }})

