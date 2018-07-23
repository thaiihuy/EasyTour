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
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/oder_history.png';
import getToken from '../components/api/getToken';
import GetOrder from '../components/api/getOrder';
const { height, width } = Dimensions.get('window');
class OneOrder extends Component {
    // gotoDetail(){
    //     this.props.navigation.navigate('ProductDetail',{item:this.props.item});
    // }
    convertPrice(price) {
        var priceTemp = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return priceTemp + ' VNĐ';
    }
    convertTime(time) {
        return 'Đặt lúc: ' + time.substring(11, 16) + ' \nNgày: ' + time.substring(8, 10) + ' Tháng: ' + time.substring(5, 7) + ' Năm: ' + time.substring(0, 4);
    }
    trangthai(tt) {
        if (tt == 0) return "Chưa xác nhận";
        else return "Đã xác nhận";
    }
    render() {
        return (
            <View style={{flexDirection:'row',margin:10 }}>
                <View>
                    <Image
                        style={styles.productImage}
                        source={{ uri: 'http://easytour.tk/image/' + this.props.item.hinhanh }}
                    />
                </View>
                <View>
                    <Text numberOfLines={2} style={styles.produceName}>{this.props.item.tentour}</Text>
                    <Text style={styles.produceTotal}>{this.convertTime(this.props.item.ngaydat)}</Text>
                    <Text style={styles.produceTotal}>{this.convertPrice(this.props.item.tonggia)}</Text>
                    <Text style={styles.producePrice}>{this.trangthai(this.props.item.trangthai)}</Text>
                </View>
            </View>
        );
    }
}
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
        this.loadData();
    }
    loadData() {
        getToken().then(res => {
            GetOrder(res.user.id).then(resp => {
                this.setState({
                    user: res.user.id,
                    data: resp,
                });
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
    componentWillReceiveProps() {
        this.loadData();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <FlatList
                            contentContainerStyle={styles.body}
                            data={this.state.data}
                            renderItem={({ item, index }) => {
                                //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                                return (
                                    <OneOrder item={item} index={index} {...this.props}>

                                    </OneOrder>);
                            }}
                            keyExtractor={(item, index) => (item.id).toString()}
                            // onRefresh={this.pullLoad.bind(this)}
                            refreshing={this.state.isLoading}
                        >
                        </FlatList>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4ff81',
        // height:height-100,
        // padding: 20,
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    titleStyle: { color: 'black', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30 },
    productImage: {
        width: 100,
        height: 100,
    },
    wrapper: {
        width: width - 20,
        backgroundColor: '#fffde7',
        margin: 10,
        shadowColor: '#2E272B',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingTop: 0,
        paddingRight: 10,
        flex: 1
    },
    producePrice: {
		marginBottom: 5,
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: '#662F90'
	},
	produceTotal: {
		marginBottom: 5,
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: 'red'
	},
	produceName: {
		paddingLeft: 10,
		fontFamily: 'Avenir',
		color: 'black',
		fontWeight: '500',
		fontSize: 15,
	},
});