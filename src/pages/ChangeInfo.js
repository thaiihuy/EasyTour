import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/user.png';
import getToken from '../components/api/getToken';
import EditInfo from '../components/api/editInfo';
import ChangePassword from '../components/api/changePassword';
export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password:'',
            repassword:'',
        };
    }
    removePassword() {
		this.setState({ repassword: '',password:'' });
	}
    Save() {
        if(this.state.password==this.state.repassword){
        ChangePassword(this.state.id,this.state.password).then(res=>{
            Alert.alert(
				'Thông báo',
				'Thay đổi mật khẩu thành công!',
				[
					{ text: 'OK', onPress: this.BackToHome.bind(this) }
				],
				{ cancelable: false }
			);
        })
    }else{
        Alert.alert(
            'Thông báo',
            'Nhập lại mật khẩu không đúng!',
            [
                { text: 'OK',  onPress: this.removePassword.bind(this) }
            ],
            { cancelable: false }
        );
    }
}
    loadData() {
        getToken().then(res => {
           this.setState({ 
               id:res.user.id,
           })
        })
    }
    componentWillMount(){
        this.loadData();
    }
    BackToHome() {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row1}>
                    <TouchableOpacity onPress={this.BackToHome.bind(this)}>
                        <Image source={icBack} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>Đổi mật khẩu</Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        secureTextEntry={true}
                        placeholder='Mật khẩu mới'
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        secureTextEntry={true}
                        placeholder='Nhập lại mật khẩu mới'
                        value={this.state.repassword}
                        onChangeText={(text) => this.setState({ repassword: text })}
                    />
                    {/* <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Số điện thoại'
                        value={this.state.sdt}
                        onChangeText={(text) => this.setState({ sdt: text })}
                    /> */}
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