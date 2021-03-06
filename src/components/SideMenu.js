import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import profileIcon from '../images/icon/profile.png';
import getToken from './api/getToken';
export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:'',
    };
    // alert(JSON.stringify(this.props.navigation));
  }
  gotoChangeInfo() {
    this.props.navigation.navigate('ChangeInfo');
  }
  gotoOrderHistory() {
    this.props.navigation.navigate('OrderHistory');
  }
  gotoSendFeedBack(){
    this.props.navigation.navigate('SendFeedBack');
  }
  onSignOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }
  // Logout(){
  //   // AsyncStorage.clear();
  //   this.props.navigation.navigate('Login');
  // }
  componentWillMount() {
    getToken().then(res => {
        this.setState({
            user: res.user.ten,
        })
    })
}
  render() {
    return (
      <View style={styles.container}>
        <Image source={profileIcon} style={styles.profile} />
        <View style={styles.loginContainer}>
          <Text style={styles.username}>Xin chào {this.state.user}</Text>
          <View>
            {/* <TouchableOpacity style={styles.btnSignInStyle} onPress={this.gotoOrderHistory.bind(this)}>
              <Text style={styles.btnTextSignIn}>Lịch sử đặt Tour</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.btnSignInStyle} onPress={this.gotoChangeInfo.bind(this)}>
              <Text style={styles.btnTextSignIn}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignInStyle} onPress={this.gotoSendFeedBack.bind(this)}>
              <Text style={styles.btnTextSignIn}>Gửi góp ý</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignInStyle} onPress={this.onSignOut.bind(this)}>
              <Text style={styles.btnTextSignIn}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
          <View />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ff81',
    // borderRightWidth: 3,
    // borderColor: '#fff',
    alignItems: 'center'
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 30
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  username: {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 25,
    textAlign:'center',
  },
  btnSignInStyle: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
    justifyContent: 'center',
    paddingLeft: 10
  },
  btnTextSignIn: {
    color: '#34B089',
    fontSize: 15
  },
})
