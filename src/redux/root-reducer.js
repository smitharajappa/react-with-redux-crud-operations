import { combineReducers } from "redux";
import deliveryReducers from "./reducer";

const rootReducer = combineReducers({
    delivery: deliveryReducers
})

export default rootReducer