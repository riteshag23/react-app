import React, {Component} from "react";


class Clock extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {date:new Date()};
        this.tick = this.tick.bind(this);
    }

    tick()
    {
        this.setState({ 
            date: new Date()
        });    
    }
    componentDidMount()
    {        
        this.timer = setInterval(this.tick, 1000);        
    }
componentWillUnmount()
{
    clearInterval(this.timer);
}
    render()
    {
        return (<h1>Time:{this.state.date.toLocaleTimeString()}</h1>)
    }
}

export default Clock