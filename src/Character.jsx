import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import { CardHeader } from 'material-ui/Card';
import WilliamsAvatar from './assets/Darwin Flash Williams.png';
import HeroData from './assets/HeroData.json';
import { Card } from 'material-ui/Card';
import ActionFavorite from 'material-ui/svg-icons/navigation/check';
import ActionFavoriteBorder from 'material-ui/svg-icons/social/person-add';
import Checkbox from 'material-ui/Checkbox';

window.id=0;

const bioStyle = {
    fontSize: '10px'
}

const boxStyle = {
    width:30,
    margin:'0 auto',
    paddingBottom:'8px'
}

const HeroCard = ({data, fn}) => {
    return (
        <Paper>
        <Card>
            <p>{data.Name}</p>
            <p>{data.Age}</p>
            <p>{data.Weight}</p>
            <p>{data.Height}</p>
            <p>{data.Hobbies}</p>
            <p>{data.Birthday}</p>
        </Card>
        <Checkbox checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            onCheck={ fn }
            style={boxStyle} />
        </Paper>
    )
}


const HeroList = ({data}) => {
    const nodes = data.map((HeroData) => {
        return(<HeroCard key={window.id++} data={HeroData} />);
    })
    
    return(
        <div style={bioStyle}>{nodes}<br/></div>
    )
}

class AllCharacters extends Component {
    
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {};
        this.HeroData = HeroData;
        this.callbackFromParent = props.callbackFromParent;
    }
    
    componentDidMount(){
        console.log('AllCharacters Loaded.');
    }
        
    render() {
      return (
          <HeroList data={this.HeroData} fn={this.callbackFromParent}></HeroList>
      )
    
    }
    
}

export default AllCharacters;
