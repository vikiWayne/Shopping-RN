import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";
import Colors from "../constants/Colors";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Loading Startup Screeen");
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      userData && console.log("USER DETAILS FETCHED FROM DEVICE");
      if (!userData) {
        console.log("userData", userData);
        navigation.navigate("Login");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        console.log("TOKEN EXPITRED");
        navigation.navigate("Login");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("UserMain");
      dispatch(authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch, navigation]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
