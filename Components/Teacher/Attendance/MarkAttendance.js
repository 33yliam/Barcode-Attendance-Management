import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, ScrollView, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/Feather';
import styles from './Style'
import { config, getData, storeData } from '../../../Database';

//restrict barcode types
const bCodeTypes = ['org.iso.Code39']

export default function MarkAttendance({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState('')
  const course = route.params.course;
  const duration = route.params.duration;
  const department = (route.params.department).split('-');
  const [loading, setLoading] = useState(false)
  const [marked, setMarked] = useState([])
  const [markedAnim, setMarkedAnim] = useState(false)
  const [submit, setSubmit] = useState(false)

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);


  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  const handleBarCodeScanned = ({ type, data }) => {
    if (data.length === config.rollNoLength) {
      let deptCode = '';
      if (config.deptCodePosition.length > 1) {
        for (let i = config.deptCodePosition[0] - 1; i < config.deptCodePosition[1]; i++) {
          deptCode = deptCode + data[i];
        }
      } else {
        deptCode = data[config.deptCodePosition[0] - 1];
      }
      let yearCode = '';
      if (config.yearCodePosition.length > 1) {
        for (let i = config.yearCodePosition[0] - 1; i < config.yearCodePosition[1]; i++) {
          yearCode = yearCode + data[i];
        }
      } else {
        yearCode = data[config.yearCodePosition[0] - 1];
      }
      let rollNo = '';
      if (config.rollNoPosition.length > 1) {
        for (let i = config.rollNoPosition[0] - 1; i < config.rollNoPosition[1]; i++) {
          rollNo = rollNo + data[i];
        }
      } else {
        rollNo = data[config.rollNoPosition[0] - 1];
      }
      if (config.yearCodes[yearCode] && config.deptCodes[deptCode]) {
        setText(data)
        Speech.isSpeakingAsync().then((speaking) => {
          if (!speaking) {
            if (marked.includes(data))
              Speech.speak(yearCode + '-' + rollNo + ' Duplicate', {
                language: 'en-US',
                rate: 1.2,
              });
            else {
              setMarked(marked => [...marked, data])
              Speech.speak(yearCode + '-' + rollNo + ' Present', {
                language: 'en-IN',
                rate: 1.2,
                pitch: 5
              });
            }
          }
        })

      }
    }


  };
  function removeRollNo(data) {
    setMarked(marked.filter(newMarked => newMarked !== data))
  }

  async function submitMarked() {
    const attendance = await getData('attendance');
    let timestamp = +new Date();
    attendance[department[0]][department[1]][course.code][timestamp] = {
      present: marked,
      duration: duration,
      timestamp: timestamp
    }
    await storeData('attendance', attendance)
    setLoading(false)
    setSubmit(true)
    setMarked([])
  };
  const endScan = async () => {
    if (marked.length > 0) {
      setLoading(true)
      const title = 'Submit attendance?';
      const message = '';
      const buttons = [
        { text: 'CANCEL', type: 'cancel', onPress: () => setLoading(false) },
        { text: 'YES', onPress: () => submitMarked() },
      ];
      Alert.alert(title, message, buttons);
    }
  }

  return (
    <ScrollView>
      {!markedAnim || marked.length <= 0 ?
        <View style={styles.barcode_box}>
          {!loading ?
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              type='back'
              style={{ height: 500, width: Dimensions.get('window').width }} />
            :
            <ActivityIndicator size="large" style={{ height: 500 }} color="#53A8F7" />
          }

        </View>
        :
        null
      }


      <Text style={styles.main_text}><Text style={{ color: '#53A8F7' }}>Last Scan:</Text> {text}</Text>
      <Text style={styles.main_text}><Text style={{ color: '#53A8F7' }}>Scanned:</Text> {marked.length}</Text>

      {!loading ?
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000' }]}
          onPress={() => endScan()}
        >
          <Text style={styles.button_text}>END</Text>
        </TouchableOpacity>
        :
        null
      }

      <TouchableOpacity
        style={[styles.button,
        { maxWidth: Dimensions.get('window').width - 40, flexDirection: 'row', marginBottom: 0.5 }]}
        onPress={() => setMarkedAnim(!markedAnim)}
      >
        <Text style={[styles.button_text, { flex: 1, left: 10 }]}>Marked</Text>
        <Text style={[styles.button_text, { fontSize: 20, right: 20 }]}>{markedAnim ? '-' : '+'}</Text>
      </TouchableOpacity>
      {markedAnim ?
        marked.length > 0 ?
          <View style={[styles.button,
          {
            maxWidth: Dimensions.get('window').width - 70, left: 35, marginTop: 0,
            borderRadius: 0, flexDirection: 'column'
          }]}>

            {marked.sort().map((data, index) => (
              <View key={index} style={[styles.present_list_item, { flexDirection: 'row' }]}>
                <Text style={[styles.button_text, { flex: 1, left: 10 }]}>{data}</Text>
                {!loading ?
                  <TouchableOpacity style={{ right: 20, }}
                    onPress={() => removeRollNo(data)} >
                    <Icon name="x" size={20} color="red" />
                  </TouchableOpacity>
                  :
                  null
                }

              </View>
            ))}

          </View>
          :
          <View style={[styles.button,
          {
            maxWidth: Dimensions.get('window').width - 70, left: 35, marginTop: 0,
            borderRadius: 0, flexDirection: 'column',
          }]}>
            <Text>No marked attendance</Text>
          </View>
        :
        null
      }

      <View style={{ marginBottom: 30 }}></View>

    </ScrollView>

  );
}