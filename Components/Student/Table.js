import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function OverallTable({ data, overall }) {
    function alertCourseTeacher(course) {
        Alert.alert(`Course: ${course.name}\nBy: ${course.teacher}`)
    }

    return (
        !overall ?
            <DataTable style={{ marginBottom: 20 }}>
                <DataTable.Header>
                    <DataTable.Title>Course</DataTable.Title>
                    <DataTable.Title numeric>Attended (hrs)</DataTable.Title>
                    <DataTable.Title numeric>Total Hrs</DataTable.Title>
                    <DataTable.Title numeric>%</DataTable.Title>
                </DataTable.Header>
                {Object.values(data[0]).map((course, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell onPress={() => alertCourseTeacher(course)}>{course.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{course.present}</DataTable.Cell>
                        <DataTable.Cell numeric>{course.total}</DataTable.Cell>
                        <DataTable.Cell numeric>{Math.round((course.present / course.total) * 100)}</DataTable.Cell>
                    </DataTable.Row>
                ))
                }
            </DataTable >
            :
            <DataTable style={{ marginBottom: 20 }}>
                <DataTable.Header>
                    <DataTable.Title>Roll No</DataTable.Title>
                    <DataTable.Title numeric>Attended / {data.totalHrs}hrs</DataTable.Title>
                    <DataTable.Title numeric>%/100%</DataTable.Title>
                </DataTable.Header>
                {data.attendance.map((student, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{student.rollNo}</DataTable.Cell>
                        <DataTable.Cell numeric>{student.hrs}</DataTable.Cell>
                        <DataTable.Cell numeric>{Math.round((student.hrs / data.totalHrs) * 100)}</DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
    );
}