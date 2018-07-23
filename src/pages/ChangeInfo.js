import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Image,
    TextInput,
    Picker,
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/user.png';
import getToken from '../components/api/getToken';
import EditInfo from '../components/api/editInfo';
export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ten:'',
            email:'',
            sdt:'',
            id:'',
        };
    }
    Save() {
        EditInfo(this.state.id,this.state.ten,this.state.email,this.state.sdt).then(res=>{
            alert(JSON.stringify(res));
        })
    }
    loadData() {
        getToken().then(res => {
           this.setState({ 
               id:res.user.id,
               ten:res.user.ten,
               email:res.user.email,
               sdt:res.user.sdt,
           })
        })
    }
    componentWillMount(){
        this.loadData();
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
                    <Text style={styles.titleStyle}>Thay đổi thông tin</Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Họ tên'
                        value={this.state.ten}
                        onChangeText={(text) => this.setState({ ten: text })}
                    />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Số điện thoại'
                        value={this.state.sdt}
                        onChangeText={(text) => this.setState({ sdt: text })}
                    />
                </View>
                <TouchableOpacity style={styles.signUpStyle} onPress={this.Save.bind(this)}>
                    <Text style={styles.txtSave}>Lưu lại</Text>
                </TouchableOpacity>
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
    txtSave: {
        color: 'black'
    },
    signUpStyle: {
        backgroundColor: '#bfcc50',
        paddingVertical: 15,
        alignItems: 'center',
        marginLeft: 1,
        borderRadius: 20,
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255 ,255 ,0.3)',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginVertical: 10,
    },
});