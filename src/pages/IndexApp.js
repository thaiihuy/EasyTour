import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	Image
} from 'react-native';
import BasicFlatList from '../components/flatList';
import Header from '../components/Header';
import HomeTour from '../components/Home/HomeTour';
import Profile from '../components/Profile/Profile';
import Search from '../components/Search/Search';
import Cart from '../pages/Cart';
import TabNavigator from 'react-native-tab-navigator';
export default class IndexApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTab:'home',
		};
	}
	openMenu() {
		const { open } = this.props;
		open();
	}
	render() {
		return (
			<View style={styles.container}>
				{/* <TouchableOpacity onPress={this.openMenu.bind(this)}>
					<Text>Open</Text>
				</TouchableOpacity> */}
				<Header onOpen={this.openMenu.bind(this)}/>
				
				<View style={{height:20,flex:1}} >
					
					<TabNavigator>
						<TabNavigator.Item
							selected={this.state.selectedTab === 'home'}
							title="Trang chủ"
							renderIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/home.png')} />}
							renderSelectedIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/home_select.png')} />}
							// badgeText="1"
							onPress={() => this.setState({ selectedTab: 'home' })}>
							<HomeTour {...this.props} />
						</TabNavigator.Item>
						<TabNavigator.Item
							selected={this.state.selectedTab === 'cart'}
							title="Giỏ hàng"
							renderIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/cart.png')} />}
							renderSelectedIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/cart_selected.png')} />}
							// badgeText="1"
							onPress={() => this.setState({ selectedTab: 'cart' })}>
							<Cart {...this.props} />
						</TabNavigator.Item>
						<TabNavigator.Item
							selected={this.state.selectedTab === 'profile'}
							title="Cá nhân"
							renderIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/user.png')} />}
							renderSelectedIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/user_select.png')} />}
							onPress={() => this.setState({ selectedTab: 'profile' })}>
							<Profile {...this.props} />
						</TabNavigator.Item>
						<TabNavigator.Item
							selected={this.state.selectedTab === 'search'}
							title="Tìm kiếm"
							renderIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/search.png')} />}
							renderSelectedIcon={() => <Image style={{ width: 20, height: 20 }} source={require('../images/icon/searched.png')} />}
							onPress={() => this.setState({ selectedTab: 'search' })}>
							<Search {...this.props} />
						</TabNavigator.Item>
					</TabNavigator>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});