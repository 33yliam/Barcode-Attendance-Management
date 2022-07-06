import React from 'react';
import { AppRegistry } from 'react-native'
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarkAttendance from './Components/Teacher/Attendance/MarkAttendance';
import ViewAttendance from './Components/Teacher/Attendance/ViewAttendance';
import Courses from './Components/Teacher/Course/Courses';
import Course from './Components/Teacher/Course/Course';
import './Database.js'
import AddCourse from './Components/Teacher/Course/AddCourse';
import AddFaculty from './Components/Teacher/AddFaculty';
import ViewOverallAttendance from './Components/Student/OverallAttendance';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
        <Stack.Navigator initialRouteName="Courses">

          <Stack.Screen name="Courses" component={Courses} />
          <Stack.Screen name="Course"
            options={({ route }) => ({ title: route.params.course.name })} component={Course} />
          <Stack.Screen name="Add Course"
            options={() => ({ title: 'Add Course' })} component={AddCourse} />
          <Stack.Screen name="Add Faculty"
            options={() => ({ title: 'Add Faculty' })} component={AddFaculty} />
          <Stack.Screen name="MarkAttendance"
            options={({ route }) => ({ title: route.params.course.name })} component={MarkAttendance} />
          <Stack.Screen name="ViewAttendance"
            options={({ route }) => ({ title: `${route.params.course.name} (${route.params.department})` })} component={ViewAttendance} />
          <Stack.Screen name="Attendance"
            options={() => ({ title: 'Attendance' })} component={ViewOverallAttendance} />

        </Stack.Navigator>
      </ScrollView>
    </NavigationContainer>

  );
}

AppRegistry.registerComponent('main', () => App);
