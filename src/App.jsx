import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import ReactPlayer from 'react-player';

class App extends Component {
    
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
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    
                </header>
                <p className="App-intro">
                    { this.state.playing ? 'Now Playing:' : 'Paused: '} 
                    Treacherous Mansion from Luigi's Mansion Dark Moon
                </p>
                <ReactPlayer url='https://youtu.be/_2zM7KBG_rQ' playing={ this.state.playing ? true : false } height='0' />
                <RaisedButton label={ this.state.btnText } onClick={ this.handleClick.bind(this) }/>
                
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
