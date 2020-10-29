import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const ProductItem = (props) => {
  const Touchable =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <Touchable onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}> {props.title} </Text>
              <Text style={styles.price}> ${props.price.toFixed(2)} </Text>
            </View>
            <View style={styles.btnContainer}>{props.children}</View>
          </View>
        </Touchable>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imgContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail: {
    alignItems: "center",
    padding: 10,
    height: "15%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 4,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#888",
  },
  btnContainer: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    paddingHorizontal: 5,
  },
});

export default ProductItem;
