import React, { Component } from 'react';
import {
	Easing,
	Animated,
} from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';

import Login from '../pages/Login.js';
import Signup from '../pages/Signup.js';
import Home from '../pages/Home';
import SideMenu from './SideMenu';
import ChangeInfo from '../pages/ChangeInfo';
import OderHistory from '../pages/OderHistory';
import ProductDetail from '../pages/ProductDetail';
import IndexApp from '../pages/IndexApp.js';
import Cart from '../pages/Cart.js';
const transitionConfig = () => {
	return {
		transitionSpec: {
			duration: 750,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: sceneProps => {      
			const { layout, position, scene } = sceneProps

			const thisSceneIndex = scene.index
			const width = layout.initWidth

			const translateX = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex],
				outputRange: [width, 0],
			})
			return { transform: [ { translateX } ] }
		},
	}
}
	const RootStack=createStackNavigator(
			{
				Login: Login,
				Signup: Signup,
				// Home: IndexApp,
				Home:Home,
				SideMenu:SideMenu,
				ChangeInfo:ChangeInfo,
				OderHistory:OderHistory,
				ProductDetail:ProductDetail,
				Cart:Cart,
			},
			{
				initialRouteName:'Login',
				headerMode: 'none',
				transitionConfig: transitionConfig,
			}

		);
export default class Routes extends Component {
	render(){
		return(
			<RootStack/>
		);
	}
}
