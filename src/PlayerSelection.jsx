import React, { Component } from 'react';
import './App.css';
//import RaisedButton from 'material-ui/RaisedButton';
//import Paper from 'material-ui/Paper';
//import { Card } from 'material-ui/Card';
//import flashImg from './images/flash.jpg';
//import Checkbox from 'material-ui/Checkbox';
//import ActionFavorite from 'material-ui/svg-icons/navigation/check';
//import ActionFavoriteBorder from 'material-ui/svg-icons/social/person-add';
import AllCharacters from './Character.jsx';

//const style = {
//    height: 100,
//    width: 250,
//    margin: 20,
//    textAlign: 'center',
//    display: 'inline-block'
//};
//
//const boxStyle = {
//    width:30,
//    margin:'0 auto',
//    paddingBottom:'8px'
//}

                            
class PlayerSelection extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playerCount: 0
        }
        this.updateCount = this.updateCount.bind(this);
    }
    
    componentDidMount(){
        console.log('Player Selection Ready.')
    }
    
    updateCount (bool) {
        if(bool){
            let count = this.state.playerCount+1;
            this.setState({playerCount:count});         
        }else {
            let count = this.state.playerCount-1;
            this.setState({playerCount:count});
        }
    }


  render() {
    return (
        <div>
            <p>{this.state.playerCount} Player(s) Selected</p>
            <AllCharacters callbackFromParent={this.updateCount}/>
        </div>
    );
  }
}

export default PlayerSelection;
