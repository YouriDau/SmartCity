import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const isAdmin = false;

  const navigation = useNavigation();

  const showMenu = () => {
    if (isAdmin) {
      return (
        <View
          style={[
            { display: isMenuVisible ? "flex" : "none" },
            styles.accountMenu,
          ]}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.accountMenuItem}>Sign in</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text style={styles.accountMenuItem}>Sign up</Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        <View
          style={[
            { display: isMenuVisible ? "flex" : "none" },
            styles.accountMenu,
          ]}
        >
          <Pressable onPress={() => {}}>
            <Text style={styles.accountMenuItem}>Sign out</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("DeleteAccount");
            }}
          >
            <Text style={styles.accountMenuItem}>Delete</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("UpdateAccount");
            }}
          >
            <Text style={styles.accountMenuItem}>Modify</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text style={styles.accountMenuItem}>My reviews</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text style={styles.accountMenuItem}>My reports</Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("Maps");
          }}
        >
          <Text style={styles.text}>Map</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
          onPress={() => {
            if (isMenuVisible) {
              setMenuVisible(false);
            } else {
              setMenuVisible(true);
            }
          }}
        >
          <Text style={styles.text}>Account</Text>
        </Pressable>

        {showMenu()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "grey",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  accountMenu: {
    position: "absolute",
    top: 42,
    left: -10,
    width: 100,
  },
  accountMenuItem: {
    backgroundColor: "lightblue",
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 2,
    textAlign: "center",
  },
});

export default Header;
