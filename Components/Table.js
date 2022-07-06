import React from 'react';
import { DataTable } from 'react-native-paper';

export default function MyTable({ data, overall }) {

    return (
        !overall ?
            <DataTable style={{ marginBottom: 20 }}>
                <DataTable.Header>
                    <DataTable.Title>Roll No</DataTable.Title>
                    <DataTable.Title numeric>Attended (hrs)</DataTable.Title>
                    <DataTable.Title numeric>Total Hrs</DataTable.Title>
                    <DataTable.Title numeric>%</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{data[0]}</DataTable.Cell>
                    <DataTable.Cell numeric>{data[1]}</DataTable.Cell>
                    <DataTable.Cell numeric>{data[2]}</DataTable.Cell>
                    <DataTable.Cell numeric>{data[3]}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
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