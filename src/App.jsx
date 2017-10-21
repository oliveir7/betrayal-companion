import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import 'rc-slider/assets/index.css';
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
        this.playlist = [
            {url:'https://youtu.be/tloJr0GHOw4', name:'Treacherous Mansion'},
            {url:'https://youtu.be/_2zM7KBG_rQ', name:'Terrifying Invasion'},
            {url:'https://youtu.be/1VU0McJuKn8', name:'Gradual Infiltration'},
            {url:'https://youtu.be/bcD6l1out1s', name:'Haunted Towers'},
            {url:'https://youtu.be/7GVjW-_LxtQ', name:'Ghost Theme #3'}
        ];
        this.state.nowPlaying = this.playlist[0];
    }
    
    componentDidMount(){
//        this.play(); // background music on by default
        this.pause(); // start app without song playing
    }
    
    handleClick(){
        // toggle music
        this.state.playing ? this.pause() : this.play();
    }
    
    nextSong(){
        // find the index of the current song that is playing
        const index = this.playlist.indexOf(this.state.nowPlaying);
        
        // increment the index to the next song, if at end, go to first song again
        const nextIndex = (index + 1) % this.playlist.length;
        this.setState({nowPlaying : this.playlist[nextIndex]})
    }
    
    play(){
        // update player state and button text
        this.setState({ playing: true });
        this.setState({ btnText: 'Pause Music' });
    }
    
    pause(){
        // update player state and button text
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
                    <RaisedButton label={ 'Next Song' } onClick={ this.nextSong.bind(this) }/>
                    <p className="App-intro">
                        { this.state.playing ? 'Now Playing...' + this.state.nowPlaying.name : null } 
                    </p>
                    <ReactPlayer 
                        url={ this.state.nowPlaying.url } 
                        playing={ this.state.playing } 
                        height='0' width='0' 
                        onEnded={this.nextSong.bind(this)}
                    />
                </header>

                <PlayerSelection />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
