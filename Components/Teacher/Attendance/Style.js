'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    color: 'red',
    backgroundColor: 'black',
  },
  main_text: {
    fontSize: 18,
    left: 20,
    top: 10,
    fontStyle: 'italic'
  },
  barcode_box: {
    overflow: 'hidden',
  },
  button: {
    maxWidth: 100,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#53A8F7",
    borderRadius: 20,
    padding: 10,
    left: 20,
  },
  button_text: {
    color: '#fff',
    fontSize: 18,
  },
  present_list_item: {
    backgroundColor: "#3A91E2",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10
  },
});
