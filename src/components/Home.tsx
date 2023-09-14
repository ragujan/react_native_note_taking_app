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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
 
  AddNotes: { contact: string };
  Home:{contact:string,fname:string,lname:string};
  Login:undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



type ItemProps = { title: string; description: string; category: string };

function Home({ navigation, route }:Props) {
  const [notes, setNotes] = React.useState([]);

  const [count, setCount] = React.useState(20);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await viewNotes();
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

  const viewNotes = async () => {
    let existingNotes = await getExistingNotes();
    if (existingNotes) {
      setNotes(existingNotes);
    } else {
      setNotes([]);
    }
  };
  const logOut = ()=>{
    navigation.navigate("Login");
  }
  const getExistingNotes = async () => {
    let noteFoundStatus = false;
    let existingNotes:string | null= await AsyncStorage.getItem("my-notes");
    console.log("existing notes ", existingNotes);
    let userNotes:[] = [];

    const contact = route.params.contact;
    let notes:[] = existingNotes=== null?[]:JSON.parse(existingNotes);
    if (!notes) {
      console.log("all notes are empty ", notes);
    } else {
      for (let i = 0; i < notes.length; i++) {
        const individualNote = notes[i];
        if (individualNote["contact"] === contact) {
          userNotes = individualNote["notes"];
          noteFoundStatus = true;
          break;
        }
      }
    }
    return userNotes;
  };
  const clearNotes = async () => {
    let existingNotes:string|null = await AsyncStorage.getItem("my-notes");
    console.log("existing notes ", existingNotes);
    const contact = route.params.contact;
    let notes:[] = existingNotes === null ? []:JSON.parse(existingNotes);
    if (!notes) {
      console.log("all notes are empty ", notes);
    } else {
      for (let i = 0; i < notes.length; i++) {
        const individualNote = notes[i];
        if (individualNote["contact"] === contact) {
          console.log("existing notes are before ", individualNote["notes"]);
          notes.splice(i, 1);
          i--;
          // individualNote["notes"] = [];
          break;
        }
      }
    }

    console.log(
      "after removed ",
      JSON.parse(await AsyncStorage.getItem("my-notes") || "" )
    );
    await AsyncStorage.setItem("my-notes", JSON.stringify(notes));
    // await AsyncStorage.setItem("my-notes", "");
  };
  const createObject = () => {
    return {
      contact: route.params.contact,

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
          <View style={style.buttonContainer}>
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
                onPress={async () => {
                  await clearNotes();
                  await viewNotes();
                }}
              >
                <Text style={style.btnText}>Clear Notes</Text>
              </Pressable>
            </View>
          </View>
          <View style={{paddingTop:20}}>
            <Pressable onPress={()=>{logOut()}}>
              <Text style={{fontSize:15,fontWeight:"500",color:"blue",textDecorationLine:"underline"}}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  const getFooter = () => {
    return <View style={style.footer}></View>;
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          style={style.flatList}
          data={notes}
          renderItem={({ item }:any) => (
            <NoteItems
              title={item.title}
              description={item.description}
              category={item.category}
            />
          )}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
        />
      </SafeAreaView>
    </>
  );
}

export default Home;
const NoteItems = ({ title, description, category }: ItemProps) => (
  <View style={style.listContainer}>
    <View style={style.listContainerInner}>
      <View style={style.titleCategory}>
        <Text style={style.title}>Title: {title}</Text>
        <Text style={style.category}>Category: {category}</Text>
      </View>
      <View style={style.descriptionContainer}>
        <Text style={{ fontSize: 15 }}>{description}</Text>
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 15,

    // backgroundColor:"green"
  },
  flatList: {
    width: "100%",
    paddingBottom: 200,
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
  buttonContainer:{
     display: "flex",
    flexDirection: "row",
    marginHorizontal:"auto",
    justifyContent:"space-between",
    width: 270 
  },
  addNoteButtonContainer: {
    paddingTop: 6,
    
  },
  addNoteButton: {
    backgroundColor: "#24a0ed",
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: 125,
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
    alignItems: "center",

    // paddingBottom:30
  },
  listContainerInner: {
    width: "80%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
    marginVertical: 5,
    borderRadius: 8,
  },
  titleCategory: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // backgroundColor:"pink",
    width: 300,
    paddingLeft: 10,
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "300",
    marginRight: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: "300",
  },
  descriptionContainer: {
    width: 300,
    backgroundColor: "#c6c6c6",
    paddingVertical: 15,
    paddingLeft: 10,
    borderRadius: 4,
    height: 100,
  },
  footer: {
    paddingBottom: 30,
  },
});
