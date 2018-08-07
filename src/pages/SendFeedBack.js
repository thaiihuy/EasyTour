import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/user.png';
import getToken from '../components/api/getToken';
import SendFB from '../components/api/sendFB';
const width = Dimensions.get('window');
export default class SendFeedBack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedback: '',
            id: '',
            height: 0
        };
    }
    Save() {
        var today = new Date();
        var ngaydi = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        SendFB(this.state.feedback, ngaydi, this.state.id).then(res => {
            Alert.alert(
                'Thông báo',
                'Gửi phản hồi thành công!',
                [
                    { text: 'OK', onPress: this.BackToHome.bind(this) }
                ],
                { cancelable: false }
            );
        })
    }
    loadData() {
        getToken().then(res => {
            this.setState({
                id: res.user.id,
            })
        })
    }
    componentWillMount() {
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
                    <Text style={styles.titleStyle}>Góp ý</Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <TextInput
                        multiline={true}
                        onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height })
                        }}
                        style={{
                            width: width - 100,
                            backgroundColor: '#fff',
                            borderRadius: 25,
                            paddingHorizontal: 20,
                            fontSize: 16,
                            marginVertical: 10, height: Math.max(35, this.state.height)
                        }}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Phản hồi của bạn'
                        value={this.state.feedback}
                        onChangeText={(text) => this.setState({ feedback: text })}
                    />
                    {/* <TextInput style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder='Số điện thoại'
                        value={this.state.sdt}
                        onChangeText={(text) => this.setState({ sdt: text })}
                    /> */}
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.signUpStyle} onPress={this.Save.bind(this)}>
                    <Text style={styles.txtSave}>Gửi</Text>
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
        width: width - 100,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginVertical: 10,
    },
});