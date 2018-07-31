import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
export default class Locate extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
	container: {
		position:'absolute',
        justifyContent: 'flex-end',
        top:0,
        left:0,
        bottom:0,
        right:0,
        alignItems: 'center',
    },
    map:{ 
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
    }
})