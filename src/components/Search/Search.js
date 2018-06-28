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

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={()=>this.haha()}>
                    <Text>This is Search Component</Text>
                </TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});