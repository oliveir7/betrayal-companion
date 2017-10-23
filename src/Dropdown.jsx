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
    fontFamily: "'Nosifer', cursive",
    fontSize: '1.4em',
    color:'#d9232c',
    textShadow: '0px 0px 8px black',
    textAlign: 'left'
}

const defaultStep = {
    fontFamily: "'Archivo Black', sans-serif",
    color:'rgba(203, 202, 66, 0.51)', // greenish yellow, 50% opacity
    fontSize:'23px'
}

const regularStep = {
    fontFamily: "'Archivo Black', sans-serif",
    color:'gray',
    fontSize:'23px'
}

const bioStyle = {
    fontSize: '0.9em',
    textAlign: 'right',
    paddingTop: 5,
    textShadow: '0px 0px 8px #000'
}

const sliderStyle = {
    width: '90%',
    margin: '0 auto'
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
    marginTop: 5,
    marginBottom: 30
//    borderTop: '1px solid #777'
}

const menuItemText = {
    fontSize:'1.3em',
    paddingLeft: 12
}

const menuItemPic = {
    marginBottom: -12,
    paddingTop: 12
}

const menuItemStyle = {
    borderLeft: '1px solid #777',
    borderRight: '1px solid #777'
}

const headerTextStyle = {
    fontFamily: "'Archivo Black', sans-serif",
    fontSize: '1.6em',
    textShadow: '0px 0px 15px #000'
}

const subTextStyle = {
    fontFamily: "'Archivo Black', sans-serif",
    fontSize: '1em'
}

const BuildSlider = ({statname, statlist, startingindex}) => {
    let marks = {};
    statlist.map((item, index) => {
        if(index === 0){
            marks[index] = <IconButton style={deathStepStyle} iconStyle={deathIconStyle}><Healing/></IconButton>
        }else if(index === startingindex){
            marks[index] = <span style={defaultStep}><u>{item}</u></span>
        } else
            marks[index] = <span style={regularStep}>{item}</span>;
    });
    // TODO: more visible feedback on the current value of the stat
    return (
        <div style={sliderStyle}>
            <div style={bloodtext}>{statname}</div>
            <Slider min={0} max={statlist.length-1} step={null} marks={marks} defaultValue={startingindex} 
                trackStyle={[ { backgroundColor: '#cbca42' } ]}
                railStyle={{ backgroundColor: 'black' }}
                dotStyle={{ backgroundColor: 'black', borderColor:'gray' }}
                activeDotStyle={{ backgroundColor: 'black',  borderColor:'gray' }}
                handleStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.23)', borderRadius:"0px 0px 8px 8px", height: 65, width:30, borderColor:'#717171', marginLeft:-14 }} />
            <br/>
            <br/>
            <br/>
        </div>    
    )
}

const HeroCard = ({ data , pic, total}) => {
    let width = (total <= 2) ? 4 : 12/total;
    const cardStyle = {
        paddingLeft: 20,
        paddingRight: 20
    }

    return (
        <Col xs={ width } style={cardStyle}>
            <Row>
                <Col xs={1}>
                    <img src={pic} alt="" height="130" width="130" />
                </Col>
                <Col xs={11}>
                    <Row style={bioStyle}>
                        <Col xs={12} style={headerTextStyle}>{data.Name}</Col>
                        <Col xs={12}>Age: {data.Age}</Col>
                        <Col xs={12}>Birthday: {data.Birthday}</Col>
                        <Col xs={12}>Weight: {data.Weight}, Height: {data.Height}</Col>
                        <Col xs={12}>Hobbies: {data.Hobbies}</Col>
                    </Row>
                </Col>
            </Row>
            <hr/>
            <BuildSlider statname='Might' statlist={data.Might} startingindex={data.startingMight-1}/>
            <BuildSlider statname='Speed' statlist={data.Speed} startingindex={data.startingSpeed-1}/>
            <BuildSlider statname='Sanity' statlist={data.Sanity} startingindex={data.startingSanity-1}/>
            <BuildSlider statname='Knowledge' statlist={data.Knowledge} startingindex={data.startingKnowledge-1}/>
            <br/>
        </Col>
    )
}

const ActivePlayers = ({ nameArray, images }) => {
    
    if(typeof nameArray === 'undefined' || nameArray.length < 1)
        return(<div>No Players Selected!<br/><br/><br/><br/></div>);
    
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
                    <img style={menuItemPic} src={this.images[character.Name + '.png']} alt="" height="45" width="45" /> 
                    <span style={menuItemText}>{character.Name}</span>
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
                        maxHeight={900} menuItemStyle={menuItemStyle}
                        onChange={this.handleChange}  hintText="Select a character">
                {this.state.data}
          </SelectField>
            <br/>
            <Grid fluid style={bioStyle}>
                <ActivePlayers nameArray={this.state.selected} images={this.images}/>
            </Grid>
         </Paper>
        );
    }
}

// 
export default Dropdown;