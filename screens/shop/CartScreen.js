import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

import Card from "../../components/UI/Card";
import CartItem from "../../components/shop/CatItem";
import Colors from "../../constants/Colors";

const CartScreen = ({ navigation }) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    setLoading(true);
    await dispatch(addOrder(cartItems, totalAmount));
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            $ {(Math.round(totalAmount.toFixed(2)) * 100) / 100}
          </Text>
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.accent} />
        ) : (
          <Button
            title="Order now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            deletable
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => dispatch(removeFromCart(item.productId))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
