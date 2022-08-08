import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSV: [],
    };
  }
  dnPost() {
    var url = 'http://localhost:3000/data';
    axios.post(url, {
      name: this.state.input1,
      age: this.state.input2
    })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.state.input1 = '';
    this.state.input2 = '';
  };
  dnGet() {
    var url = 'http://localhost:3000/data';
    axios.get(url)
      .then((aData) => {
        console.log(aData.data);
        this.setState({
          dataSV: aData.data,
        })
      })
  };
  render() {
    const dataMySQL = this.state.dataSV.map((item, index) => {
      var arraySV = ['Ten:', item.name, ' - Tuoi:', item.age].join('');
      return <Text style={{ fontSize: 20, fontWeight: 'bold' }} key={index}>{arraySV}</Text>
    });
    return (
      <View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>React native and NodeJS</Text>
          <TextInput
            placeholder='Hay nhap ten SV'
            style={{ height: 50, width: 350, fontSize: 15 }}
            onChangeText={(input1) => this.setState({ input1 })}
            value={this.state.input1}
          />
          <TextInput
            placeholder='Hay nhap tuoi la mot so nguyen'
            style={{ height: 50, width: 350, fontSize: 15 }}
            onChangeText={(input2) => this.setState({ input2 })}
            value={this.state.input2}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red', borderRadius: 15, flex: 1, width: 100, height: 50, margin: 20,
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
            }}
            onPress={this.dnPost.bind(this)}
          >
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              POST
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'green', borderRadius: 15, flex: 1, width: 100, height: 50, margin: 20,
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
            }}
            onPress={this.dnGet.bind(this)}
          >
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              GET
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          {dataMySQL}
        </View>
      </View>
    );
  }
}
export default App;
