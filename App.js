import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Login from './src/pages/Login.js';
import Routes from './src/components/Routes';

export default class App extends Component {
  componentWillMount() {
  StatusBar.setHidden(true);
}
  render() {
    return (
      <Routes/>
    );
  }
}
