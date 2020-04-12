import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class MyListCard extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    open_episode = (param) =>{
        this.props.open_episode(param)
    };


    render() {

        return (
            <TouchableOpacity onPress={() => this.open_episode(1)}>
                <View style={{height: 90, margin: 15, borderWidth: 1, borderRadius: 15, padding: 20,backgroundColor: "#eff5f5"}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 6, flexDirection: 'column'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 24}}>Daily Tech Talk {'\n'}<Text style={{fontSize: 15}}>Creator: Nikhil Gupta</Text></Text>
                            </View>
                        </View>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <View style={{flex: 3}}>

                            </View>
                            <View style={{flex: 1}}>
                                <Text><Text style={{fontWeight: 'bold'}}>Episodes:</Text> 10</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
console.disableYellowBox = true;


