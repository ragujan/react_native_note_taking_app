import React, { useState, createRef, useEffect, useRef } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddNotes = ({ navigation, route }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");

  interface noteInterface {
    title: string;
    description: string;
    category: string;
  }

  const [resetSelection, setResetSelection] = useState(0);

  let textInput = useRef();

  const data = [
    { key: "1", value: "Study" },
    { key: "2", value: "Work" },
    { key: "3", value: "Travel" },
    { key: "4", value: "Law" },
  ];

  const defaultSelection = {
    key: "1",
    value: "Study",
  };
  const clearSelection = () => {
    setResetSelection(1);
  };

  const addNote = async () => {
    // await AsyncStorage.setItem("my-notes", "");
    const contact = route.params.contact;
    let contactFound = false;

    if (title === "" || description === "") {
      return;
    }

    const myNote = {
      title: title,
      description: description,
      category: category,
    };

    try {
      let existingNotes = await getExistingNotes();
      // return;
      let updatedNotes = [...existingNotes];

      const user = {
        contact: route.params.contact,
      };
      console.log("updated notes are ", updatedNotes);

      if (existingNotes[0] === undefined) {
        console.log("empty notes");
        updatedNotes.push(contact);
      } else {
        console.log("update note length ",updatedNotes.length)
        let contactObj = null;

        for (let i = 0; i < updatedNotes.length; i++) {
          if (contact in updatedNotes[i]) {
            contactFound = true;
            console.log("contact is found");
          }
        }
      }

      return;
      console.log("updated notes are ", updatedNotes);
      await AsyncStorage.setItem("my-notes", JSON.stringify(updatedNotes));
      // await AsyncStorage.setItem("my-notes", "");
      existingNotes = await getExistingNotes();

      setDescription("");
      setTitle("");
      setResetSelection(resetSelection + 1);
    } catch (error) {
      Alert.alert("Couldn't enter notes");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTitle("");
      setDescription("");
      setResetSelection(resetSelection + 1);
    });
    return unsubscribe;
  }, [navigation]);

  const getExistingNotes = async () => {
    const notes = await AsyncStorage.getItem("my-notes");
    console.log("get Existing is called ", notes);
    return notes ? JSON.parse(notes) : [];
  };
  return (
    <>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      > */}
      <ScrollView>
        <View style={style.container}>
          <View style={style.contentContainer}>
            <View style={style.headerContainer}>
              <Text style={style.textHeader}>Add Notes</Text>
            </View>
            <View style={style.formContainer}>
              <View style={style.textInputPair}>
                <Text style={style.textLabel}>Title</Text>
                <TextInput
                  onChangeText={(value) => {
                    setTitle(value);
                  }}
                  style={style.textInput}
                  value={title}
                />
              </View>
              <View style={style.textInputPair}>
                <Text style={style.textLabel}>Description</Text>
                <TextInput
                  onChangeText={(value) => {
                    setDescription(value);
                  }}
                  style={style.textInput}
                  value={description}
                />
              </View>

              <View style={style.textInputPair}>
                <Text style={style.textLabel}>Category</Text>
                <View style={{ marginTop: 5 }}>
                  <SelectList
                    setSelected={(value: any) => setCategory(value)}
                    data={data}
                    save="value"
                    boxStyles={style.dropDown}
                    inputStyles={style.dropDownText}
                    defaultOption={defaultSelection}
                    key={resetSelection}
                  />
                </View>
              </View>

              <View style={style.textInputPair}>
                <Pressable
                  style={style.btnContainer}
                  onPress={() => {
                    addNote();
                  }}
                >
                  <Text style={style.btnText}>Add Note</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};
export default AddNotes;

const style = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageHidden: {
    display: "none",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 30,

    // backgroundColor:"green"
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    width: "100%",
  },
  headerContainer: {
    paddingTop: 25,
    marginTop: -20,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    // backgroundColor: "green",
  },
  headerContainerTopped: {
    paddingTop: 25,
    marginTop: 40,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    // backgroundColor: "green",
  },
  formContainer: {
    // backgroundColor:"white",
    paddingTop: 15,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop:-20
  },
  formContainerTopped: {
    marginTop: -25,
  },
  topped: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    width: "100%",
    marginTop: -120,
  },

  textHeader: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

  textInputPair: {
    paddingTop: 10,
  },
  textLabel: {
    fontSize: 18,
  },
  textInput: {
    width: 250,
    fontSize: 16,
    // height:35,
    // backgroundColor:"yellow",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 5,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    // borderColor:"blue"
  },
  dropDown: {
    borderRadius: 4,
    padding: 5,
    borderWidth: 1,
    width: 250,
    borderColor: "#D3D3D3",
  },
  dropDownText: {
    fontSize: 14,
  },
  btnContainer: {
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
  loginLabel: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 19,
  },
});
