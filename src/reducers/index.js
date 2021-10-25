import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

export default combineReducers({
    userReducer,postReducer
})