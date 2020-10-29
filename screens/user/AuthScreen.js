import React, {
  useLayoutEffect,
  useState,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { signup, login } from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const { navigation } = props;

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const signupToggle = () => {
    setIsSignup((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const formInitialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    formInitialState
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "Okey" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  // Configuring the Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Login",
      heaerTitle: "Authenticate",
    });
  }, [navigation]);

  return (
    <LinearGradient colors={["#FFEDFF", "#FFE3FF"]} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Text style={styles.loginText}>
            {isSignup ? "Create new account" : "Login now"}
          </Text>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            initialValue=""
            onInputChange={inputChangeHandler}
          />
          {loading ? (
            <View>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <Button
                  title={isSignup ? "Sign up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              </View>
              <View style={styles.btn}>
                <Button
                  title={isSignup ? "switch to login" : "switch to sign up"}
                  color={Colors.accent}
                  onPress={signupToggle}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loginText: {
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "open-sans-bold",
    color: Colors.primary,
    fontSize: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    marginVertical: 10,
    padding: 10,
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
  btnContainer: {
    marginVertical: 10,
    paddingVertical: 5,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btn: {
    width: "40%",
  },
});

export default AuthScreen;
