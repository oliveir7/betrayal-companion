import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import { CardHeader } from 'material-ui/Card';
import WilliamsAvatar from './assets/Darwin Flash Williams.png';

const bioStyle = {
    fontSize: '10px'
}

class Character extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: "Flash Williams",
            desc: "Height: 6'4, Weight: 288 lbs, Birthday: October 18th",
            btnText: 'Add Player',
            img: WilliamsAvatar
        };
    }
    
    componentDidMount(){
        console.log('Character Loaded.');
    }
        
    render() {
      return (
         <CardHeader 
            title={this.state.name} 
            subtitle={this.state.desc} 
            avatar={this.state.img} 
            subtitleStyle={bioStyle}/>
      );
    }
    
}

export default Character;
