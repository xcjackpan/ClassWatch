import React, { Component } from 'react';
import RowComponent from '../components/RowComponent.js';
import SubmitComponent from '../components/SubmitComponent.js';

class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDialog: "none",
    }
  }

 // createRows() {
  
 // }
  onSubmit = (e) => {
    // push to a local array
  }

  watchClasses = (e) => {
    e.preventDefault();
    this.setState({ submitDialog: "block" });
  }

  render() {
    const results = this.props.results;
    console.log(results);
    const course_title = results[0].course_title;
    return (
      <div>
        <h1>{course_title}</h1>
        <form action="http://localhost:8080/submit" target="dummyframe" method="post">
          <table>
            <thead>
              <tr>
                <th>WATCH</th>
                <th>Section</th>
                <th>Instructor</th>
                <th>Days</th>
                <th>Time</th>
                <th>Location</th>
                <th>Spots</th>
              </tr>
            </thead>
            <tbody>
                {results.map((elem) => <RowComponent row={elem}/>)}
            </tbody>
          </table>
          <button onClick={ this.watchClasses }>Watch</button>
          <SubmitComponent display={this.state.submitDialog}/>
          <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" display="none" frameBorder="0"></iframe>
        </form>
      </div>
    );
  }


}

export default ResultsContainer;