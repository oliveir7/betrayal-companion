import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
//import { CardHeader } from 'material-ui/Card';
import HeroData from './assets/HeroData.json';
//import { Card } from 'material-ui/Card';
//import ActionFavorite from 'material-ui/svg-icons/navigation/check';
//import ActionFavoriteBorder from 'material-ui/svg-icons/social/person-add';
//import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'rc-slider';
//import Badge from 'material-ui/Badge';
import Healing from 'material-ui/svg-icons/image/healing';
import IconButton from 'material-ui/IconButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import SelectField from 'material-ui/SelectField';
//import MenuItem from 'material-ui/MenuItem';
import Dropdown from './Dropdown.jsx'

window.id=0;

const bioStyle = {
    fontSize: '0.8em'
}

//const boxStyle = {
//    width:30,
//    margin:'0 auto',
//    paddingBottom:'8px'
//}

const imgStyle = {
    marginTop: '20px',
    marginLeft: '20px'
}
const sliderStyle = {
    width: '90%',
    margin: '0 auto',
    color: '#efefef',
    fontFamily: "'Nosifer', cursive",
    fontSize:'1.3em'
};

const deathIconStyle = {
    color:'gray',
    height:15,
    width:15
}

const deathStepStyle = {
    height:15,
    width:15,
    padding: 0,
    margin: 0
}

const defaultStep = {
    color:'lightgreen'
}

function log(value) {
//  console.log(value); //eslint-disable-line
}

const bloodtext = {
    fontFamily: "'Nosifer', cursive"
}

let BuildSlider = ({statname, statlist, startingindex}) => {
    let marks = {};
    statlist.map((item, index) => {
        if(index === 0){
            marks[index] = <IconButton style={deathStepStyle} iconStyle={deathIconStyle}><Healing/></IconButton>
        }else if(index === startingindex){
            marks[index] = <span style={defaultStep}>{item}</span>
        } else
            marks[index] = item;
    });
    return (
        <div style={sliderStyle}>
            <p>{statname}</p>
            <Slider min={0} max={statlist.length-1} step={null} marks={marks} defaultValue={startingindex} 
                trackStyle={[{ backgroundColor: 'darkred' }, { borderColor: 'pink' }]}
                railStyle={{ backgroundColor: 'black' }}
                dotStyle={{ backgroundColor: 'black', borderColor:'gray' }}
                activeDotStyle={{ backgroundColor: 'black',  borderColor:'gray'}}
                handleStyle={{ backgroundColor: 'darkred',height: 15,width: 15,borderColor:'white' }} />
            <br/>
        </div>    
    )
}

const HeroCard = ({data, fn, pic}) => {

//    const speedSlider = buildSlider('Speed', data.Speed, data.startingSpeed);
//    const sanitySlider = buildSlider('Sanity', data.Sanity, data.startingSanity);
//    const knowledgeSlider = buildSlider('Knowledge', data.Knowledge, data.startingKnowledge);
    
    // TODO: this may need to be its own class, i think setting state is the reason why this wont update.
    // TODO: more visible feedback on the current value of the stat
    return (
        <Col xs={12}>
            <img src={ pic } alt="" height="100" width="100" style={imgStyle}/>
            <p><strong>{data.Name}</strong></p>
            <p>Age: {data.Age}, Birthday: {data.Birthday}</p>
            <p>Weight: {data.Weight}, Height {data.Height}</p>
            <p>Hobbies: {data.Hobbies}</p>
            <hr/>
            <BuildSlider statname='Might' statlist={data.Might} startingindex={data.startingMight-1}/>
            <BuildSlider statname='Speed' statlist={data.Speed} startingindex={data.startingSpeed-1}/>
            <BuildSlider statname='Sanity' statlist={data.Sanity} startingindex={data.startingSanity-1}/>
            <BuildSlider statname='Knowledge' statlist={data.Knowledge} startingindex={data.startingKnowledge-1}/>
        </Col>
    )
}

const importPics = (r) => {
    // dynamically import all images in directory
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}
let images = importPics(require.context('./assets', false, /\.(png)$/));


const HeroList = ({data, fn}) => {
    
    const nodes = data.map((HeroData) => {
        return(
            <Col xs={2} key={window.id++}>
                
                <HeroCard  data={HeroData} fn={fn} pic={images[HeroData.Name + '.png']} />
            </Col>
        );
    });
    
    return(
      <Paper>
        <Dropdown data={HeroData} images={images}/>
        <Grid fluid style={bioStyle}>
            <Row>{nodes}</Row>
        </Grid>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </Paper>
    )
}


class AllCharacters extends Component {
    constructor(props) {
        super(props);
        this.callbackFromParent = props.callbackFromParent;
    }
    
    componentDidMount(){
        console.log('AllCharacters Loaded.');
    }
        
    render() {
      return (
          <div>
            
            <HeroList data={HeroData} fn={this.callbackFromParent}/>
          </div>
      )
    }
}

export default AllCharacters;
