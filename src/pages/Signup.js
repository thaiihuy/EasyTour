import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Logo from '../components/logo';
import FormSignUp from '../components/formSignUp';

export default class Signup extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Logo/>
				<FormSignUp {...this.props} type='Đăng ký' />
				<Text style={styles.textSignUp}>Bạn đã có tài khoản ?</Text>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
				 	<Text style={styles.buttonText}>Đăng nhập</Text>
				 </TouchableOpacity>
			</View>
		)
	}
}
const styles=StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f4ff81',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textSignUp:{
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		textAlignVertical:  'bottom' ,
	},
	button:{
		width: 100,
		backgroundColor: '#bfcc50',
		borderRadius: 20,
		marginVertical: 10,
		paddingVertical: 7,
	},
	buttonText:{
		fontSize: 12,
		fontWeight: '500',
		textAlign:'center',
	},
});