import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { getReviews } from "../../redux/selectors";
import { useNavigation } from "@react-navigation/native";

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

const List = () => {
  const reviews = useSelector(getReviews);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return <Item navigation={navigation} id={item.id} date={item.date} />;
  };

  const handlePressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
