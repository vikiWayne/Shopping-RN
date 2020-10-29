import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  FlatList,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchProduct } from "../../store/actions/products";

const ProductOverViewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log("PRODUCT LOADED");
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(fetchProduct());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  // THIS EFFECT RUNS ON EVERY TIME VISITING THIS PAGE
  useEffect(() => {
    console.log("WILLFOUCS UseEffect on ProductOverViewScreen");
    const willFocusSub = navigation.addListener("focus", loadProducts);
    return willFocusSub;
  }, [loadProducts]);

  useEffect(() => {
    let unmounted = false;
    console.log("loading UseEffect on ProductOverViewScreen");
    setIsLoading(true);
    loadProducts().then(() => {
      if (!unmounted) {
        setIsLoading(false);
      }
    });

    return () => (unmounted = true);
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      title: title,
      id: id,
    });
  };

  // Configuring the Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title:'All Products',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => navigation.navigate("Cart")}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> {error} </Text>
        <Button title="Try again" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text> No products found. Start adding some ! </Text>
        <Button
          title="add"
          onPress={() => navigation.navigate("editProduct")}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <View style={styles.btn}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => selectItemHandler(item.id, item.title)}
            />
          </View>
          <View style={styles.btn}>
            <Button
              color={Colors.primary}
              title="To cart"
              onPress={() => dispatch(addToCart(item))}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverViewScreen;
