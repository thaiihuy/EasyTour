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

export default class IndexApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};


	}
	clearToken(){
		AsyncStorage.clear();
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.clearToken.bind(this)}>
					<Text>
						Xóa Token
					</Text>
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