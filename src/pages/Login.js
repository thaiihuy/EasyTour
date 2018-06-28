import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Alert,
	AsyncStorage,
} from 'react-native';

import Logo from '../components/logo';
import Form from '../components/form';
import getToken from '../components/api/getToken';
import checkToken from '../components/api/checkToken';
import { Global } from '../components/Global';
export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		};

		//   checkToken().then(data=>{alert(JSON.stringify(data))}).catch(err=>{alert(JSON.stringify(err))});
		//   let tt = API.getTinhsFromApiAsync().then(data =>Alert.alert(JSON.stringify(data)));

		// fetch('http://easytour.tk/api/tinh')
		//    .then((response) => response.json())
		//    .then((responseJson) => {
		//      Alert.alert(JSON.stringify(responseJson))

		//    })
		//    .catch((error) => {
		//      console.error(error);
		//    });
	}
	// componentWillMount(){
	// 	if(checkToken()==true)
	// 	{
	// 	  this.props.navigation.navigate('Home');
	// 	}
	// }
	async	componentWillMount() {
		// alert(JSON.stringify(getToken()));
		await getToken().then(data => {
			if (data != '') { 
				Global.userData=JSON.parse(data);
				this.props.navigation.navigate('Home'); 
			}
		});
		// if(temp!=''){
		// 	const token=JSON.parse(temp);
		// 	alert(JSON.stringify(token));
		// }
		// if(getToken()){
		// 	  const token=JSON.parse(getToken());
		// 	  alert(JSON.stringify(token));
		// }
		//   if(getToken()!=''){this.props.navigation.navigate('Home');}
	}
	render() {
		return (
			<View style={styles.container}>
				<Logo />
				<Form {...this.props} type='Đăng nhập' />

				<Text style={styles.textSignUp}>Bạn chưa có tài khoản ?</Text>
				<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
					<Text style={styles.buttonText}>Đăng ký</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4ff81',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textSignUp: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		textAlignVertical: 'bottom',
	},
	button: {
		width: 100,
		backgroundColor: '#bfcc50',
		borderRadius: 20,
		marginVertical: 10,
		paddingVertical: 7,
	},
	buttonText: {
		fontSize: 12,
		fontWeight: '500',
		textAlign: 'center',
	},
});