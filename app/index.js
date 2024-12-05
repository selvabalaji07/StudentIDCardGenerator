import React,{useState,createContext} from "react";
import InputForm from '../components/InputForm';
import IDCard from '../components/IDCard';
import Home from'../components/Home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from '@react-navigation/native';
const Stack=createNativeStackNavigator();
export const StudentContext=createContext();

export default function Index() {
  const [studentDetails, setStudentDetails] = useState(null);
  return (
    <StudentContext.Provider value={{ studentDetails, setStudentDetails }}>
    <NavigationIndependentTree>
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="IDCard" component={IDCard}/>
         <Stack.Screen name="InputForm" component={InputForm}/>
         <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
     </NavigationContainer>
    </NavigationIndependentTree> 
    </StudentContext.Provider>
     
  );
}

