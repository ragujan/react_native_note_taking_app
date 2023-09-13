import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import {
  Alert,
  BackHandler,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddNotes from "./AddNotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
type ItemProps = { title: string; description: string; category: string };

const NoteItems = ({ title, description, category }: ItemProps) => (
  <View style={style.listContainer}>
    <View style={style.titleCategory}>
      <Text style={style.title}>{title}</Text>
      <Text style={style.category}>{category}</Text>
    </View>
    <View style={style.descriptionContainer}>
      <Text style={{ fontSize: 15 }}>{description}</Text>
    </View>
  </View>
);

function Home2({ navigation, route }) {
  const [notes, setNotes] = React.useState([]);

  const [count, setCount] = React.useState(20);
  const viewNotes = async () => {
    // const lastUserContact = await getAllData();
    // console.log("last user contact is from last ", lastUserContact["contact"]);
    let existingNotes = await getExistingNotes();
    if (existingNotes === null) {
        console.log("nothing to show")
    } else {
      console.log("existing notes are ", existingNotes);
      setNotes(existingNotes);
    }
    return await getExistingNotes();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
        await viewNotes();
      //   const lastUserContact = await getAllData();
      //   console.log(
      //     "last user contact is from last from effect loaded",
      //     lastUserContact["contact"]
      //   );
      //   console.log("route params is ", route.params.contact);
      //   if (lastUserContact["contact"] != route.params.contact) {
      //     await AsyncStorage.setItem("my-notes", `{'contact':${route.params.contact}}`);
      //   }
      //   await viewNotes();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const getAllData = async () => {
    const notesString = await AsyncStorage.getItem("my-notes");
    if (notesString === "") {
      console.log("bro bro");
      return [`contact:${route.params.contact}`];
    } else {
      console.log("here it's not zero");
      const notes = JSON.parse(notesString);
      console.log("notes nots ", notes);
      console.log(notes[notes.length - 1]);
      return notes[notes.length - 1];
    }
  };
  const getExistingNotes = async () => {
    const notes = await AsyncStorage.getItem("my-notes");

    console.log("notes are ",notes);
  
    if (notes != null) {
    //   jsonNote = JSON.parse(notes);
    //   const lastItem = jsonNote[jsonNote.length - 1];
    //   console.log("last item is of json ", lastItem);
    //   jsonNote.pop();
    }
    // console.log("jsonnote is ", jsonNote);
    return notes ? JSON.parse(notes) : [];
  };

  const createObject = () => {
    return {
      contact: route.params.contact,
      fname: route.params.fname,
      lname: route.params.lname,
    };
  };
  const goToAddNotes = () => {
    console.log();
    navigation.navigate("AddNotes", createObject());
  };
  const getHeader = () => {
    return (
      <>
        <StatusBar hidden={true} />
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Text style={style.textHeader}>Home</Text>
            <View style={style.userNameContainer}>
              <Text style={style.fName}>{route.params.fname}</Text>
              <Text>{route.params.lname}</Text>
            </View>
            <Text style={{ textAlign: "center", paddingTop: 3 }}>
              {route.params.contact}
            </Text>
          </View>
          <View style={style.addNoteButtonContainer}>
            <Pressable
              style={style.addNoteButton}
              onPress={() => {
                goToAddNotes();
              }}
            >
              <Text style={style.btnText}>Add Notes</Text>
            </Pressable>
          </View>

          <View style={style.addNoteButtonContainer}>
            <Pressable
              style={style.addNoteButton}
              onPress={() => {
                viewNotes();
              }}
            >
              <Text style={style.btnText}>View Notes</Text>
            </Pressable>
          </View>
          {/* <View style={style.addNoteButtonContainer}>
            <Pressable
              style={style.addNoteButton}
              onPress={async () => {
                await AsyncStorage.setItem("my-notes", "");
              }}
            >
              <Text style={style.btnText}>Clear Notes</Text>
            </Pressable>
          </View> */}
        </View>
      </>
    );
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          style={style.flatList}
          data={notes}
          renderItem={({ item }) => (
            <NoteItems
              title={item.title}
              description={item.description}
              category={item.category}
            />
          )}
          ListHeaderComponent={getHeader}
        />
      </SafeAreaView>
    </>
  );
}

export default Home2;
const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 30,

    // backgroundColor:"green"
  },
  flatList: {
    width: "100%",
    // backgroundColor:"yellow",
  },
  headerContainer: {
    paddingTop: 15,
    display: "flex",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
    // backgroundColor: "green",
  },
  fName: {
    marginRight: 10,
  },
  addNoteButtonContainer: {
    paddingTop: 25,
  },
  addNoteButton: {
    backgroundColor: "#24a0ed",
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    width: 250,
    color: "white",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor:"red",
    alignItems: "center",
  },
  titleCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor:"pink",
    width: 300,
    paddingLeft: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 20,
  },
  category: {
    fontSize: 20,
    fontWeight: "600",
  },
  descriptionContainer: {
    width: 300,
    backgroundColor: "#e2e2e2",
    paddingVertical: 15,
    paddingLeft: 10,
    borderRadius: 4,
  },
});
