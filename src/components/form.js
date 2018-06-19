import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Image,
	TextInput,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';

import saveToken from './api/saveToken';
import signIn from './api/signin';
export default class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}
	// checkLogin() {
	// 	fetch('http://easytour.tk/api/auth/login', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			username: this.state.username,
	// 			password: this.state.password,
	// 		}),
	// 	}).then(function (data) {
	// 		return data.json();
	// 	}).then(newData => {

	// 		if (newData.token != undefined) {
	// 			saveToken(JSON.stringify(newData.token));

	// 			this.props.navigation.navigate('Home');
	// 		} else {
	// 			alert('Sai tài khoản hoặc mật khẩu');
	// 		}
	// 	});

	// }
	checkLogin() {
		const { username, password } = this.state;
		signIn(username, password)
			.then(res => {
				if(res.token!=undefined) 
				{
					this.props.navigation.navigate('Home');
					saveToken(res.token);
				}
				else{
					alert('Sai tài khoản hoặc mật khẩu');
				}
			});
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder='Tên đăng nhập'
					value={this.state.username}
					onChangeText={(text) => this.setState({ username: text })}
				/>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					secureTextEntry={true}
					placeholder='Mật khẩu'
					value={this.state.password}
					onChangeText={(text) => this.setState({ password: text })}
				/>
				<TouchableOpacity style={styles.button} onPress={this.checkLogin.bind(this)}>
					<Text style={styles.buttonText}>{this.props.type}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	inputBox: {
		width: 300,
		backgroundColor: 'rgba(255,255 ,255 ,0.3)',
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		marginVertical: 10,
	},
	button: {
		width: 300,
		backgroundColor: '#bfcc50',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
});