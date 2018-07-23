import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	FlatList,
	Image
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import searchDate from '../api/searchDate';
class ItemSearch extends Component {
	gotoDetail() {
		this.props.navigation.navigate('ProductDetail', { item: this.props.item });
	}
	convertPrice(price) {
		var priceTemp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
		return priceTemp + ' VNĐ';
	}
	convertTime(time) {
		return 'Ngày đi: ' + time.substring(8, 10) + '-' + time.substring(5, 7) + '-' + time.substring(0, 4);
	}
	render() {
		return (
			<View>
				<TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
					<Image
						style={styles.productImage}
						source={{ uri: 'http://easytour.tk/image/' + this.props.item.hinhanh }}
					/>
					<Text numberOfLines={1} style={styles.produceName}>{this.props.item.tentour}</Text>
					<Text style={styles.produceTotal}>{this.convertTime(this.props.item.ngaydi)}</Text>
					<Text style={styles.produceTotal}>{this.convertPrice(this.props.item.total)}</Text>
					<Text style={styles.producePrice}>{this.props.item.mota}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
export default class Search extends Component {
	constructor(props) {
		super(props);
		var today = new Date();
		var ngay = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();
		this.state = {
			date: ngay,
			dateAfter: ngay,
			data: [],
		};
	}
	search() {
		searchDate(this.state.date, this.state.dateAfter).then(res => {
			this.setState({
				data: res,
			})
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row' }}>
					<DatePicker
						style={{ width: 150 }}
						date={this.state.date}
						mode="date"
						placeholder="select date"
						format="YYYY-MM-DD"
						minDate="2017-01-01"
						maxDate="2050-01-01"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
						}}
						onDateChange={(date) => { this.setState({ date: date }) }}
					/>
					<Text>Đến</Text>
					<DatePicker
						style={{ width: 150 }}
						date={this.state.dateAfter}
						mode="date"
						placeholder="select date"
						format="YYYY-MM-DD"
						minDate="2017-01-01"
						maxDate="2050-01-01"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
						}}
						onDateChange={(date) => { this.setState({ dateAfter: date }) }}
					/>
					<TouchableOpacity style={styles.button} onPress={this.search.bind(this)}>
						<Text style={styles.buttonText} >Tìm</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					contentContainerStyle={styles.body}
					data={this.state.data}
					renderItem={({ item, index }) => {
						//console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
						return (
							<ItemSearch item={item} index={index} {...this.props}>

							</ItemSearch>);
					}}
					keyExtractor={(item, index) => (item.id).toString()}
				// onRefresh={this.pullLoad.bind(this)}
				// refreshing={this.state.isLoading}
				>
				</FlatList>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4ff81',
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
	productImage: {
		marginLeft: 10,
		width: 100,
		height: 100,
	},
	producePrice: {
		marginBottom: 5,
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: '#662F90'
	},
	produceTotal: {
		marginBottom: 5,
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: 'red'
	},
	produceName: {
		marginVertical: 5,
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: 'black',
		fontWeight: '500',
		fontSize: 15,
	},
});