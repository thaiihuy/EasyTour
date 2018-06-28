import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import flatListData from './api/flatListData';
import TourSwiper from '../components/TourSwiper';
const { width } = Dimensions.get('window');
class FlatListItem extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.productContainer} >
                    <Image
                        style={styles.productImage}
                        source={{ uri: 'http://easytour.tk/image/' + this.props.item.hinhanh }}
                    />
                    <Text style={styles.produceName}>{this.props.item.tentour}</Text>
                    <Text style={styles.producePrice}>{this.props.item.mota}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const productWidth = (width - 60) / 2;
const productImageHeight = (productWidth / 361) * 452;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    },
    productContainer: {
        width: productWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: productWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#D3D3CF',
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#662F90'
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent:'space-around',
        flexWrap:'wrap',
        paddingBottom: 10,
    }
});

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
        }

    }
    pullLoad() {
        this.setState({
            isLoading: true,
        })
        flatListData().then(res => {
            ///alert(JSON.stringify(res));
            this.setState({
                data: res,
                isLoading: false,
            })
        })
    }
    componentWillMount() {
        this.setState({
            isLoading: true,
        })
        flatListData().then(res => {
            ///alert(JSON.stringify(res));
            this.setState({
                data: res,
                isLoading: false,
            })
        })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (

                <ScrollView>
                    <TourSwiper />
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>HOT TOUR</Text>
                        </View>
                        <FlatList
                            contentContainerStyle={styles.body}
                            data={this.state.data}
                            renderItem={({ item, index }) => {
                                //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                                return (
                                    <FlatListItem item={item} index={index} >

                                    </FlatListItem>);
                            }}
                            keyExtractor={(item, index) => (item.id).toString()}
                            onRefresh={this.pullLoad.bind(this)}
                            refreshing={this.state.isLoading}
                        >
                        </FlatList>
                    </View>
                </ScrollView>
            );
        }

    }
}