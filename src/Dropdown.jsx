import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class Dropdown extends Component {
    
    constructor(props) {
        super(props);
        this.images = props.images;
        // add logic to check if certain menu items should be disabled..
        this.state = {
            // for each character in HeroData.json, generate a menuItem for the dropdown menu
            data: props.data.map((character) => {
              return(
                <MenuItem key={window.id++} label={character.Name} value={character.Name}>
                    <img src={this.images[character.Name + '.png']} alt="" height="35" width="35" />
                    {character.Name}
                </MenuItem>
              );
           })
        }
    }
    
    componentDidMount(){
        console.log('Dropdown Loaded.');
    }
    
    state = {
        value: 1,
    };

    // event handler for SelectField updates
    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
          <SelectField value={this.state.value} onChange={this.handleChange}  hintText="Select a character">
                {this.state.data}
          </SelectField>
        );
    }
}

// 
export default Dropdown;