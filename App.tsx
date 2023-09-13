import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import SignUp from "./SignUp";
import { useState } from "react";
import Login from "./Login";
import Home from "./Home";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddNotes from "./AddNotes";
const Stack = createNativeStackNavigator();
export default function App() {
  return (


      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUp}/>
            <Stack.Screen options={{headerShown:false,headerBackVisible:false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown:false,headerBackVisible:false,headerBackTitleVisible:false}} name="Home" component={Home} />
            <Stack.Screen  name="AddNotes" component={AddNotes} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}


