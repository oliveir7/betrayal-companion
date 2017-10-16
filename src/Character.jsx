import React, { Component } from 'react';
import './App.css';
//import Paper from 'material-ui/Paper';
//import { CardHeader } from 'material-ui/Card';
import HeroData from './assets/HeroData.json';
//import { Card } from 'material-ui/Card';
//import ActionFavorite from 'material-ui/svg-icons/navigation/check';
//import ActionFavoriteBorder from 'material-ui/svg-icons/social/person-add';
//import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';


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

const HeroCard = ({data, fn, pic}) => {
    let toggler = false;
    
//    const processCheck = (value) => {
//        console.log(value)
//        fn(value);
//    }

    const onCheck = (e) => {
      toggler = !toggler
    } 
    // TODO: this may need to be its own class, i think setting state is the reason why this wont update.
    return (
        <Col xs={4} sm={2}>
            <img src={ pic } alt="" height="100" width="100" style={imgStyle}/>
            <p>{data.Name}</p>
            <p>Age: {data.Age}, Birthday: {data.Birthday}</p>
            <p>Weight: {data.Weight}, Height {data.Height}</p>
            <p>Hobbies: {data.Hobbies}</p>
            <RaisedButton label={toggler ? 'Remove' : 'Select'} onClick={onCheck} />
        </Col>
    )
}


const HeroList = ({data, fn}) => {
    // dynamically import all images in directory
    const importPics = (r) => {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }
    let images = importPics(require.context('./assets', false, /\.(png)$/));

    const nodes = data.map((HeroData) => {
        return(<HeroCard key={window.id++} data={HeroData} fn={fn} pic={images[HeroData.Name + '.png']} />);
    })
    
    return(
        <Grid fluid style={bioStyle}>
            <Row>{nodes}</Row>
        </Grid>
    )
}

class AllCharacters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
        this.HeroData = HeroData;
        this.callbackFromParent = props.callbackFromParent;
    }
    
    componentDidMount(){
        console.log('AllCharacters Loaded.');
    }
        
    render() {
      return (
          <HeroList data={this.HeroData} fn={this.callbackFromParent}/>
      )
    }
}

export default AllCharacters;
