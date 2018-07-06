import React, { Component } from 'react'
import './App.css'
import worlddata from './world'
//import worlddata from './map'
import { geoMercator, geoPath } from 'd3-geo'


class WorldMap extends Component {
      constructor(props){
            super(props)
            
      }
      
   render() {
      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection)
      const countries = worlddata.features
         .map((d,i) => <path
         key={'path' + i}
         d={pathGenerator(d)}
         className='countries'
         />)
   return <svg width={this.props.w} height={this.props.h}>
   {countries}
   </svg>
   }
}
export default WorldMap