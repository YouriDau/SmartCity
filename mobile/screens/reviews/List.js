import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { getReviews } from "../../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Item = ({ navigation, id, date }) => {
  return (
    <View style={styles.item}>
      <View style={styles.leftPart}>
        <Text>
          review {id}: {date}
        </Text>
      </View>

      <View>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("UpdateReview", { id });
          }}
        >
          <Text style={styles.button}>See more</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("DeleteReview", { id });
          }}
        >
          <Text style={styles.button}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const List = ({ navigate, route }) => {
  const { toiletId } = route.params;
  const reviews = useSelector(getReviews);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const renderItem = ({ item }) => {
    return <Item navigation={navigation} id={item.id} date={item.date} />;
  };

  const handlePressCancel = () => {
    navigation.goBack();
  };

  const showReviews = () => {
    if (reviews.length > 0) {
      return (
        <View>
          <Title text={"Reviews"} />
          <View style={styles.content}>
            <FlatList
              data={reviews}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              text={"Cancel"}
              textColor={"white"}
              btnColor={"grey"}
              handlePress={handlePressCancel}
            />
          </View>
        </View>
      );
    } else {
      return <Text>There is not reviews in the list</Text>;
    }
  };

  return <View style={styles.container}>{showReviews()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    height: "50%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  item: {
    backgroundColor: "lightgrey",
    padding: 20,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftPart: {
    flex: 1,
  },
  pressable: {
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  button: {
    color: "blue",
  },
  buttons: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default List;
