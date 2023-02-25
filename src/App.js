import './App.css';
//in this app we will use the class base component of the react instead of the function base component 
//in the class base component we can easily easilly pass the props or variables using "this." 
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import{
  BrowserRouter as Router ,Route,Routes}from "react-router-dom"

export default class App extends Component {
  
  render() {
    return (
      <div>
        {/* we are using the react router to add the navigation links to the various news sections */}
        <Router>
        <Navbar/>
          <Routes>
        {/* we don't want to hardcore the varios characterstics of the news eg:page size,country,category so we are passing it in the form of the props */}
        {/* now in order to re-render/remount the page when we press the category we have to pass the keys so that the react understand that its has to render the page again to see the difference remove the key and see */}
        <Route exact path="/*" element={<News key="general" pageSize={12} country='in' category='general'/>}/>
        <Route exact path="/business" element={<News key="business" pageSize={12} country='in' category='business'/>}/>
        <Route exact path="/entertainment" element={<News key="entertainment" pageSize={12} country='in' category='entertainment'/>}/>
        <Route exact path="/health" element={<News key="health" pageSize={12} country='in' category='health'/>}/>
        <Route exact path="/science" element={<News key="science" pageSize={12} country='in' category='science'/>}/>
        <Route exact path="/sports" element={<News key="sports" pageSize={12} country='in' category='sports'/>}/>
        <Route exact path="/technology" element={<News key="technology" pageSize={12} country='in' category='technology'/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}



