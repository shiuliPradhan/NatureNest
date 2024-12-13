import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importing navigation
import { useCart } from './CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation(); // Hook to access navigation
  
  // Animation setup
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Horizontal sliding animation
    Animated.loop(
      Animated.sequence([
        Animated.spring(translateX, {
          toValue: 50,
          useNativeDriver: true,
          speed: 1,
          bounciness: 100,
        }),
        Animated.spring(translateX, {
          toValue: -50,
          useNativeDriver: true,
          speed: 1,
          bounciness: 15,
        }),
      ])
    ).start();
  }, [translateX]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return total + price * item.quantity;
  }, 0).toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0){
      Alert.alert("🪴Your cart looks a little empty  🪴Let's add some green magic")
    }else{
    navigation.navigate('Checkout', { cartItems });
    }
  };

  const handleRemove = (itemName) => {
    removeFromCart(itemName);
    if (cartItems.length === 1) {
      clearCart();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.cartImage} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>
                ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
              </Text>
              <Text style={styles.cartQuantity}>Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(item.name)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty!</Text>
            <Animated.Image
              source={require('../../assets/images/emptyCartIcon2.png')}
              style={[styles.emptyCartImage, { transform: [{ translateX }] }]}
            />
          </View>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  cartDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cartName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartPrice: {
    fontSize: 16,
    color: '#666',
  },
  cartQuantity: {
    fontSize: 16,
    color: '#666',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartImage: {
    width: 300,
    height: 300, 
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
