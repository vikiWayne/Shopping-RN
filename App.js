import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { productsReducer } from "./store/reducer/products";
import { cartReducer } from "./store/reducer/cart";
import { orderReducer } from "./store/reducer/order";
import ReduxThunk from "redux-thunk";
import { authReducer } from "./store/reducer/auth";
import NavigationContainer from "@react-navigation/native";
import { MainNav } from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const loadFont = () =>
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={loadFont} onFinish={() => setDataLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      {/* <NavigationContainer /> */}
      <MainNav />
      <StatusBar style="auto" />
    </Provider>
  );
}
