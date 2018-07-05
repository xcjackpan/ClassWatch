import React, { Component } from 'react';
import axios from 'axios';
import SearchComponent from '../components/SearchComponent.js';
import RemoveComponent from '../components/RemoveComponent.js';
import ResultsContainer from '../containers/ResultsContainer.js';
import '../assets/style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searched: false,
      clickOut: true,
      removeDialog: "none",
    }
    this.results = null;
  }

  changeSeason = (e) => {
    //this.setState({season: e.target.value.match(/\d\d\d(\d)/)[1]});
    //console.log(e.target.value.match(/\d\d\d(\d)/)[1]);
    var season = e.target.value.match(/\d\d\d(\d)/)[1];
    document.getElementById("winter").style.opacity = (season == 1) ? "1.0" : "0.0";
    document.getElementById("spring").style.opacity = (season == 5) ? "1.0" : "0.0";
    document.getElementById("fall").style.opacity = (season == 9) ? "1.0" : "0.0";
  }

  handleSubmit = (e) => {
    this.setState({searching: true});
    axios.get("http://localhost:8080/data").then(response => {
      console.log(response.data);
      this.results = response.data;
      this.setState({searching: false});
      this.setState({searched: true});
    }); 
	}

  clickOutside = (e) => {
    this.forceUpdate();
    this.setState({removeDialog: "none"});    
  }

  clickRemove = (e) => {
    this.setState({removeDialog: "block"});
    e.stopPropagation();
  }

  exitRemove = (e) => {
    this.setState({removeDialog: "none"});
  }

  render() {
    return (           
      <div className="home" onClick={this.clickOutside}>
        <div className="backgroundImg" id="winter">
        </div>
        <div className="backgroundImg" id="spring" >
        </div>
        <div className="backgroundImg" id="fall">
        </div>
        {this.state.searched ? null : 
          <div className="search">
            <div className="title">ClassWatch.</div>
            <SearchComponent searching={this.state.searching} handleSubmit={this.handleSubmit} changeSeason={this.changeSeason}/>
            <button className="removeButton" onClick={this.clickRemove}>Stop watching a course</button>
          </div>}
        <div className="remove">
          <RemoveComponent display={this.state.removeDialog} exit={this.exitRemove}/>
        </div>        
        {this.state.searched ? <ResultsContainer searching={this.state.searching} searched={this.state.searched} results={this.results} handleSubmit={this.handleSubmit} clickOut={this.state.clickOut} changeSeason={this.changeSeason}/> : null}
      </div>
    );
  }
}

export default App;
