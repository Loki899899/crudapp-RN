/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import Toast from "react-native-simple-toast"

import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';




const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [personName, setPersonName] = useState("")
  const [age, setAge] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [email, setEmail] = useState("")
  const [designation, setDesignation] = useState("")
  const [description, setDescription] = useState('')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addEntryModal = () => {
    setAddModalVisible(true)
  }
  const addModalBack = () => {
    setAddModalVisible(false)
  }
  const validateAddContact = () => {
    if(personName===''){
      Toast.showWithGravity("Enter a name", Toast.LONG, Toast.BOTTOM)
    } else if(mobileNo===''){
      Toast.showWithGravity("Enter mobile number", Toast.LONG, Toast.BOTTOM)
    } else {
      addEntry()
    }
  }
  const addEntry = () => {
    const url = 'http://7e38-1-38-240-72.ngrok.io/createContact/'
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    let payload = {
      personName: personName,
      number: mobileNo,
      age: age==''?null:age,
      email: email,
      designation: designation,
      description: description,
    }
    let data = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)

    }
    fetch(url, data)
      .then(resp => resp.json())
      .then(resp => {
        if(error==1){
          Toast.showWithGravity()
        }
        console.log(resp)
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  const clear = () => {
    setPersonName("")
    setAge("")
    setEmail("")
    setMobileNo("")
    setDesignation("")
    setDescription("")
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.addButton}>
        <TouchableOpacity onPress={addEntryModal}>
          <Text style={{ textAlign: 'center' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={addModalVisible}
        transparent={true}
        animationType={'slide'}
        onRequestClose={addModalBack}
      >
        <View style={styles.addEntryModalContainer}>
          <View style={styles.addEntryModal}>
            <View style={{ position: 'absolute', top: 5, right: 20 }}>
              <TouchableOpacity onPress={addModalBack}>
                <Text style={{ fontSize: 18 }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.topCard}>
              <View style={styles.avatarContainer}>
              </View>
              <View style={{ flex: 1, padding: '3%' }}>
                <Text style={{ textAlign: 'center', marginBottom: '4%', fontSize: 16 }}>Contact Info</Text>
                <TextInput
                  value={personName}
                  style={styles.input}
                  placeholder='Name'
                  onChangeText={setPersonName}></TextInput>
                <TextInput
                  value={mobileNo}
                  style={styles.input}
                  placeholder='Mobile No.'
                  onChangeText={setMobileNo}></TextInput>
              </View>
            </View>
            <TextInput
              value={age}
              style={styles.input}
              placeholder='Age'
              onChangeText={setAge}></TextInput>
            <TextInput
              value={email}
              style={styles.input}
              placeholder='Email'
              onChangeText={setEmail}></TextInput>
            <TextInput
              value={designation}
              style={styles.input}
              placeholder='Designation'
              onChangeText={setDesignation}></TextInput>
            <TextInput
              value={description}
              style={styles.input}
              multiline={true}
              placeholder='Description (max 200 characters)'
              maxLength={200}
              textAlignVertical='top'
              numberOfLines={4}
              onChangeText={setDescription}></TextInput>
            <View style={styles.addEntryModalButtonContainer}>
              <TouchableOpacity onPress={clear} style={[styles.clearButton, styles.modalButtonCommon]}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={validateAddContact} style={[styles.addEntryButton, styles.modalButtonCommon]}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    borderRadius: 29,
    height: '8%',
    width: '16%',
    bottom: '7%',
    right: '6%',
    position: 'absolute'
  },
  addEntryModal: {
    backgroundColor: 'white',
    height: '70%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    paddingTop: '7%',
  },
  addEntryModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topCard: {
    flexDirection: 'row',
    marginVertical: '3%'
    // backgroundColor: 'red',
  },
  avatarContainer: {
    width: 100,
    height: 130,
    borderColor: 'black',
    borderWidth: 1,
  },
  input: {
    marginVertical: '1%',
    backgroundColor: 'grey',
    borderBottomWidth: 2,
    padding: '3%',
  },
  clearButton: {
    backgroundColor: 'yellow',
  },
  addEntryButton: {
    backgroundColor: 'green',
  },
  modalButtonCommon: {
    width: '35%',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
  },
  addEntryModalButtonContainer: {
    height: '9%',
    // backgroundColor: 'red',
    marginTop: '3%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
});

export default App;
