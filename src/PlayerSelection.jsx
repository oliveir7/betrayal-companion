import React, { Component } from 'react';
import './App.css';
//import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Card } from 'material-ui/Card';
//import flashImg from './images/flash.jpg';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/navigation/check';
import ActionFavoriteBorder from 'material-ui/svg-icons/social/person-add';
import Character from './Character.jsx';

const style = {
    height: 100,
    width: 250,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
};

const boxStyle = {
    width:30,
    margin:'0 auto',
    paddingBottom:'8px'
}


const HeroList = (props) => {
  const numbers = props.numbers;
  const boxChecked = (e, value) => {
      console.log(e.currentTarget.id);
  }
  const listItems = numbers.map((number) =>
        <Paper style={style} zDepth={1} key={number}>
            <Card>
                <Character/>
            </Card>
            <Checkbox checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      onCheck={ boxChecked.bind(this) }
                      style={boxStyle}
                      id={ 'Hero_' + number } />
        </Paper>
    );
  return (
    <div>{listItems}</div>
  );
}

                            
class PlayerSelection extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playerCount: 0
        }
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
    
    // slight problem with this approach, may need control inside the checkbox to change label
    boxChecked = (event, value) => {
        this.updateCount(value)
    }

  render() {
    return (
        <div>
            <p>{this.state.playerCount} Player(s) Selected</p>
            <HeroList callbackFromParent={this.updateCount} numbers={ [1, 2, 3, 4, 5] }></HeroList>
        </div>
    );
  }
}

export default PlayerSelection;
