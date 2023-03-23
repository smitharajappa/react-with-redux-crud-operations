import * as types from "./constants";

const initialState = {
  deliveries: [],
  delivery: {},
  isLoading: true,
};

const deliveryReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_DELIVERIES:
      return {
        ...state,
        deliveries: action.payload,
        isLoading: false,
      };
    case types.DELETE_DELIVERY_BY_ID:
    case types.ADD_DELIVERY:
      return {
        ...state,
        isLoading: false,
      };
    case types.GET_DELIVERY_BY_ID:
      return {
        ...state,
        delivery: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default deliveryReducers;
