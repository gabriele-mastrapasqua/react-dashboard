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
        <DevicesImpressionsTable totalImpressions={this.state.totalImpressions} />
      );
    } else if (this.state.option === 1) {
      return (
        <BarChart type="h" />
      );
    } else if (this.state.option === 2) {
      return (
        <BarChart type="w" />
      );
    } else if (this.state.option === 3) {
      return (
        <BarChart type="m" />
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
       
        
          <div class="card" style={{'margin-top': '20px'}}>
            <div class="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="btn-group" role="group" aria-label="Impressions">
                    <button type="button" onClick={this.changeOption.bind(this, 0)} className={'btn btn-secondary'+(this.state.option == 0 ? 'active': '') } >Total impressions</button>
                    <button type="button" onClick={this.changeOption.bind(this, 1)} className={'btn btn-secondary'+(this.state.option == 1 ? 'active': '') }>Last 24 hours</button>
                    <button type="button" onClick={this.changeOption.bind(this, 2)} className={'btn btn-secondary'+(this.state.option == 2 ? 'active': '') }>Last week</button>
                    <button type="button" onClick={this.changeOption.bind(this, 3)} className={'btn btn-secondary'+(this.state.option == 3 ? 'active': '') }>Last Month</button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-body" style={{ height: '600px' }} >
                      {this.renderSelectedOption()}
                    </div>
                  </div>

                </div>
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-body" style={{ height: '600px' }} >
                      <MapChart data={this.state.impressionEachCountry} />
                    </div>
                  </div>
                </div>

              </div>


            </div></div>



        </div>





      </div>
    );
  }
}

export default App;
