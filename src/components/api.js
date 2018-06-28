
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert
} from 'react-native';

export default class API {
  static getTinhsFromApiAsync() {
    return fetch('http://easytour.tk/api/tinh')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
        // Alert.alert(JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
