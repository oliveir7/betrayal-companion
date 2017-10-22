import React, { Component } from 'react';
import './App.css';
import HeroData from './assets/HeroData.json';
import Dropdown from './Dropdown.jsx'

window.id=0;


const importPics = (r) => {
    // dynamically import all images in directory
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}
let images = importPics(require.context('./assets', false, /\.(png)$/));





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
            <Dropdown data={HeroData} images={images} />
      )
    }
}

export default AllCharacters;
