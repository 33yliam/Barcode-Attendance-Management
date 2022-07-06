'use strict';
import { StyleSheet, Dimensions } from 'react-native';


module.exports = StyleSheet.create({

  courses_item: {
    maxWidth: Dimensions.get('window').width - 40,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 20,
    left: 20,
  },
  action_btn: {
    maxWidth: Dimensions.get('window').width - 40,
    marginBottom: 15,
    alignItems: "center",
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    padding: 20,
    left: 20,
  },
  small_btn: {
    maxWidth: 100,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 10,
    left: (Dimensions.get('window').width / 2) - 50,
  },
  button_text: {
    color: '#fff',
    fontSize: 18,
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    alignSelf: 'center',
  },
  container: {
    top: 50
  },
  login_button: {
    maxWidth: 100,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#53A8F7",
    borderRadius: 20,
    padding: 10,
    left: (Dimensions.get('window').width / 2) - 50,
  },
  input_label: {
    marginLeft: 12,
    marginTop: 12,
    fontSize: 14
  },
  input: {
    height: 50,
    margin: 12,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#53A8F7',
    borderRadius: 5,
    padding: 10,
  },
  select: {
    margin: 12,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: '#53A8F7',
    padding: 20,
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    alignSelf: 'center'
  },

});

