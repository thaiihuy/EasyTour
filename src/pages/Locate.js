import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
export default class Locate extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <View>
                <MapView
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