import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";

import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";
import AuthScreen from "../screens/user/AuthScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import EditProductScreen from "../screens/user/EditProductScreen";
import { useSelector } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import { logout } from "../store/actions/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ShopNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={defaultStackOptions}>
    <Stack.Screen name="AllProducts" component={ProductOverViewScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="UserOrders" component={OrdersScreen} />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: "Your Cart", title: "cart" }}
    />
  </Stack.Navigator>
);

const OrdersNavigator = ({ navigation }) => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        title: "Your Orders",
        headerTitle: "Your Orders",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName="ios-menu"
              onPress={() => navigation.openDrawer()}
            />
          </HeaderButtons>
        ),
      }}
    />
  </Stack.Navigator>
);

const AdminNavigator = ({ navigation }) => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen
      name="UserProducts"
      component={UserProductScreen}
      options={{
        title: "My Products",
        headerTitle: "My Products",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => navigation.openDrawer()}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName={
                Platform.OS === "android"
                  ? "md-add-circle-outline"
                  : "ios-add-circle-outline"
              }
              onPress={() => navigation.navigate("editProduct")}
            />
          </HeaderButtons>
        ),
      }}
    />
    <Stack.Screen
      name="editProduct"
      component={EditProductScreen}
      options={{
        title: "Edit Product",
        headerTitle: " Edit",
      }}
    />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="logout"
        color={Colors.primary}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
      },
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Products"
      component={ShopNavigator}
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Orders"
      component={OrdersNavigator}
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Admin"
      component={AdminNavigator}
      options={{
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-person" : "ios-person"}
            size={23}
            color={drawerConfig.color}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen name="Main" component={StartupScreen} />
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="UserMain" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export const MainNav = () => {
  const isLoggedIn = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer>
      {isLoggedIn && token ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
