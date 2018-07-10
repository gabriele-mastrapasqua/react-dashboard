import React from 'react';
import axios from 'axios'
import config from './config.js';

class DeviceImpressionsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      impressionPerDevices: []
    };
  }

  componentDidMount () {
    console.log("call getImpressions ");
    axios.get(config.API_URL + 'getImpressions')
      .then(response => {
        console.log(response)
        this.setState({ impressionPerDevices: response.data.impressionPerDevices })
      })
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Device id</th>
            <th scope="col">Impressions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.impressionPerDevices
            .map(n => {
              return (
                <tr>
                  <td>{n._id}</td>
                  <td>{n.count}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}


export default DeviceImpressionsTable;