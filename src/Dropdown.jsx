import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import Healing from 'material-ui/svg-icons/image/healing';
import Slider from 'rc-slider';
import HeroData from './assets/HeroData.json';

const bloodtext = {
    fontFamily: "'Nosifer', cursive"
}

const defaultStep = {
    color:'lightgreen'
}

const bioStyle = {
    fontSize: '0.8em'
}

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

const dropdownStyle = {
    width: '80%',
    marginTop: 30,
    borderTop: '1px solid #777'
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

const HeroCard = ({ data , pic, total}) => {

//    const speedSlider = buildSlider('Speed', data.Speed, data.startingSpeed);
//    const sanitySlider = buildSlider('Sanity', data.Sanity, data.startingSanity);
//    const knowledgeSlider = buildSlider('Knowledge', data.Knowledge, data.startingKnowledge);
    
    // TODO: this may need to be its own class, i think setting state is the reason why this wont update.
    // TODO: more visible feedback on the current value of the stat
    return (
        <Col xs={ (12/total) }>
            <img src={pic} alt="" height="100" width="100" style={imgStyle}/>
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

const ActivePlayers = ({ nameArray, images }) => {
    
    if(typeof nameArray === 'undefined' || nameArray.length < 1)
        return(<div>No Players Selected!</div>);
    
    let list = [];
    let nodes = nameArray.map((name) => {
        let temp = null;
        HeroData.map((Hero) => {
           if(Hero.Name === name){
               list.push(Hero);
               temp = (<HeroCard data={Hero} pic={images[Hero.Name + '.png']} total={nameArray.length} key={window.id++} />)
               return temp;
           }
        });
        return temp;
    });
    
    return(
        <Row>
            {nodes}
        </Row>
    )
}

class Dropdown extends Component {
    
    constructor(props) {
        super(props);
        this.images = props.images;
        // add logic to check if certain menu items should be disabled..
        this.state = {
            // for each character in HeroData.json, generate a menuItem for the dropdown menu
            // this needs to be changed...
            data: props.data.map((character) => {
              return(
                <MenuItem key={window.id++} label={character.Name} value={character.Name}>
                    <img src={this.images[character.Name + '.png']} alt="" height="35" width="35" />
                    {character.Name}
                </MenuItem>
              );
           })
        }
        this.state.selected = [];
    }
    
    componentDidMount(){
        console.log('Dropdown Loaded.');
    }
    
    state = {
        value: 1,
    };

    // event handler for SelectField updates
    handleChange = (event, index, value) => {
//        console.log(value);
        this.setState({value});
        this.setState({selected : value});
    }
    
    render() {
        return (
        <Paper>
            <SelectField multiple={true} value={this.state.value} style={dropdownStyle}
                        maxHeight={600}
                        onChange={this.handleChange}  hintText="Select a character">
                {this.state.data}
          </SelectField>
            
            <Grid fluid style={bioStyle}>
                <ActivePlayers nameArray={this.state.selected} images={this.images}/>
            </Grid>
         </Paper>
        );
    }
}

// 
export default Dropdown;