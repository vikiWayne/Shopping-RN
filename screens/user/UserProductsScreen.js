import React, { useState } from "react";
import {
  FlatList,
  Button,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const EditProductHandlter = (id, title) => {
    navigation.navigate("editProduct", { id, title });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> No Data</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => EditProductHandlter(item.id, item.title)}
        >
          <View style={styles.btn}>
            <Button
              color={Colors.accent}
              title="Edit"
              onPress={() => EditProductHandlter(item.id, item.title)}
            />
          </View>
          <View style={styles.btn}>
            <Button
              color="red"
              title="Delete"
              onPress={() => deleteHandler(item.id)}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 150,
  },
});

export default UserProductScreen;
