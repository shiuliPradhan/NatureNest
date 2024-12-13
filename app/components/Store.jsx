import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Searchbar from "../components/Seachbar";
import { useNavigation } from "expo-router";
import { useCart } from "./CartContext";
import { plants, seeds } from "../../constants/plantsData";

export default function Store({ username }) {
  const { addToCart } = useCart();
  const navigation = useNavigation();
  const currentDay = new Date().toLocaleString("en-in", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleString("en-in", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("plants"); // State to toggle between sections

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeeds = seeds.filter((seed) =>
    seed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <View style={styles.plantCard}>
      <Image source={item.image} style={styles.plantImage} />
      <Text style={styles.plantName}>{item.name}</Text>

      {/* Discount Badge */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount} OFF</Text>
      </View>

      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        <Text style={styles.plantPrice}>{item.price}</Text>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={{ color: "#fff" }} onPress={() => addToCart(item)}>
            Add To Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text
            onPress={() => {
              addToCart(item);
              navigation.navigate("Cart");
            }}
            style={{ color: "#fff" }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>{username}</Text>
        </View>
        <View>
          <Text style={styles.welcomeText}>{currentTime}</Text>
          <Text style={styles.userName}>{currentDay}</Text>
        </View>
      </View>

      {/* Searchbar */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Toggle Section Buttons */}
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          onPress={() => setActiveSection("plants")}
          style={[styles.toggleButton, activeSection === "plants" && styles.activeToggle]}
        >
          <Text style={styles.toggleButtonText}>Plants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSection("seeds")}
          style={[styles.toggleButton, activeSection === "seeds" && styles.activeToggle]}
        >
          <Text style={styles.toggleButtonText}>Seeds</Text>
        </TouchableOpacity>
      </View>

      {/* Plants Section */}
      {activeSection === "plants" && (
        <FlatList
          data={filteredPlants}
          numColumns={2}
          ListHeaderComponent={() => (
            <View style={styles.content}>
              <View style={styles.discountCard}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Get discount prices up to 35%
                </Text>
                <Text style={styles.discountSubText}>
                  Claim vouchers every week and get free shipping
                </Text>
                <Image
                  source={require("../../assets/images/icon.jpg")}
                  style={styles.discountImage}
                />
              </View>

              <Text style={styles.sectionTitle}>Popular Plants</Text>
            </View>
          )}
          renderItem={renderProduct}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<Text style={styles.plantName}>Sorry, no plants found</Text>}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Seeds Section */}
      {activeSection === "seeds" && (
        <FlatList
          data={filteredSeeds}
          numColumns={2}
          ListHeaderComponent={() => (
            <View style={styles.content}>
              <Text style={styles.sectionTitle}>Seeds</Text>
            </View>
          )}
          renderItem={renderProduct}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<Text style={styles.plantName}>Sorry, no seeds found</Text>}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    paddingHorizontal: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: "#333",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    paddingHorizontal: 20,
  },
  discountCard: {
    marginTop: 20,
    backgroundColor: "#E0FFE5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  discountSubText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  discountImage: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  plantCard: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    position: "relative", // For discount badge positioning
  },
  plantImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  plantName: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 8, // To add spacing between prices
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through", // To strike-through original price
  },
  plantPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 80,
  },
  toggleButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  activeToggle: {
    backgroundColor: "#e0e0e0",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
