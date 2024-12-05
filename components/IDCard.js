import React,{ useContext }  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudentContext } from "../app/index";
const IDCard = ({navigation}) => {
  const { studentDetails} = useContext(StudentContext);

  if (!studentDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No student details found.</Text>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#4C00FF', '#1A0037']}
        style={styles.card}>
        <Text style={styles.institutionName}>{studentDetails.institutionName}</Text>
        <Image style={styles.profileImage} source={{ uri: studentDetails.profilePhoto }} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{studentDetails.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Roll No:</Text>
          <Text style={styles.value}>{studentDetails.rollNumber}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>{studentDetails.department}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>DOB:</Text>
          <Text style={styles.value}>{studentDetails.dob}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{studentDetails.contactNumber}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{studentDetails.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Batch:</Text>
          <Text style={styles.value}>{studentDetails.batch}</Text>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('InputForm')}>
        <Text style={styles.buttonText}>Back to Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 8,

  },
  institutionName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
    
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ddd',
    width: '35%',
  },
  value: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'right',
    width: '65%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#ff5252",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default IDCard;
