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

//const listItems = numbers.map((numbers) => {
//    return(
//            <Paper style={style} zDepth={1}> 
//                <Card>
//                    <Character/>
//                    <p>{numbers}</p>
//                    <Checkbox
//                      checkedIcon={<ActionFavorite />}
//                      uncheckedIcon={<ActionFavoriteBorder />}
//                      label= 'Woo!'
//                      onCheck={ this.boxChecked.bind(this) }/>
//                </Card>
//            </Paper>
//);
//}
            
const NumbersList = (props) => {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <input key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
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
        console.log('well this works well..' + bool);
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
            
            <Paper style={style} zDepth={1}> 
                <Card>
                    <Character/>
                    <Checkbox
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}
                      label= 'Add / Remove Player'
                      onCheck={ this.boxChecked.bind(this) }/>
                </Card>
            </Paper>

            <NumbersList numbers={ [1, 2, 3, 4, 5] }></NumbersList>
 
        </div>
    );
  }
}

export default PlayerSelection;
