import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	Dimensions,
	ScrollView,
	FlatList,
	Image
} from 'react-native';
const { width } = Dimensions.get('window');
import getCart from '../components/api/getCart';
class ItemCart extends Component {
	gotoDetail() {
		this.props.navigation.navigate('ProductDetail', { item: this.props.item });
	}
	convertPrice(price) {
		var priceTemp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
		return priceTemp + ' VNĐ';
	}
	render() {
		return (
			<View>
				<TouchableOpacity style={styles.productContainer} onPress={this.gotoDetail.bind(this)}>
					<Image
						style={styles.productImage}
						source={{ uri: 'http://easytour.tk/image/' + this.props.item.hinhanh }}
					/>
					<View style={{ flexDirection: 'column',justifyContent:'space-around' }}>
						<Text style={styles.produceName}>{this.props.item.tentour}</Text>
						<Text style={styles.produceName}>{this.convertPrice(this.props.item.total)}</Text>
					</View>
					<TouchableOpacity>
						<Text>{'Xóa'}</Text>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
		);
	}
}
export default class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			price: 0,
		};
	}
	convertPrice(price) {
		var priceTemp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
		return priceTemp + ' VNĐ';
	}
	async componentDidMount() {
		let tt = await getCart();
		this.setState({ data: tt });
		var total = 0;
		for (let i = 0; i < tt.length; i++) {
			total += parseInt(tt[i].total);
		}
		this.setState({ price: total });
		// alert(parseInt(tt[0].total));
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View >
						<FlatList
							contentContainerStyle={styles.body}
							data={this.state.data}
							renderItem={({ item, index }) => {
								//console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
								return (
									<ItemCart item={item} index={index} {...this.props}>

									</ItemCart>);
							}}
							keyExtractor={(item, index) => (item.id).toString()}
						// onRefresh={this.pullLoad.bind(this)}
						// refreshing={this.state.isLoading}
						>
						</FlatList>

					</View>
				</ScrollView>
				<View>
					<Text style={{ alignSelf: 'flex-end' }}>{'Tổng cộng: ' + this.convertPrice(this.state.price)}</Text>
				</View>
				<View>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>{'Đặt tour'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4ff81',
		justifyContent: 'space-between'
	},
	productImage: {
		width: 100,
		height: 100,
	},
	button: {
		backgroundColor: '#bfcc50',
		paddingVertical: 13,
		justifyContent: 'flex-end',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	productContainer: {
		flex:1,
		flexDirection: 'row',
		margin:10,
		justifyContent:'space-between',
	}
});