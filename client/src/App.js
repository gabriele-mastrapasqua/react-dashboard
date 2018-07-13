import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import config from './config.js';
import 'font-awesome/css/font-awesome.min.css'


// ui components
import DevicesImpressionsTable from './DevicesImpressionsTable';
import MapChart from './MapChart';
import BarChart from './BarChart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: 1,
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
    if (this.state.option === 1) {
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
            <i class="fa fa-pie-chart"></i>&#160;
            Analytics dashboard
          </a>
        </nav>
        <div className="container">
       
        
          <div class="card" style={{'margin-top': '20px'}}>
            <div class="card-body" style={{'background': '#eee'}}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="btn-group" role="group" aria-label="Impressions">
                    <button type="button" onClick={this.changeOption.bind(this, 1)} className={'btn btn-secondary'+(this.state.option == 1 ? 'active': '') }>
                      <i class="fa fa-clock-o"></i>&#160;
                      Last 24 hours</button>
                    <button type="button" onClick={this.changeOption.bind(this, 2)} className={'btn btn-secondary'+(this.state.option == 2 ? 'active': '') }>
                      <i class="fa fa-calendar-o"></i>&#160;
                      Last week</button>
                    <button type="button" onClick={this.changeOption.bind(this, 3)} className={'btn btn-secondary'+(this.state.option == 3 ? 'active': '') }>
                      <i class="fa fa-calendar"></i>&#160;
                      Last Month</button>
                  </div>
                </div>
              </div>

              <div className="row">
               
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-body" style={{ height: '550px' }} >
                      {this.renderSelectedOption()}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-body" style={{ height: '550px' }} >
                    <DevicesImpressionsTable totalImpressions={this.state.totalImpressions} />
                    </div>
                  </div>
                </div>

                <div className="col-md-12" style={{'margin-top':'20px'}}>
                  <div class="card">
                    <div class="card-body" style={{ height: '450px' }} >
                      <MapChart />
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
