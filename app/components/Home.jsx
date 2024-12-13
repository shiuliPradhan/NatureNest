import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

export default function Home({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Plantwall.jpg")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>NatureNest</Text>
        <Text style={styles.description}>
          Discover a lush world of green at your fingertips. Find the perfect
          plant to brighten your space and elevate your well-being.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: height * 0.7,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: -100,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    color: "gray",
    marginTop: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "#004721",
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
});
