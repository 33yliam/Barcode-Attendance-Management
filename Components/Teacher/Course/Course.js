import React, { useState } from 'react';
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './Style'
import Logo from '../../Logo';
import { getData, storeData } from '../../../Database';

export default function Course({ navigation, route }) {
  const course = route.params.course;
  const [loading, setLoading] = useState(false)
  const [department, setDepartment] = useState(`${course.departments[0].name}-${course.departments[0].year}`)
  const [duration, setDuration] = useState('')

  const durationError = 'Duration must be > 0';
  const durationMessage = '';
  const durationButtons = [
    { text: 'CLOSE', type: 'cancel' },
  ];

  async function deleteCourse() {
    setLoading(true);
    const faculty = await getData('faculty');
    const attendance = await getData('attendance');
    delete faculty[course.fid].courses[course.code]
    course.departments.map((dept) => {
      delete attendance[dept.name][dept.year][course.code]
    })
    await storeData('faculty', faculty)
    await storeData('attendance', attendance)
    navigation.navigate('Courses')
  }

  return (
    <ScrollView>
      <View style={[styles.container, { marginBottom: 100 }]}>
        <Logo />
        {loading ?
          <ActivityIndicator size="large" color="#53A8F7" />
          :
          <>
            <Text style={styles.input_label}>Department</Text>
            <View style={styles.select}>
              <RNPickerSelect
                value={department}
                placeholder={{}}
                onValueChange={(dept) => setDepartment(dept)}
                items={course.departments.map((dept, index) => (
                  { label: `${dept.name} (Year ${dept.year})`, value: `${dept.name}-${dept.year}` }
                ))}
              /></View>

            <Text style={styles.input_label}>Duration</Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setDuration(input.replace(/[^0-9]/g, ''))}
              value={duration}
              placeholder="Duration"
              keyboardType="number-pad"
              maxLength={1}
            />
            <TouchableOpacity
              key={0}
              style={styles.courses_item}
              onPress={() => {
                duration > 0 ?
                  navigation.navigate('MarkAttendance', { course: course, duration: duration, department: department })
                  :
                  Alert.alert(durationError, durationMessage, durationButtons);
              }}
            >
              <Text style={[styles.button_text, { fontWeight: 'bold' }]}>Mark Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={1}
              style={styles.courses_item}
              onPress={() => navigation.navigate('ViewAttendance', { course: course, department: department })}
            >
              <Text style={[styles.button_text, { fontWeight: 'bold' }]}>View Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.small_btn, { backgroundColor: 'red' }]}
              onPress={() => deleteCourse()}
            >
              <Text style={[styles.button_text, { fontWeight: 'bold' }]}>Delete</Text>
            </TouchableOpacity>
          </>
        }
      </View>
    </ScrollView>
  );
}