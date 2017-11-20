import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Image } from 'react-native';
import axios from 'axios';
import expo from 'expo';
import MenuList from './src/components/MenuList';

export default class App extends Component {

  state = { data: {}, isLoading: true };

  expoFolderInfo() {
    console.log('About to download video...');    
    expo.FileSystem.downloadAsync(
      'http://www.cduppy.com/salescms/files/3/82',
      expo.FileSystem.documentDirectory + 'small.jpg'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
      })
      .catch(error => {
        console.error(error);
      });    
  }

  componentWillMount() {
    this.expoFolderInfo();
    axios.get('http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890')
    .then(response => this.setState({ data: response.data }))
      .then(() => this.setState({ isLoading: false }));
    
  }

  async saveToAsync() {
    try {
      await AsyncStorage.setItem('@myData:key', 'some text ive made');
      console.log('im in saveToAsync, saving...');
    } catch (error) {
      
    }
  }

  async readFromAsync() {
    try {
      let valueReturned = await AsyncStorage.getItem('@myData:key');
      if(valueReturned !== null) {
        console.log('from readFromAsync:', valueReturned, 'is of type:' ,typeof(valueReturned))
      } 
    } catch (error) {
      
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <ScrollView>
          <Image style={{width: 300, height: 200, backgroundColor: 'pink'}} source={{uri: expo.FileSystem.documentDirectory + 'small.jpg', scale: 1}} />
          <MenuList data={this.state.data} />
        </ScrollView>
      );
    }
    else 
      return (
        <View style={{marginTop: 50}}>
          <Text>Loading, please wait.</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
