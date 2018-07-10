import React from 'react';

class DeviceImpressionsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Device id</th>
            <th scope="col">Impressions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data
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