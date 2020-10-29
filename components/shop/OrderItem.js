import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CatItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}> ${props.amount.toFixed(2)} </Text>
        <Text style={styles.date}> {props.date}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          color={Colors.primary}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
      </View>
      {showDetails && (
        <View>
          {props.item.map((item) => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              amount={item.sum}
              title={item.productTitle}
              deletable={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 15,
  },
});

export default OrderItem;
