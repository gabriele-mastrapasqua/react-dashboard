import React from 'react';
import axios from 'axios'
import config from './config.js';

class DeviceImpressionsTable extends React.Component {
  page = 1;

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      impressionPerDevices: []
    };

    // events binding
    this.onNextClick = this.onNextClick.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    console.log("call getImpressions ");
    axios.get(config.API_URL + 'getImpressions/' + this.page)
      .then(response => {
        console.log(response)
        this.setState({ impressionPerDevices: response.data.impressionPerDevices })
      })
  }

  onPreviousClick(event) {
    if (this.state.page > 0) {
      this.page = this.page - 1;
      this.setState({page: this.page});
      console.log("prev click", this.state.page)
      this.loadData()
    }
  }

  onNextClick(event) {
    if (this.state.impressionPerDevices && this.state.impressionPerDevices.length > 0) {
      this.page = this.state.page + 1;
      this.setState({page: this.page});
      console.log("next click", this.state.page)
      this.loadData()
    }
  }

  render() {
    return (
      <div>
        <h6>
          <i class="fa fa-mobile"></i>&#160;
          Impressions for each device</h6>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Device id</th>
              <th scope="col">Impressions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.impressionPerDevices.map((n, index) => {
              return (
                <tr key={n._id} index={index}>
                  <td>{n._id}</td>
                  <td>{n.count}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot style={{'border-top': '1px solid #eee', }}>
            <nav aria-label="Page navigation example" style={{'margin-top': '10px'}}>
              <ul className="pagination justify-content-end" >
                <li className="page-item" className={'page-item ' + (this.state.page == 1 ? 'disabled' : '')}><a className="page-link" onClick={this.onPreviousClick} >Previous</a></li>
                <li className="page-item"><a className="page-link" onClick={this.onNextClick}>Next</a></li>
                <li className="page-item" style={{'margin-top': '8px', 'margin-left': '10px'}}>
                  Page {this.state.page} of {this.props.totalImpressions/this.state.perPage} pages
                </li>
              </ul>

            </nav>

          </tfoot>
        </table>


      </div>
    );
  }
}


export default DeviceImpressionsTable;