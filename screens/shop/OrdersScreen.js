import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrder } from "../../store/actions/order";
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrder()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> No orders yet ! </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          item={item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
