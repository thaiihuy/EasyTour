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
	Alert,
} from 'react-native';
import register from './api/register';
export default class FormSignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			ten: null,
			password: null,
			rePassword: null,
			sdt: null,
		};
	}
	onSuccess() {
		this.props.navigation.navigate('Login');
		Alert.alert(
			'Thông báo',
			'Đăng ký thành công!',
			[
				{ text: 'OK' }
			],
			{ cancelable: false }
		);
	}
	removeUsername() {
		this.setState({ username: '' });
	}
	onFail() {
		Alert.alert(
			'Thông báo',
			'Username đã có người sử dụng',
			[
				{ text: 'OK', onPress: this.removeUsername.bind(this) }
			],
			{ cancelable: false }
		);
	}

	checkRegister() {
		const { username, ten, sdt, password } = this.state;
		if (username && ten && sdt && password != null) {
			if (password == this.state.rePassword) {
				register(username, ten, sdt, password)
					.then(res => {
						if (res.message === 'User created successfully') return this.onSuccess();
						this.onFail();
					});
			} else {
				Alert.alert(
					'Thông báo',
					'Nhập lại mật khẩu không đúng!',
					[
						{ text: 'OK', onPress: this.removeUsername.bind(this) }
					],
					{ cancelable: false }
				);
			}

		}else{
			Alert.alert(
				'Thông báo',
				'Vui lòng nhập đầy đủ các trường!',
				[
					{ text: 'OK', onPress: this.removeUsername.bind(this) }
				],
				{ cancelable: false }
			);
		}
	}
	// async checkRegister() {
	// 	try {
	// 		let dt = await fetch('http://easytour.tk/api/auth/register', {
	// 			method: 'POST',
	// 			headers: {
	// 				Accept: 'application/json',
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				username: this.state.username,
	// 				sdt: this.state.sdt,
	// 				password: this.state.password,
	// 			}),
	// 		})

	// 		if (dt.ok) {

	// 			let data = await dt.json();
	// 			this.props.navigation.navigate('Login');
	// 			alert('Tạo tài khoản thành công!');
	// 		}
	// 		else {

	// 			alert(JSON.stringify('Username đã tồn tại !'));
	// 		}
	// 		// this.props.navigation.navigate('Login');
	// 	} catch (error) {
	// 		alert('Lỗi Server');
	// 	}

	// }
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder='Họ tên'
					value={this.state.ten}
					onChangeText={(text) => this.setState({ ten: text })}
				/>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder='Tên đăng nhập'
					value={this.state.username}
					onChangeText={(text) => this.setState({ username: text })}
				/>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder='Số điện thoại'
					value={this.state.sdt}
					onChangeText={(text) => this.setState({ sdt: text })}
				/>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					secureTextEntry={true}
					placeholder='Mật khẩu'
					value={this.state.password}
					onChangeText={(text) => this.setState({ password: text })}
				/>
				<TextInput style={styles.inputBox}
					underlineColorAndroid='rgba(0,0,0,0)'
					secureTextEntry={true}
					placeholder='Nhập lại mật khẩu'
					value={this.state.rePassword}
					onChangeText={(text) => this.setState({ rePassword: text })}
				/>
				<TouchableOpacity style={styles.button} onPress={this.checkRegister.bind(this)}>
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