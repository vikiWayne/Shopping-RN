const { ADD_ORDER, SET_ORDERS } = require("../actions/order");
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      console.log("ORDER PLACED");
      return { ...state, orders: state.orders.concat(newOrder) };
    default:
      return state;
  }
};
