import React, { useEffect, useRef } from "react";
import { MainNav } from "./ShopNavigator";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

export default function NavigationContainer() {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    console.log("loaded");
    if (!isAuth) {
      navRef.current.dispatch(CommonActions.navigate("Login"));
    }
  }, [isAuth]);
  return <MainNav />;
}
