import React, { Component } from 'react';
import axios from 'axios';
import SearchComponent from '../components/SearchComponent.js';
import RemoveComponent from '../components/RemoveComponent.js';
import ResultsContainer from '../containers/ResultsContainer.js';
import '../assets/style/App.css';
import HelpComponent from '../components/HelpComponent.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-113636995-2');
ReactGA.pageview(window.location.pathname + window.location.search);

library.add(faQuestion);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searched: false,
      clickOut: true,
      helpModal: "none",
      removeDialog: "none",
    }
    this.results = null;
    this.term = "";
    this.search = "";
  }

  searchQuery = ( term, search ) => {
    this.term = term;
    this.search = search;
    this.setState({searching: true});
    axios.get("/data?term=" + this.term + "&search=" + this.search).then(response => {
      this.results = response.data;
      this.setState({searching: false});
      this.setState({searched: true});
    });
  }

  changeSeason = (e) => {
    //this.setState({season: e.target.value.match(/\d\d\d(\d)/)[1]});
    //console.log(e.target.value.match(/\d\d\d(\d)/)[1]);
    //var season = e.target.value.match(/\d\d\d(\d)/)[1];
    var season = e.match(/\d\d\d(\d)/)[1];;
    document.getElementById("winter").style.opacity = (season == 1) ? "1.0" : "0.0";
    document.getElementById("spring").style.opacity = (season == 5) ? "1.0" : "0.0";
    document.getElementById("fall").style.opacity = (season == 9) ? "1.0" : "0.0";
  }

  handleSubmit = (e) => {
    this.setState({searching: true});
    axios.get("/data").then(response => {
      this.results = response.data;
      this.setState({searching: false});
      this.setState({searched: true});
    });
  }

  clickHelp = (e) => {
    this.setState({helpModal: "inline-block"});
    e.stopPropagation();
  }

  exitHelp = (e) => {
    this.setState({helpModal: "none"});
  }

  clickOutside = (e) => {
    this.forceUpdate();
    this.setState({removeDialog: "none", helpModal: "none"});   
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
        
        {/*this.state.searched ? null : 
        <div className="sorry">
          <p>
            Quick update: We're now waiting on validation from our new mailing provider. Once we have that, everything should be back up and running.
          </p>
        </div>
        */}
        
        {this.state.searched ? null : 
          <div className="search">
            <div className="title">ClassWatch.</div>
            <SearchComponent searching={this.state.searching} handleSubmit={this.handleSubmit} changeSeason={this.changeSeason} searchQuery={this.searchQuery}/>
            <button className="removeButton" onClick={this.clickRemove}>Stop watching a course</button>
            <div onClick={this.clickHelp}><FontAwesomeIcon className="questionMark" icon="question"/></div>
          </div>
        }
        <div>
          <HelpComponent display={this.state.helpModal} exit={this.exitHelp}/>
        </div>
        <div className="remove">
          <RemoveComponent display={this.state.removeDialog} exit={this.exitRemove}/>
        </div>
        {this.state.searched ? <ResultsContainer searching={this.state.searching} searched={this.state.searched} results={this.results} handleSubmit={this.handleSubmit} clickOut={this.state.clickOut} changeSeason={this.changeSeason} searchQuery={this.searchQuery}/> : null}
      </div>
    );
  }
}

export default App;
