import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = ({ route, navigation }) => {
  const { title, id } = route.params;
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === id)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.details}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Add to Cart"
            color={Colors.primary}
            onPress={() => dispatch(addToCart(product))}
          />
        </View>
        <Text style={styles.price}> ${product.price} </Text>
        <Text style={styles.description}> {product.description} </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    flex: 1,
  },
  imgContainer: {
    width: "100%",
    height: 300,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  btnContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    marginHorizontal: 20,
    fontSize: 14,
    textAlign: "center",
  },
});

export default ProductDetailScreen;
