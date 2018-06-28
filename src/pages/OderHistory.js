import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Alert,
    Image,
    AsyncStorage,
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/oder_history.png';
export default class OderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    BackToHome() {
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row1}>
                    <TouchableOpacity onPress={this.BackToHome.bind(this)}>
                        <Image source={icBack} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>Lịch sử đặt Tour</Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4ff81',
        padding: 20,
        justifyContent: 'space-between'
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    titleStyle: { color: 'black', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30 },
});