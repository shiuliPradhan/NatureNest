import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function PaymentSuccess({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 2,
      bounciness: 20,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Orders');
    }, 2000);

    return () => clearTimeout(timer);
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.successText}>✔</Text>
      </Animated.View>
      <Text style={styles.message}>Payment Successful!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
