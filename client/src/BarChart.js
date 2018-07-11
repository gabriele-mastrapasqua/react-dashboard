import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import config from './config.js';
import moment from 'moment'

const ReactHighcharts = require('react-highcharts/ReactHighcharts');

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: "2018-05-01",
      chartConfig: {
        title: {text: ""},
        xAxis: {
          categories: []
        },
        series: [{
          data: []
        }]
      },
    }
    // events binding
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentDidMount() {
    console.log("bar chart componentDidMount");
    this.callApi()
  }
  
  componentDidUpdate(prevProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (prevProps.type !== this.props.type) {
      console.log("changed props ", prevProps.type)
      this.callApi()
    }
  }

  callApi() {
    console.log("call api", this.props.type);
    let url = 'getImpressions24Hours/';
    if (this.props.type === "w") {
      url = 'getImpressionsWeek/';
    } else if (this.props.type === "m") {
      url = 'getImpressionsMonth/';
    }

    // url
    axios.get(config.API_URL + url + moment(this.state.date).format("YYYY-MM-DD"))
      .then(response => {
        console.log("load bar chart ",response.data)
        let categories = response.data.categories;
        let data = response.data.data;
        this.setState({
            chartConfig: {
              title: {text: ""},
              xAxis: {
                categories: categories
              },
              series: [{
                data: data
              }]
            }
          })
      })
  }

  onChangeDate(event) {
    console.log("change date:", event.target.value)
    this.setState({ date: event.target.value })
    this.callApi()
  }

  render() {
    return (
      <div>
        <div className="form-group text-left">
          <label for="date">From Date</label>
          <input type="date" id="date" value={this.state.date} className="form-control" onChange={this.onChangeDate} />
        </div>
        

        <ReactHighcharts config={this.state.chartConfig} />
      </div>
    );
  }
}
export default BarChart