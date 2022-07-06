import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import '../../../Database'
import styles from './Style'
import Logo from '../../Logo';
import { tempCred, tempFaculty, getData, storeData } from '../../../Database';
import { useIsFocused } from '@react-navigation/native';

const loginButtons = [
  { text: 'CLOSE', type: 'cancel' },
];
export default function Courses({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userID, setUserID] = useState()
  const [userCourses, setUserCourses] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    async function firstTimeDB() {
      const isOlduser = await getData('credentials');
      if (!isOlduser) {
        await storeData('credentials', tempCred);
        await storeData('faculty', tempFaculty);
        setLoading(false)
      } else {
        const isLoggedIn = await getData('loggedIn');
        if (isLoggedIn)
          setUserID(isLoggedIn)
        else
          setLoading(false)
      }
    }
    firstTimeDB();
  }, [])

  useEffect(() => {
    async function getUserDets() {
      const faculty = await getData('faculty');
      if (faculty[userID]) {
        let tempUserCourses = []
        Object.keys(faculty[userID].courses).map((key) => {
          let course = faculty[userID].courses[key];
          course.code = key;
          course.fid = userID;
          tempUserCourses.push(course)
        })
        setUserCourses(tempUserCourses)
        setUsername(faculty[userID].name)
      }
      setLoading(false)
    }
    if (userID) {
      setUsername('')
      setLoggedIn(true)
      getUserDets()
    }
  }, [userID, isFocused]);


  async function login() {
    setLoading(true)
    const credentials = await getData('credentials');
    if (credentials[username]) {
      if (credentials[username].password === password) {
        setUserID(credentials[username].id);
        await storeData('loggedIn', credentials[username].id);
      } else {
        Alert.alert('Wrong password', 'Forgot your password?, contact an admin', loginButtons);
        setLoading(false);
      }
    } else {
      Alert.alert('User not found', 'Add user first', loginButtons);
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    await storeData('loggedIn', null)
    setLoggedIn(false)
    setUsername('');
    setPassword('');
    setLoading(false)
  }

  if (loggedIn)
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
        <Logo />
        {loading ?
          <ActivityIndicator size="large" color="#53A8F7" />
          :
          userCourses.length > 0 ?
            userCourses.sort().map((course, index) => (
              <TouchableOpacity
                key={index}
                style={styles.courses_item}
                onPress={() => navigation.navigate('Course', { course: course, fid: userID })}
              >
                <Text style={[styles.button_text, { fontWeight: 'bold' }]}>{course.name}</Text>
              </TouchableOpacity>
            ))
            :
            <Text style={[styles.button_text,
            { fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 20 }]}>You currently have no course</Text>
        }
        <TouchableOpacity
          style={styles.action_btn}
          onPress={() => navigation.navigate('Add Course', { fid: userID })}
        >
          <Text style={[styles.button_text, { fontWeight: 'bold', color: 'black' }]}>ADD COURSE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action_btn}
          onPress={() => navigation.navigate('Attendance', { fid: userID })}
        >
          <Text style={[styles.button_text, { fontWeight: 'bold', color: 'black' }]}>OVERALL ATTENDANCE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.small_btn, { backgroundColor: 'red' }]}
          onPress={() => logout()}
        >
          <Text style={[styles.button_text, { fontWeight: 'bold' }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  else
    return (
      <View >
        <Logo />
        <Text style={styles.input_label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="username"
          keyboardType="ascii-capable"
        />
        <Text style={styles.input_label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          keyboardType="visible-password"
        />
        {loading ?
          <ActivityIndicator size="large" color="#53A8F7" />
          :
          <>
            <TouchableOpacity
              style={styles.login_button}
              onPress={() => login()}
            >
              <Text style={[styles.button_text, { fontWeight: 'bold' }]}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.action_btn}
              onPress={() => navigation.navigate('Add Faculty')}
            >
              <Text style={[styles.button_text, { fontWeight: 'bold', color: 'black' }]}>ADD FACULTY</Text>
            </TouchableOpacity>

          </>
        }
      </View>
    )
}
