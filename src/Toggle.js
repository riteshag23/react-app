import React, { Component } from "react";

class Toggle extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {text: "ON"};
        this.toggleClick = this.toggleClick.bind(this);
    }
    toggleClick()
    {
        if(this.props.enable !=="true")
        return false;

        if(this.state.text == "ON")
            this.setState({ text: "OFF"});
        else
            this.setState({ text: "ON"});
    }
    render()
    {
        return <button onClick={this.toggleClick}>{this.state.text}</button>
    }
}

export default Toggle;