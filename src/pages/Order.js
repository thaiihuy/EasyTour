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
    Image,
    Modal,
    TouchableHighlight
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/tour.png';
import getToken from '../components/api/getToken';
import sendOrder from '../components/api/sendOrder';
const { width, height } = Dimensions.get('window');
export default class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            isLoading: false,
            soluong: 1,
            user: null,
            price: parseInt(this.props.navigation.state.params.tour.total),
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    convertPrice(price) {
        var priceTemp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return priceTemp + ' VNĐ';
    }
    decr() {
        if (this.state.soluong > 1) {
            let temp = this.state.soluong - 1;
            let pr = this.state.price - parseInt(this.props.navigation.state.params.tour.total);
            this.setState({
                soluong: temp,
                price: pr,
            })
        }
    }
    incr() {
        let temp = this.state.soluong + 1;
        let pr = this.state.price + parseInt(this.props.navigation.state.params.tour.total);
        this.setState({
            soluong: temp,
            price: pr,
        })
    }
    componentWillMount() {
        getToken().then(res => {
            this.setState({
                user: res.user.id,
            })
        })
    }
    async takeOrder() {
        let id_khachhang = this.state.user;
        let id_tour = this.props.navigation.state.params.tour.id;
        let soluong = this.state.soluong;
        var today = new Date();
        var ngaydat = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let tonggia = parseFloat(this.state.price);
        await sendOrder(id_khachhang, id_tour, soluong, ngaydat, tonggia);

        this.setModalVisible(true);
    }
    convertTime(time) {
        return 'Ngày đi: ' + time.substring(8, 10) + '-' + time.substring(5, 7) + '-' + time.substring(0, 4);
    }
    BackToHome() {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (

            <View style={styles.container}>
                <Modal
                    style={{ flex: 1 }}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                // onRequestClose={() => {
                //     alert('Modal has been closed.');
                // }}
                >
                    <View style={{ marginTop: 22,flex:1 }}>
                        <View style={{
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ textAlign: 'center' }}>Cảm ơn bạn đã đặt Tour của chúng tôi!</Text>
                            <Text style={{ textAlign: 'center' }}>Chúng tôi sẽ liên hệ với bạn sớm nhất có thể để hoàn thành thủ tục thanh toán !</Text>
                            <TouchableOpacity
                                style={{
                                    width: 100,
                                    backgroundColor: '#bfcc50',
                                    borderRadius: 20,
                                    marginVertical: 10,
                                    paddingVertical: 7,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    this.props.navigation.navigate('Home');
                                }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    justifyContent: 'flex-end',
                                }}>Về trang chủ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ height: height / 8, flex: 1 / 15, backgroundColor: '#bfcc50', padding: 10, justifyContent: 'space-around', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={this.BackToHome.bind(this)}>
                            <Image style={{ width: 25, height: 25 }} source={icBack} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>Đặt tour</Text>
                        <Image style={{ width: 25, height: 25 }} source={icLogo} />
                    </View>
                </View>
                <Text style={styles.produceName} style={{ textAlign: 'center' }}>{this.props.navigation.state.params.tour.tentour}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 50 }}>

                    <Image
                        style={styles.productImage}
                        source={{ uri: 'http://easytour.tk/image/' + this.props.navigation.state.params.tour.hinhanh }}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>

                        <Text style={styles.produceName} style={{ color: 'red' }}>{this.convertPrice(this.props.navigation.state.params.tour.total)}</Text>
                        <Text>{this.convertTime(this.props.navigation.state.params.tour.ngaydi)}</Text>
                        <View style={styles.numberOfProduct}>
                            <TouchableOpacity onPress={this.decr.bind(this)}>
                                <Text>-</Text>
                            </TouchableOpacity>
                            <Text>{this.state.soluong}</Text>
                            <TouchableOpacity onPress={this.incr.bind(this)}>
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ alignSelf: 'flex-end', color: 'purple' }}>{'Tổng cộng: ' + this.convertPrice(this.state.price)}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.takeOrder.bind(this)}>
                        <Text style={styles.buttonText}>{'Đặt tour'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4ff81',
        justifyContent: 'space-between'
    },
    productImage: {
        justifyContent: 'center',
        width: width / 3,
        height: width / 3,
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
    numberOfProduct: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    }
});