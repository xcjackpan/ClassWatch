import React, { Component } from 'react';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  } 

  handleChange = (e) => {
		this.setState({value: e.target.value.toUpperCase()});
  }

  setLoading = (e) => {
    this.props.handleSubmit();    
    // Change something so users know it's searching
  }
  
  render() {
    return (
      <div className="searchBar">
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" display="none" frameBorder="0"></iframe>
        <form action="http://localhost:8080/scrape" method="post" onSubmit={this.setLoading} target="dummyframe" autoComplete="off">
          <select name="term" onChange={this.props.changeSeason}>
            <option value="1179">Fall 2017</option>
            <option value="1181">Winter 2018</option>
            <option value="1185" selected>Spring 2018</option>
            <option value="1189">Fall 2018</option>
          </select>
          <input name="course" type="text" className="search" placeholder="enter a course code" value={this.state.value} onChange={this.handleChange}/>
        </form>
        {this.props.searching ? <div className="loader"></div> : null}
      </div>
    );
  }
}

export default SearchComponent;