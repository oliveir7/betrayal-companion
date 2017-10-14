import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import ReactPlayer from 'react-player';
import PlayerSelection from './PlayerSelection';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playing: null,
            btnText: 'Loading...'
        };
    }
    
    componentDidMount(){
//        this.play();
        this.pause();
    }
    
    handleClick(){
        // toggle music
        this.state.playing ? this.pause() : this.play();
    }
    
    play(){
        this.setState({ playing: true });
        this.setState({ btnText: 'Pause Music' });
    }
    
    pause(){
        this.setState({ playing: false });
        this.setState({ btnText: 'Play Music' });
    }
    
  render() {
    return (
        <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Betrayal at the House on the Hill Companion App</h1>
                    <RaisedButton label={ this.state.btnText } onClick={ this.handleClick.bind(this) }/>
                    <p className="App-intro">
                        { this.state.playing ? 'Now Playing... Treacherous Mansion from Luigi\'s Mansion Dark Moon' : null } 
                    </p>
                    <ReactPlayer url='https://youtu.be/_2zM7KBG_rQ' playing={ this.state.playing ? true : false } height='0' />
                </header>
                <PlayerSelection />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
