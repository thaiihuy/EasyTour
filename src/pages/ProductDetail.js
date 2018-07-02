import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList,
    ScrollView
} from 'react-native';
import icBack from '../images/icon/back_black.png';
import icLogo from '../images/icon/addCart.png';
import GetChang from '../components/api/getChang';
import Swiper from 'react-native-swiper';
const { height, width } = Dimensions.get('window');
class OneSwiper extends Component {
    convertTime(time) {
        return 'Giờ khởi hành: ' + time.substring(11, 16) + ' \nNgày: ' + time.substring(8, 10) + ' Tháng: ' + time.substring(5, 7) + ' Năm: ' + time.substring(0, 4);
    }
    convertPrice(price) {
        // var l = price.length;
        // let priceTemp='';
        // for (let i = l - 1; i-3; i >= 0) {
        //     priceTemp+='.'+price.substring(i,i-3);
        // }
        var priceTemp=price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.");
        return priceTemp+' VND';
    }
    render() {
        return (
            <ScrollView>
                <Image
                    style={styles.productImage}
                    source={{ uri: 'http://easytour.tk/image/' + this.props.item.hinhanh }}
                />
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '200', }}>{'Chặng: ' + this.props.item.tenDiemDi + ' - ' + this.props.item.tenDiemDen}</Text>
                <Text style={{ fontSize: 20, }}>{'Giá: ' + this.convertPrice(this.props.item.gia)}</Text>
                <Text style={{ fontSize: 20 }}>{this.convertTime(this.props.item.giodi)}</Text>
                <Text style={styles.producePrice}>{this.props.item.mota}</Text>
            </ScrollView>
        );
    }
}
export default class OderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            data: [],

        };
    }
    BackToHome() {
        this.props.navigation.navigate('Home')
    }
    componentDidMount() {
        this.setState({
            isLoading: true,
        })
        GetChang(JSON.stringify(this.props.navigation.state.params.item.id)).then(res => {
            ///alert(JSON.stringify(res));
            this.setState({
                data: res,
                isLoading: false,
            })

        })

    }
    render() {
        const { item
        } = this.props.navigation.state.params;
        return (

            <View style={styles.container}>

                <View style={{ height: height / 8, flex: 1 / 15, backgroundColor: '#bfcc50', padding: 10, justifyContent: 'space-around', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={this.BackToHome.bind(this)}>
                            <Image style={{ width: 25, height: 25 }} source={icBack} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20 }}>Chi tiết Tour</Text>
                        <TouchableOpacity>
                            <Image style={{ width: 25, height: 25 }} source={icLogo} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 17, textAlign: 'center' }}>{item.tentour}</Text>
                </View>
                <View style={styles.wrapper}>
                    {this.state.data.length > 0 &&

                        <Swiper showsPagination style={{ flex: 1, marginTop: 10 }}>
                            {this.state.data.map((item, index) => {
                                return (
                                    <OneSwiper item={item} index={0} {...this.props}>

                                    </OneSwiper>
                                )
                            })}
                        </Swiper>}
                </View>
            </View>
        );
    }
}
const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 452;
const imageWidth = width;
const imageHeight = height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4ff81',
        justifyContent: 'space-between'
    },
    wrapper: {
        width: width - 20,
        backgroundColor: '#fffde7',
        margin: 10,
        shadowColor: '#2E272B',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0,
        flex: 1
    },
    body: {

    },
    productImage: {
        width: width,
        height: height / 3,
    },
})
