import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import config from './config.js';


const ReactHighmaps = require('react-highcharts/ReactHighmaps');
import maps from './map';


class MapChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      states: null,

      mapconfig: {
        chart: {
          spacingBottom: 20
        },
        title: {
          text: ''
        },
        legend: {
          enabled: false
        },

        plotOptions: {

          map: {
            allAreas: false,
            //nullColor: 'rgba(0,0,0,0)',     // to render correctly use transparent color for the null zones
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

        series: []

      },
    }
  }


  componentDidMount() {
    this.loadData()
  }

  loadData() {
    console.log("call getTotalImpressionsEachState ");
    axios.get(config.API_URL + 'getTotalImpressionsEachState/')
      .then(response => {
        let mapconfig = this.state.mapconfig;
        mapconfig.series = response.data;
        this.setState({ loadedSeries: true, mapconfig: mapconfig })
        console.log("got response map ", this.mapconfig.series)
      })
  }

  loadingMap() {
    if (this.state.loadedSeries)
      return (<ReactHighmaps config={this.state.mapconfig} />);
    else
      return (<div className="row col-md-12 alert alert-info" style={{ 'margin-left': '10px' }}><b>loading map data... <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></b></div>);
  }


  render() {
    return (
      <div>
        <i className="fa fa-globe"></i>&#160;Impressions for each country
          <div className="row">
          <div className="col-md-12">

            {this.loadingMap()}

          </div>
        </div>
      </div>
    );
  }
}
export default MapChart