import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import config from './config.js';


const ReactHighmaps = require('react-highcharts/ReactHighmaps');
import maps from './map';


class MapChart extends Component {

  mapconfig = {
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
    series:  []
     // [{"name":"Alabama","data":[{"count":19,"code":"Alabama"}]},{"name":"California","data":[{"count":53,"code":"California"}]},{"name":"Delaware","data":[{"count":0,"code":"Delaware"}]},{"name":"Idaho","data":[{"count":36,"code":"Idaho"}]},{"name":"Kentucky","data":[{"count":17,"code":"Kentucky"}]},{"name":"Michigan","data":[{"count":42,"code":"Michigan"}]},{"name":"Nebraska","data":[{"count":33,"code":"Nebraska"}]},{"name":"New York","data":[{"count":19,"code":"New York"}]},{"name":"Oregon","data":[{"count":35,"code":"Oregon"}]},{"name":"Tennessee","data":[{"count":11,"code":"Tennessee"}]},{"name":"Washington","data":[{"count":25,"code":"Washington"}]},{"name":"Mississippi","data":[{"count":0,"code":"Mississippi"}]},{"name":"Rhode Island","data":[{"count":0,"code":"Rhode Island"}]},{"name":"Florida","data":[{"count":22,"code":"Florida"}]},{"name":"Indiana","data":[{"count":12,"code":"Indiana"}]},{"name":"Maine","data":[{"count":12,"code":"Maine"}]},{"name":"New Hampshire","data":[{"count":1,"code":"New Hampshire"}]},{"name":"North Dakota","data":[{"count":38,"code":"North Dakota"}]},{"name":"Utah","data":[{"count":26,"code":"Utah"}]},{"name":"Wisconsin","data":[{"count":29,"code":"Wisconsin"}]},{"name":"District of Columbia","data":[{"count":0,"code":"District of Columbia"}]},{"name":"Arizona","data":[{"count":50,"code":"Arizona"}]},{"name":"Arkansas","data":[{"count":30,"code":"Arkansas"}]},{"name":"Illinois","data":[{"count":15,"code":"Illinois"}]},{"name":"Louisiana","data":[{"count":31,"code":"Louisiana"}]},{"name":"Minnesota","data":[{"count":39,"code":"Minnesota"}]},{"name":"Nevada","data":[{"count":43,"code":"Nevada"}]},{"name":"North Carolina","data":[{"count":17,"code":"North Carolina"}]},{"name":"Pennsylvania","data":[{"count":19,"code":"Pennsylvania"}]},{"name":"Texas","data":[{"count":98,"code":"Texas"}]},{"name":"West Virginia","data":[{"count":7,"code":"West Virginia"}]},{"name":"Hawaii","data":[{"count":0,"code":"Hawaii"}]},{"name":"Connecticut","data":[{"count":2,"code":"Connecticut"}]},{"name":"Kansas","data":[{"count":35,"code":"Kansas"}]},{"name":"Massachusetts","data":[{"count":1,"code":"Massachusetts"}]},{"name":"Montana","data":[{"count":70,"code":"Montana"}]},{"name":"New Mexico","data":[{"count":49,"code":"New Mexico"}]},{"name":"Oklahoma","data":[{"count":32,"code":"Oklahoma"}]},{"name":"South Dakota","data":[{"count":30,"code":"South Dakota"}]},{"name":"Virginia","data":[{"count":12,"code":"Virginia"}]},{"name":"Colorado","data":[{"count":49,"code":"Colorado"}]},{"name":"Georgia","data":[{"count":19,"code":"Georgia"}]},{"name":"Iowa","data":[{"count":14,"code":"Iowa"}]},{"name":"Maryland","data":[{"count":1,"code":"Maryland"}]},{"name":"Missouri","data":[{"count":35,"code":"Missouri"}]},{"name":"New Jersey","data":[{"count":5,"code":"New Jersey"}]},{"name":"Ohio","data":[{"count":23,"code":"Ohio"}]},{"name":"South Carolina","data":[{"count":12,"code":"South Carolina"}]},{"name":"Vermont","data":[{"count":6,"code":"Vermont"}]},{"name":"Wyoming","data":[{"count":35,"code":"Wyoming"}]},{"name":"Alaska","data":[{"count":387,"code":"Alaska"}]}]

  };


  constructor(props) {
    super(props)
    this.state = {
      states: null,
      series: null,
    }
  }


  componentDidMount() {
    this.loadData()
  }

  loadData() {
    console.log("call getTotalImpressionsEachState ");
    axios.get(config.API_URL + 'getTotalImpressionsEachState/')
      .then(response => {
        this.mapconfig.series = response.data;  
        this.setState({loadedSeries: true})        
      })
  }

  loadingMap() {
    if (this.state.loadedSeries)
      return (<ReactHighmaps config={this.mapconfig} />);
    else
      return (<div className="row col-md-12 alert alert-info" style={{'margin-left': '10px'}}><b>loading map data... <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></b></div>);
  }


  render() {
    return (
      <div>
        <i class="fa fa-globe"></i>&#160;Impressions for each country
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