import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import Drawer from 'react-native-drawer';
import IndexApp from '../pages/IndexApp';
import SideMenu from '../components/SideMenu';

const { width } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        // alert(JSON.stringify(this.props.navigation.state));
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    render() {
        return (
            <Drawer
                openDrawerOffset={0.4}
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                content={
                    <SideMenu {...this.props} />
                }
                
            >
                <IndexApp navigation = {this.props.navigation} open={this.openControlPanel.bind(this)} />
            </Drawer>
        );
    }
}

