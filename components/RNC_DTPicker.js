import React, { Component } from 'react';
import { View,Button,Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class RNC_DTPicker extends Component {
    state={
        date: new Date(),
        mode:'date',
        show:false
    }
    setDate=(event,date)=>{
        date=date||this.state.state
        this.setState({
            show:Platform.OS==='ios',
            date,
        });
    }
    show=mode=>{
        this.setState({
            show:true,
            mode,
        });
    }
    datepicker=()=>{
        this.show('date');
    }
    timepicker=()=>{
        this.show('time');
    }
    render(){
        const {show,date,mode} = this.state;
        return (                       
            <View>
                <View>
                    <Button onPress={this.datepicker} title="select event date">

                    </Button>
                </View>
                {/* <View>
                    <Button onPress={this.timepicker} title="show time picker">

                    </Button>
                </View> */}
                {
                    show && <DateTimePicker value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={this.setDate}
                    ></DateTimePicker>
                }
            </View>
        )                    
    }
}