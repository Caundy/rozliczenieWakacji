import React, { Component } from 'react';

export default class NameInputs extends Component{
    render(){
        let inputs = ""; 
        for(var i = 0; i < this.props.numberOfPeople; i++){
                inputs += '<input type="text" placeholder="Wpisz imię uczestnika" ref="uczestnik${i}" />'
            }
        return(
            inputs  
        )
    }
}