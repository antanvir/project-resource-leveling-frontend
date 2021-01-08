import React from 'react';
const { Chart } = require("react-google-charts");

export default class OutputChart extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      key : this.props.key,
      chartData : this.props.chartData
    }

  }

  componentDidMount(){
    this.forceUpdate();
  }
  
  render() {
    
    console.log({'Google chart matrix': this.state.chartData});

    let dataES = this.state.chartData.es;
    let dataOS = this.state.chartData.os;
    let dataOF = this.state.chartData.of;
    

    return (

      <Chart
        key = {this.state.key}
        height={'52vh'}
        chartType="Timeline"
        loader={<div>Loading Gantt Chart</div>}
        data={[
          [
            { type: 'string', id: 'Activity' },
            { type: 'string', id: 'Dummy'},
            { type: 'string', id: 'style', role: 'style' },
            { type: 'number', id: 'Start' },
            { type: 'number', id: 'End' }
          ],
          ...dataOS,
          ...dataOF,
          ...dataES

        ]}
        options={{
          showRowNumber: true,
          avoidOverlappingGridLines: false
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
}