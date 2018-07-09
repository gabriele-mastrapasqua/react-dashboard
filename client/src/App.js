import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


/*import './BarChart';
import BarChart from './BarChart';
import WorldMap from './WorldMap';
*/
import config from './config.js';


import EnhancedTable from './EnhancedTable';


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
      return {code: code, count: 100};
    })
  }, 
  {
    name: 'Alabama',
    data: ['Alabama' ].map(function (code) {
      return  {code: code, count: 22};
    })
  },
  {
    name: 'Arizona',
    data: ['Arizona'].map(function (code) {
      return  {code: code, count: 1100};
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
      this.setState({totalImpressions: response.data.impressions, impressionPerDevices: response.data.impressionPerDevices})
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Analityics Dashboard</h2>
        </div>
        <p className="App-intro">

        <b>Total impressions:</b> {this.state.totalImpressions}

        <EnhancedTable data={this.state.impressionPerDevices}  />

      <br/>
     
      Impressions for each country:

      <ReactHighmaps config={mapconfig}/>


        </p>
      </div>
    );
  }
}

export default App;
