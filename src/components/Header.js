import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import icMenu from '../images/icon/ic_menu.png';
import icIcon from '../images/icon/tour.png';
const { height } = Dimensions.get('window');
export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render() {
        return (
            // <View style={{ height: height / 8,flex:1}}>
            //     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            //         <TouchableOpacity>
            //             <Image source={icMenu} />
            //         </TouchableOpacity>
            //         <Text>Trang chủ</Text>
            //         <Image source={icIcon} />>
            //     </View>
            //     <TextInput style={{height: height / 20,backgroundColor:'#FFF'}}/>
            // </View >
            <View style={{ height: height / 10, flex: 1 / 20, backgroundColor: '#bfcc50', padding: 10, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image style={{ width: 25, height: 25 }} source={icMenu} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>{this.props.title}</Text>
                    <Image style={{ width: 30, height: 30 }} source={icIcon} />
                </View>
            </View>
        );
    }
}
{/* <TouchableOpacity onPress={this.props.onOpen}>
                    <Text>|||</Text>
                </TouchableOpacity> */}
