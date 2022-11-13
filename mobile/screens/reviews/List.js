import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import Title from "../../components/Title";
import Button from "../../components/Button";
import DeleteForm from "./DeleteForm";

const DATA = [
  {
    id: 3645654444444445,
    date: "04/11/2022",
  },
  {
    id: 0,
    date: "28/12/2022",
  },
  {
    id: 1,
    date: "05/11/2022",
  },
  {
    id: 2,
    date: "05/11/2022",
  },
  {
    id: 3,
    date: "05/11/2022",
  },
  {
    id: 4,
    date: "05/11/2022",
  },
  {
    id: 5,
    date: "05/11/2022",
  },
];

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
            navigation.navigate("UpdateForm");
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

const List = ({ navigation }) => {
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
          data={DATA}
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
        <Button />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    height: 500,
    width: "80%",
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    width: "100%",
  },
});

export default List;
