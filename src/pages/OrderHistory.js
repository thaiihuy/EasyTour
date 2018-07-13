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
import getToken from '../components/api/getToken';
import GetOrder from '../components/api/getOrder';
export default class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            user: null,
        };
        
    }
    BackToHome() {
        this.props.navigation.navigate('Home');
    }
    componentWillMount() {
        getToken().then(res => {
            this.setState({
                user: res.user.id,
            })
        })
        
    }

    // componentWillMount() {
    //     // GetOrder(JSON.stringify(this.state.userid)).then(res => {
    //     //     this.setState({
    //     //         data: res,
    //     //     });
    //     alert(JSON.stringify(this.state.userid));
    //     // })
    // }
    render() {
        alert(JSON.stringify(this.state.data));
        return (
            <View style={styles.container}>
                <View>

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