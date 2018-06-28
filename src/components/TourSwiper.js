import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
// const url = 'http://localhost/api/images/type/';

export default class TourSwiper extends Component {
    render() {
        return (
            <View style={styles.wrapper}>

                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={styles.textStyle} >KHUYẾN MÃI HOT</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 4 }}>
                    <Swiper showsPagination width={imageWidth} height={imageHeight}>

                        <Image style={styles.imageStyle} source={{ uri: 'http://linhtours.vn/wp-content/uploads/2017/08/tour-du-lich-sapa-pansipang.jpg' }} />

                        <Image style={styles.imageStyle} source={{ uri: 'http://demo151.websieuviet.com/file/pic/newsletter/2016/09/3338714a57e6d05ee67bca25bc94dc2e.jpg' }} />

                        <Image style={styles.imageStyle} source={{ uri: 'http://demo151.websieuviet.com/file/pic/newsletter/2016/09/5ca96a09a80822815f7f917234b7d974.png' }} />

                    </Swiper>
                </View>
            </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
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
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
});