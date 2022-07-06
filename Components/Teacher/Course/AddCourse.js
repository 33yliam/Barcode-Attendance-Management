import React, { useState } from 'react';
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from './Style'
import Logo from '../../Logo';
import Icon from 'react-native-vector-icons/Feather';
import { getData, storeData } from '../../../Database';

export default function AddCourse({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  const [courseDept, setCourseDept] = useState('')
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [departments, setDepartments] = useState([])
  const userID = route.params.fid;

  function addDepartment() {
    if (courseDept !== '' && !departments.includes(courseDept)) {
      if (courseDept.split('-').length === 2) {
        setDepartments(departments => [...departments, courseDept.replace(/\s/g, '')])
        setCourseDept('')
      }
      else {
        const title = `Department must be of form dept-year`;
        const message = 'Example: CSE-4';
        const buttons = [
          { text: 'Close', type: 'cancel', onPress: () => setLoading(false) },
        ];
        Alert.alert(title, message, buttons);
      }
    }
  }
  function removeDepartment(course) {
    setDepartments(departments.filter(newDepts => newDepts !== course))
  }
  async function addCourse() {
    setLoading(true);
    if (courseName !== '' && courseCode !== '' && departments.length > 0) {
      let courseDepartments = [];
      //add course to attendance
      let attendance = await getData('attendance');
      const faculty = await getData('faculty');

      if (!attendance)
        attendance = {}
      departments.map((department) => {
        const dept = department.split('-');
        courseDepartments.push({
          name: dept[0],
          year: dept[1]
        })
        if (!attendance[dept[0]]) {
          attendance[dept[0]] = {
            [dept[1]]: {
              [courseCode]: {
                course: {
                  name: courseName,
                  faculty: {
                    id: userID,
                    name: faculty[userID].name
                  }
                }
              }
            }
          }
        } else {
          if (!attendance[dept[0]][dept[1]]) {
            attendance[dept[0]][dept[1]] = {
              [courseCode]: {
                course: {
                  name: courseName,
                  faculty: {
                    id: userID,
                    name: faculty[userID].name
                  }
                }
              }
            }
          } else {
            attendance[dept[0]][dept[1]][courseCode] = {
              course: {
                name: courseName,
                faculty: {
                  id: userID,
                  name: faculty[userID].name
                }
              }
            }
          }
        }
      })
      faculty[userID]['courses'][courseCode.replace(/\s/g, '')] = {
        name: courseName,
        departments: courseDepartments
      }
      await storeData('faculty', faculty)
      await storeData('attendance', attendance)
      setLoading(false)
      navigation.navigate('Courses')
    } else {
      const title = `Some fields missing`;
      const message = 'Kindly fill course name, course code, and departments';
      const buttons = [
        { text: 'Close', type: 'cancel', onPress: () => setLoading(false) },
      ];
      Alert.alert(title, message, buttons);
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <View >
        <Logo />
        <Text style={styles.input_label}>Course Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCourseName}
          value={courseName}
          placeholder="course name"
          keyboardType="ascii-capable"
        />
        <Text style={styles.input_label}>Course Code</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCourseCode}
          value={courseCode}
          placeholder="course code"
          keyboardType="ascii-capable"
        />
        <Text style={styles.input_label}>Department-Year</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCourseDept}
          value={courseDept}
          placeholder="CSE-4"
          keyboardType="ascii-capable"
        />
        <TouchableOpacity
          style={[styles.small_btn, { left: 15 }]}
          onPress={() => addDepartment()}
        >
          <Text style={styles.button_text}>Add</Text>
        </TouchableOpacity>

        {departments.map((dept, index) =>
          <View key={index} style={{
            flexDirection: 'row',
            borderColor: '#F3F3F3',
            borderBottomColor: 'black',
            borderWidth: 0.5,
            left: 15,
            marginBottom: 10
          }}>
            <Text style={{ flex: 1, fontSize: 20 }}>{dept}</Text>
            {!loading ?
              <TouchableOpacity style={{ right: 30, }}
                onPress={() => removeDepartment(dept)} >
                <Icon name="x" size={25} color="red" />
              </TouchableOpacity>
              :
              null
            }

          </View>
        )}

        {loading ?
          <ActivityIndicator size="large" color="#53A8F7" />
          :
          <TouchableOpacity
            style={[styles.action_btn, {
              backgroundColor: '#53A8F7', borderColor: '#53A8F7',
              marginTop: 20
            }]}
            onPress={() => addCourse()}
          >
            <Text style={[styles.button_text, { fontWeight: 'bold' }]}>ADD COURSE</Text>
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  );
}