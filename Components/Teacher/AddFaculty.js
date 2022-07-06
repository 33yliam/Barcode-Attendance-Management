import React, { useState } from 'react';
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from './Course/Style'
import { getData, storeData } from '../../Database';
import Logo from '../Logo';

export default function AddFaculty({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [fid, setFid] = useState('')

    async function addFaculty() {
        setLoading(true);
        if (username !== '' && password !== '' && fid !== '' && name !== '') {
            const credentials = await getData('credentials');
            const faculty = await getData('faculty');
            faculty[fid.replace(/\s/g, '')] = {
                name: name,
                courses: {}
            }
            credentials[username.replace(/\s/g, '')] = {
                password: password.replace(/\s/g, ''),
                id: fid.replace(/\s/g, '')
            }
            await storeData('credentials', credentials)
            await storeData('faculty', faculty)
            navigation.navigate('Courses')
        } else {
            Alert.alert('Some fields missing', 'Kindly fill all details', { text: 'CLOSE', type: 'cancel' });
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <View >
                <Logo />
                <Text style={styles.input_label}>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="faculty name"
                    keyboardType="ascii-capable"
                />
                <Text style={styles.input_label}>ID</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFid}
                    value={fid}
                    placeholder="faculty ID"
                    keyboardType="ascii-capable"
                />
                <Text style={styles.input_label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="faculty username"
                    keyboardType="ascii-capable"
                />
                <Text style={styles.input_label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="faculty password"
                    keyboardType="ascii-capable"
                />

                {loading ?
                    <ActivityIndicator size="large" color="#53A8F7" />
                    :
                    <TouchableOpacity
                        style={[styles.action_btn, { backgroundColor: '#53A8F7', borderColor: '#53A8F7' }]}
                        onPress={() => addFaculty()}
                    >
                        <Text style={[styles.button_text, { fontWeight: 'bold' }]}>ADD FACULTY</Text>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    );
}