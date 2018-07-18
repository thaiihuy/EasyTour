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
import getToken from '../components/api/getToken';
import sendOrder from '../components/api/sendOrder';
const { width } = Dimensions.get('window');
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
    render() {
        return (
            
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Cảm ơn bạn đã đặt Tour của chúng tôi!</Text>
                            <Text>Chúng tôi sẽ liên hệ với bạn sớm nhất có thể để hoàn thành thủ tục thanh toán !</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    this.props.navigation.navigate('Home');
                                }}>
                                <Text>Về trang chủ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 50 }}>
                    <Image
                        style={styles.productImage}
                        source={{ uri: 'http://easytour.tk/image/' + this.props.navigation.state.params.tour.hinhanh }}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Text style={styles.produceName}>{this.props.navigation.state.params.tour.tentour}</Text>
                        <Text style={styles.produceName}>{this.convertPrice(this.props.navigation.state.params.tour.total)}</Text>
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
                    <Text style={{ alignSelf: 'flex-end' }}>{'Tổng cộng: ' + this.convertPrice(this.state.price)}</Text>
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