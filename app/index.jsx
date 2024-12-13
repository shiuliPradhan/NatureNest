import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./components/Register";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import BottomNavigation from "./components/BottomNavigation";
import { CartProvider } from "./components/CartContext";
import Checkout from "./components/Checkout";
import PaymentSuccess from "./components/PaymentSuccess";
import Orders from "./components/Orders";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <CartProvider>
      <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        {/* <SafeAreaView style={styles.safeArea}> */}
          <StatusBar barStyle="light-content" backgroundColor="#004721" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#004721",
              },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="SignUp"
              component={Register}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="MainPage"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
            />
            <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccess}
            />
            <Stack.Screen name="Orders" component={Orders} options={{headerShown: false}} />
          </Stack.Navigator>
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
