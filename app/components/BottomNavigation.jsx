import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Store from "./Store";
import Profile from "./Profile";
import Cart from "./Cart";
import { useRoute } from "@react-navigation/native";
import { useCart, getCartQuantity } from './CartContext';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const route = useRoute();
  const { username } = route.params || {};
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Cart" && cartQuantity > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartQuantity}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <Store username={username} />}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <Profile username={username} />}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
badge:{
  position: 'absolute',
},
badgeText:{
  marginTop: -4,
  marginLeft: 16,
  backgroundColor: 'green',
  width: 20,
  height: 20,
  borderRadius: 10,
  color: '#fff',
  paddingLeft: 6,
  paddingTop: 3,
  fontSize: 10,
},
});