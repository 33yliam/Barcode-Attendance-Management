import React, { useState } from 'react';
import { ActivityIndicator, Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import otherStyles from '../Course/Style'
import { getData } from '../../../Database';
import MyTable from '../../Table';
import Logo from '../../Logo';

export default function ViewAttendance({ route }) {
    const [attData, setAttData] = useState([])
    const [rollNo, setRollNo] = useState('')
    const course = route.params.course;
    const department = (route.params.department).split('-');
    const [loading, setLoading] = useState(false)
    const [viewAtt, setViewAtt] = useState(false)
    const [overall, setOverall] = useState(false)

    async function checkAttendance() {
        setLoading(true)
        setOverall(false)
        const attendance = await getData('attendance');
        let courseAtt = attendance[department[0]][department[1]][course.code];
        let atHrs = 0;
        let totalAtHrs = 0;
        if (rollNo !== '') {
            Object.keys(courseAtt).map((time) => {
                if (time !== 'course') {
                    totalAtHrs += +courseAtt[time].duration;
                    if (courseAtt[time].present.includes(rollNo)) {
                        atHrs += +courseAtt[time].duration;
                    }
                }
            })

            setAttData([rollNo, atHrs, totalAtHrs, totalAtHrs === 0 ? 0 : Math.round((atHrs / totalAtHrs) * 100)])
        }
        else {
            setOverall(true);
            let overallAttendance = {};
            let totalAtHrs = 0;
            Object.keys(courseAtt).map((time) => {
                if (time !== 'course') {
                    totalAtHrs += +courseAtt[time].duration;
                    courseAtt[time].present.map((rollNo) => {
                        if (overallAttendance[rollNo])
                            overallAttendance[rollNo] += +courseAtt[time].duration;
                        else
                            overallAttendance[rollNo] = +courseAtt[time].duration;
                    })
                }
            })
            let tempAttData = {
                attendance: Object.entries(overallAttendance).map((e) => ({ rollNo: e[0], hrs: e[1] })),
                totalHrs: totalAtHrs
            }
            //sort by rollNo (asc) -> for desc, replace > with <
            tempAttData.attendance.sort((a, b) => (a.rollNo > b.rollNo ? 1 : -1))
            //sort by hrs (asc)
            // tempAttData.attendance.sort((a, b) => (a.hrs > b.hrs ? 1 : -1))
            setAttData(tempAttData)
        }
        setViewAtt(true)
        setLoading(false)
    }

    return (
        <ScrollView>
            <Logo />
            {loading ?
                <ActivityIndicator size="large" color="#53A8F7" />
                :
                <>
                    {viewAtt ?
                        <MyTable data={attData} overall={overall} />
                        :
                        null
                    }


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
            <View style={{ marginBottom: 30 }}></View>

        </ScrollView>

    );
}