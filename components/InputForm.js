import React, { useState,useContext } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Image, TouchableOpacity ,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FormValidationData } from './FormValidationData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentContext } from '../app/index';


const InputForm = ({navigation}) => {
  const { setStudentDetails } = useContext(StudentContext);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    profilePhoto: null,
    dob: '',
    contactNumber: '',
    email: '',
    address: '',
    institutionName: '',
    batch: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async() => {
    const errors = FormValidationData(formData);
    setValidationErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try{
      await AsyncStorage.setItem('studentIdcards',JSON.stringify(formData));
      setStudentDetails(formData);
      Alert.alert('Success','Data saved successfully!!');
    }catch(error){
        Alert.alert('Error','Error saving data: '+ error.message);
      }
    } 
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required');
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.canceled) {
      setFormData((prev) => ({ ...prev, profilePhoto: image.assets[0].uri }));
    } else {
      alert('Image selection cancelled.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Text style={styles.heading}>Student ID Card Generator</Text>
      <View>
        <View>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          {validationErrors.name && (
            <Text style={styles.errorText}>{validationErrors.name}</Text>
          )}
        </View>
        <View>
          <TextInput
            placeholder="Enter Roll Number"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={(text) => handleInputChange('rollNumber', text)}
          />
          {validationErrors.rollNumber && (
            <Text style={styles.errorText}>{validationErrors.rollNumber}</Text>
          )}
        </View>
        <View>
          <TextInput
            placeholder="Enter Degree and Department (B.E-CSE)"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={(text) => handleInputChange('department', text)}
          />
          {validationErrors.department && (
            <Text style={styles.errorText}>{validationErrors.department}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Date of Birth (YYYY-MM-DD)"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={(text) => handleInputChange('dob', text)}
          />
          {validationErrors.dob && (
            <Text style={styles.errorText}>{validationErrors.dob}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Contact Number"
            placeholderTextColor="#ccc"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={(text) => handleInputChange('contactNumber', text)}
          />
          {validationErrors.contactNumber && (
            <Text style={styles.errorText}>{validationErrors.contactNumber}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Address"
            placeholderTextColor="#ccc"
            style={[styles.input, styles.textarea]}
            multiline
            onChangeText={(text) => handleInputChange('address', text)}
          />
          {validationErrors.address && (
            <Text style={styles.errorText}>{validationErrors.address}</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Institution Name"
            placeholderTextColor="#ccc"
            style={styles.input}
            onChangeText={(text) => handleInputChange('institutionName', text)}
          />
          {validationErrors.institutionName && (
            <Text style={styles.errorText}>{validationErrors.institutionName}</Text>
          )}
        </View>
        <View>
          <TextInput
           placeholder="Enter Batch (YYYY - YYYY)"
            placeholderTextColor="#ccc"
           style={styles.input}
           onChangeText={(text) => handleInputChange('batch', text)}
          />
          {validationErrors.batch && (
          <Text style={styles.errorText}>{validationErrors.batch}</Text>
          )}
        </View>

      </View>
      
      <TouchableOpacity
        style={styles.photoButton}
        onPress={pickImage}
      >
        <Text style={styles.photoButtonText}>Select Profile Photo</Text>
      </TouchableOpacity>
      {validationErrors.profilePhoto && (
        <Text style={styles.errorText}>{validationErrors.profilePhoto}</Text>
      )}

      {formData.profilePhoto && (
        <Image source={{ uri: formData.profilePhoto }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={()=>{
        handleSubmit();
        navigation.navigate('IDCard');
      }}>
        <Text style={styles.submitButtonText}>Generate ID Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A0037',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%', 
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F31282',
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#2A0057',
    fontSize: 16,
    textAlign: 'left', 
    alignSelf: 'flex-start', 
  },
  textarea: {
    width: '100%', 
    height: 100, 
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F31282',
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#2A0057',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'top', 
    alignSelf: 'flex-start', 
  },
  photoButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    width: '90%',
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    width: '90%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputForm;
