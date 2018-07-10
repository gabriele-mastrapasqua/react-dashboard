import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import config from './config.js';

// ui components
import DevicesImpressionsTable from './DevicesImpressionsTable';
import MapChart from './MapChart';
import BarChart from './BarChart';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: 0,
      totalImpressions: 0,
      impressionPerDevices: [],
      impression24Hours: [],
      impressionDayOfWeek: [],
      impressionDayOfMonth: [],
      impressionEachCountry: [],
    };
  }

  changeOption = (opt) => {
    console.log("changeOpt ", opt);
    this.setState({ option: opt });
  }

  componentDidMount() {
    axios.get(config.API_URL + 'getTotalImpressions')
      .then(response => {
        console.log(response)
        this.setState({ totalImpressions: response.data.impressions })
      })
  }

  renderSelectedOption() {
    if (this.state.option === 0) {
      return (
        <DevicesImpressionsTable />
      );
    } else if (this.state.option === 1) {
      return (
        <BarChart />
      );
    } else if (this.state.option === 2) {
      return (
        <DevicesImpressionsTable />
      );
    } else if (this.state.option === 3) {
      return (
        <DevicesImpressionsTable />
      );
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Analytics dashboard
        </a>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <b>Total impressions:</b> {this.state.totalImpressions}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              Impressions:
          </div>
            <div className="col-md-12">
              <div className="btn-group" role="group" aria-label="Impressions">
                <button type="button" onClick={this.changeOption.bind(this, 0)} className="btn btn-secondary">Total impressions</button>
                <button type="button" onClick={this.changeOption.bind(this, 1)} className="btn btn-secondary">Last 24 hours</button>
                <button type="button" onClick={this.changeOption.bind(this, 2)} className="btn btn-secondary">Last week</button>
                <button type="button" onClick={this.changeOption.bind(this, 3)} className="btn btn-secondary">Last Month</button>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            {this.renderSelectedOption()}
          </div>
      </div>
    
    
        <br />

          Impressions for each country:
  
      <MapChart data={this.state.impressionEachCountry} />


        </div>
        );
      }
    }
    
    export default App;
