import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import SignUp from "./SignUp";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <SafeAreaView >
      <StatusBar hidden={true} />
      <SignUp/>
      {/* <View >
        <Text>Open up App.tsx to start working on your app! 333</Text>
      
      </View> */}
      {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      /> */}
    </SafeAreaView>
  );
}


