import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import otherStyles from '../Teacher/Course/Style'
import { getData } from '../../Database';
import Logo from '../Logo';
import RNPickerSelect from 'react-native-picker-select';
import OverallTable from './Table';

export default function ViewOverallAttendance() {
    const [attData, setAttData] = useState([])
    const [rollNo, setRollNo] = useState('')
    const [year, setYear] = useState('');
    const [departments, setDepartments] = useState();
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(true)
    const [viewAtt, setViewAtt] = useState(false)
    const [overall, setOverall] = useState(false)

    useEffect(() => {
        getAttendance();
    }, []);

    useEffect(() => {
        if (departments)
            setLoading(false)

    }, [departments])

    useEffect(() => {
        if (department !== '')
            setYear(Object.keys(departments[department])[0])
    }, [department])

    async function getAttendance() {
        const attendance = await getData('attendance');
        setDepartments(attendance)
        setDepartment(Object.keys(attendance)[0])
        Object.keys(attendance).map((dept) => {
            Object.values(attendance[dept]).map((yr) => {

            })
        })
    }

    async function checkAttendance() {
        if (rollNo !== '') {
            setLoading(true)
            setOverall(false)

            let atHrs = 0;
            let courseHrs = {}
            Object.keys(departments[department][year]).map((course) => (
                courseHrs[course] = {
                    total: 0,
                    present: 0,
                    name: departments[department][year][course].course.name,
                    teacher: departments[department][year][course].course.faculty.name,
                }
            ));
            let totalAtHrs = 0;
            Object.keys(departments[department][year]).map((course) => {
                let courseAtt = departments[department][year][course];
                Object.keys(courseAtt).map((time) => {
                    if (time !== 'course') {
                        courseHrs[course].total += +courseAtt[time].duration;
                        totalAtHrs += +courseAtt[time].duration;
                        if (courseAtt[time].present.includes(rollNo)) {
                            atHrs += +courseAtt[time].duration;
                            courseHrs[course].present += +courseAtt[time].duration;
                        }
                    }
                })
            })
            setAttData([courseHrs, atHrs, totalAtHrs]);
            setViewAtt(true)
            setLoading(false)
        }

    }

    return (
        <ScrollView>
            <Logo />
            {loading ?
                <ActivityIndicator size="large" color="#53A8F7" />
                :
                <>
                    {viewAtt ?
                        <>
                            <Text style={[otherStyles.button_text, { fontWeight: 'bold', color: 'black', marginLeft: 10 }]}>{rollNo}</Text>
                            <Text style={[otherStyles.button_text, { color: 'black', marginLeft: 10 }]}>Attended: {attData[1]} hrs</Text>
                            <Text style={[otherStyles.button_text, { color: 'black', marginLeft: 10 }]}>Total: {attData[2]} hrs</Text>
                            <Text style={[otherStyles.button_text, { color: 'black', marginLeft: 10 }]}>Percentage: {Math.round((attData[1] / attData[2]) * 100)}%</Text>
                            <OverallTable data={attData} />

                            <TouchableOpacity
                                style={otherStyles.login_button}
                                onPress={() => setViewAtt(false)}
                            >
                                <Text style={[otherStyles.button_text, { fontWeight: 'bold' }]}>Back</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <Text style={otherStyles.input_label}>Department</Text>
                            <View style={otherStyles.select}>
                                <RNPickerSelect
                                    value={department}
                                    placeholder={{}}
                                    onValueChange={(dept) => setDepartment(dept)}
                                    items={Object.keys(departments).map((dept) => (
                                        { label: dept, value: dept }
                                    ))}
                                /></View>


                            <Text style={otherStyles.input_label}>Year</Text>
                            <View style={otherStyles.select}>
                                <RNPickerSelect
                                    placeholder={{}}
                                    value={year}
                                    onValueChange={(yr) => setYear(yr)}
                                    items={Object.keys(departments[department]).map((yr) => (
                                        { label: yr, value: yr }
                                    ))}
                                />
                            </View>

                            <Text style={otherStyles.input_label}>Roll No.</Text>
                            <TextInput
                                style={otherStyles.input}
                                onChangeText={setRollNo}
                                value={rollNo}
                                placeholder="Roll Number"
                            />

                            <TouchableOpacity
                                style={otherStyles.login_button}
                                onPress={() => checkAttendance()}
                            >
                                <Text style={[otherStyles.button_text, { fontWeight: 'bold' }]}>Check</Text>
                            </TouchableOpacity>
                        </>

                    }
                </>
            }
            <View style={{ marginBottom: 30 }}></View>

        </ScrollView>

    );
}