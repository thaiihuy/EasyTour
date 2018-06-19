import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';
export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image style={{width: 200,height: 120}} source={require('../images/logo.png')}/>
			</View>
		);
	}
}
const styles=StyleSheet.create({
	container:{
		flexGrow: 1,
		justifyContent: 'center', 
		alignItems: 'center',
	}
});