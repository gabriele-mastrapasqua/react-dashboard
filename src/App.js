import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './BarChart';
import BarChart from './BarChart';
import WorldMap from './WorldMap';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        coords: [1,10,1,3]
      };
      
      // This binding is necessary to make `this` work in the callback
      this.changeValues = this.changeValues.bind(this);
  }

  changeValues(e) {
    console.log("click");

    // mutate state with setState()
    this.setState(prevState => ({
      coords: [
          parseInt(Math.random() * 10) + 1, 
          parseInt(Math.random() * 10) + 1, 
          parseInt(Math.random() * 10) + 1, 
          parseInt(Math.random() * 10) + 1
        ]
    }));


  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to myapp</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.


          <br/>

        <button onClick={this.changeValues}>update values</button>
        <br/>

        bar: {this.state.coords.join(",")}
        <BarChart data={this.state.coords} size={[500,500]}  />

        map: 
        <WorldMap w="500" h="500" />


        </p>
      </div>
    );
  }
}

export default App;
