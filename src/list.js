import React,{Component} from "react";

class List extends Component
{
    constructor(props)
    {
        super(props);        
    }

    render()
    {
      const numbers = [1,2,3,4,5,6];
      const listItems = numbers.map((item)=>{
          return <li key={item}> Item - { item }</li>
      });

      console.log(listItems);

      return (<ul>{ listItems }</ul>);
    }
}

export default List