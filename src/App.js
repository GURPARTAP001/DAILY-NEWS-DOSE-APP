import './App.css';
//in this app we will use the class base component of the react instead of the function base component 
//in the class base component we can easily easilly pass the props or variables using "this." 
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        {/* we don't want to hardcore the page size so we are passing it in the form of the props */}
        <News pageSize={6}/>
      </div>
    )
  }
}



