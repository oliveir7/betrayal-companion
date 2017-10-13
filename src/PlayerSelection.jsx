import React, { Component } from 'react';
import './App.css';
//import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Card, CardHeader } from 'material-ui/Card';
import flashImg from './images/flash.jpg';


const style = {
    height: 100,
    width: 250,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


const PlayerSelection = () => (
  <div>
        <Paper style={style} zDepth={1}> 
          <Card>
            <CardHeader
              title="Ox Bellows"
              subtitle="Height: 6'4, Weight: 288 lbs, Hobbies: Football, Shiny Objects, Birthday: October 18th"
              avatar={flashImg}
            />
          </Card>
        </Paper>
  </div>
);

class PlayerSelectionBackup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playing: null,
            btnText: ''
        };
    }
    
    componentDidMount(){
        this.play();
    }
    
    handleClick(){
        // toggle music
        this.state.playing ? this.pause() : this.play();
    }
    
    play(){
        this.setState({ playing: true });
        this.setState({ btnText: 'Pause' });
    }
    
    pause(){
        this.setState({ playing: false });
        this.setState({ btnText: 'Play' });
    }
    
  render() {
    return (
        <h3>Select a Player!</h3>
    );
  }
}

export default PlayerSelection;
