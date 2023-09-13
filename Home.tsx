import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Alert,
  BackHandler,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Home({ navigate, route }) {
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
  return (
    <ScrollView>
      <SafeAreaView style={style.container}>
        <StatusBar hidden={true} />
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
              null;
            }}
          >
            <Text style={style.btnText}>Add Notes</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Home;
const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 30,

    // backgroundColor:"green"
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
    justifyContent: "center",
    width: 200,
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
});
