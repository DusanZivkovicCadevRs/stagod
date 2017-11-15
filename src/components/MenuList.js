import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import Menu1 from './Menu2';

class MenuList extends Component {
    state = { menus: [], child: [] };

    componentWillMount() {
        axios.get('http://192.168.0.15:8000/railways')
        .then(response => this.setState({ menus: response.data.menuTrees[1].menuTree }));
    }

    renderMenus1() {
        return this.state.menus.map(menu => 
            <Menu1 key={menu.menuId} menu1={menu} />
        );
    }

    render() {
        return (
            <View>
                {this.renderMenus1()}
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0
    }
}

export default MenuList;
