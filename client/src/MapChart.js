import React, { Component } from 'react'
import './App.css'


const ReactHighmaps = require('react-highcharts/ReactHighmaps');
import maps from './map';

const mapconfig = {
  chart: {
    spacingBottom: 20
  },
  title: {
    text: 'Impressions for each country'
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



class MapChart extends Component {
   constructor(props){
      super(props)
   }
      
   render() {
     return (
      <ReactHighmaps config={mapconfig} />
     );
   }
}
export default MapChart