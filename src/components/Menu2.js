import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './Menu3';

class Menu2 extends Component {

    renderMenus3() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(child =>
                <Menu3 key={child.menuId} menu3={child} />
            );
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.menu2Item}>
                    <Text numberOfLines={1} style={styles.menu2Text}>{this.props.menu2.title}</Text>
                </TouchableOpacity>
                <View style={{height: 250, flexWrap: 'wrap'}}>
                    {this.renderMenus3()}
                </View>

            </View>
        );
    }
}

const styles = {
    menu2Item: {
        padding: 10,
        margin: 5,
        width: 200
    },
    menu2Text: {
        backgroundColor: 'orange',
        padding: 10
    }
}

export default Menu2;