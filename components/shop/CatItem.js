import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  const { quantity, title, amount, onRemove, deletable } = props;

  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount} </Text>
        {deletable && (
          <Touchable onPress={onRemove} style={styles.deleteBtn}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              color="red"
              size={23}
            />
          </Touchable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginHorizontal: 5,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteBtn: {
    marginLeft: 20,
  },
});

export default CartItem;
