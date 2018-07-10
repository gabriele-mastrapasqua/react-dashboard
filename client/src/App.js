import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import config from './config.js';

// ui components
import DevicesImpressionsTable from './DevicesImpressionsTable';

const ReactHighmaps = require('react-highcharts/ReactHighmaps');
import maps from './map';

const mapconfig = {
  chart: {
    spacingBottom: 20
  },
  title: {
    text: 'Impressions per zones'
  },

  legend: {
    enabled: true
  },

  plotOptions: {
    map: {
      allAreas: true,                 // show all regions, also the zones with null values
      nullColor: 'rgba(0,0,0,0)',     // to render correctly use transparent color for the null zones
      joinBy: ['level1', 'code'],     // map values from 'map.json' property with 'code' to render data series
      dataLabels: {
        enabled: true,
        color: 'white',
        formatter: function () {
          return this.point.properties['level1'];
        },
        format: null,
        style: {
          fontWeight: 'bold'
        }
      },
      mapData: maps,
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <b>{series.name}</b>, Impressions count: {point.count}'   // using point to get data from series
      }

    }
  },

  // todo -> map with states from the server: 
  // do an axios req that map a json with state and count of impressions
  series: [

    {
      name: 'Alaska',
      data: ['Alaska'].map(function (code) {
        return { code: code, count: 100 };
      })
    },
    {
      name: 'Alabama',
      data: ['Alabama'].map(function (code) {
        return { code: code, count: 22 };
      })
    },
    {
      name: 'Arizona',
      data: ['Arizona'].map(function (code) {
        return { code: code, count: 1100 };
      })
    },

  ]
};




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalImpressions: 0,
      impressionPerDevices: [],
      impression24Hours: [],
      impressionDayOfWeek: [],
      impressionDayOfMonth: [],
      impressionEachCountry: [],

    };

  }

  componentDidMount() {
    axios.get(config.API_URL + 'getImpressions')
      .then(response => {
        console.log(response)
        this.setState({ totalImpressions: response.data.impressions, impressionPerDevices: response.data.impressionPerDevices })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Analityics Dashboard</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <b>Total impressions:</b> {this.state.totalImpressions}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary">Last 24 hours</button>
                <button type="button" className="btn btn-secondary">Last week</button>
                <button type="button" className="btn btn-secondary">Last Month</button>
              </div>
            </div>
          </div>

        </div>



        <DevicesImpressionsTable data={this.state.impressionPerDevices} />

        <br />

        Impressions for each country:

      <ReactHighmaps config={mapconfig} />



      </div>
    );
  }
}

export default App;
