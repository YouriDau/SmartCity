import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
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
        <View
          style={[
            { display: isMenuVisible ? "flex" : "none" },
            styles.accountMenu,
          ]}
        >
          <Text style={styles.accountMenuItem}>Sign in</Text>
          <Text style={styles.accountMenuItem}>Sign up</Text>
          <Text style={styles.accountMenuItem}>Test</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 90,
    width: "100%",
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A8A8A8",
    paddingTop: Constants.statusBarHeight,
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
