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
import BasicFlatList from '../flatList';
import TourSwiper from '../TourSwiper';
export default class HomeTour extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}
	render() {
		return (
			<View style={styles.container}>

                    <BasicFlatList />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4ff81',
	}
});