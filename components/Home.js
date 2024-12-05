import React, { useState,useContext } from "react";
import { Alert, StyleSheet, TouchableOpacity, View,TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentContext } from "../app/index";
import { MaterialIcons } from "@expo/vector-icons";

const Home = ({navigation}) => {
  const {  setStudentDetails } = useContext(StudentContext);
  const [rollNumber, setRollNumber] = useState("");

  const handleSearch = async () => {
    try {
      const storedData = await AsyncStorage.getItem("studentIdcards");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.rollNumber === rollNumber) {
          setStudentDetails(parsedData);
          
        } else {
          Alert.alert("Not Found", "No ID card found for the entered roll number.");
        }
      } else {
        Alert.alert("No Data", "No ID card data available.");
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <Text style={styles.title}>Search for an ID Card</Text>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Roll No"
              placeholderTextColor="#ccc"
              value={rollNumber}
              onChangeText={setRollNumber}
            />
            <TouchableOpacity style={styles.iconButton} onPress={()=>{
              handleSearch();
              navigation.navigate('IDCard');
            }}>
              <MaterialIcons name="search" color="#ff0000" size={30} />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={()=>{
          navigation.navigate('InputForm');
        }}>
         <Text style={styles.buttonText}>Add New ID Card</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#1A0037',
  },
  inputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  home: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "70%",
    padding: 12,
    marginVertical: 10,
    marginRight:10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  iconButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 50,
    height: 50,
  },
  addButton: {
    backgroundColor: "#f31282", 
    width:"90%",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 8,
    padding:15
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


export default Home;
