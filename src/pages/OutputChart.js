import React from 'react';
import { Redirect } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Gantt from "../Gantt/Gantt";

const json_data = '{"estimated": {"node_matrix": [{"id": 7, "name": "G", "predecessor": ["E", "F"], "duration": "1", "resource": "6", "descendant": [], "slack": 0, "critical": true, "ES": 19, "LS": 19, "EF": 20, "LF": 20, "OS": 19, "OF": 20, "FP": true, "BP": true}, {"id": 1, "name": "A", "predecessor": ["-"], "duration": "3", "resource": "6", "descendant": ["B"], "slack": 0, "critical": true, "ES": 0, "LS": 0, "EF": 3, "LF": 3, "OS": 0, "OF": 3, "FP": true, "BP": true}, {"id": 2, "name": "B", "predecessor": ["A"], "duration": "2", "resource": "1", "descendant": ["C", "D"], "slack": 0, "critical": true, "ES": 3, "LS": 3, "EF": 5, "LF": 5, "OS": 3, "OF": 5, "FP": true, "BP": true}, {"id": 3, "name": "C", "predecessor": ["B"], "duration": "5", "resource": "5", "descendant": ["E", "F"], "slack": 0, "critical": true, "ES": 5, "LS": 5, "EF": 10, "LF": 10, "OS": 5, "OF": 10, "FP": true, "BP": true}, {"id": 4, "name": "D", "predecessor": ["B"], "duration": "4", "resource": "2", "descendant": ["F"], "slack": 8, "critical": false, "ES": 5, "LS": 13, "EF": 9, "LF": 17, "OS": 10, "OF": 14, "FP": true, "BP": true}, {"id": 5, "name": "E", "predecessor": ["C"], "duration": "9", "resource": "4", "descendant": ["G"], "slack": 0, "critical": true, "ES": 10, "LS": 10, "EF": 19, "LF": 19, "OS": 10, "OF": 19, "FP": true, "BP": true}, {"id": 6, "name": "F", "predecessor": ["C", "D"], "duration": "2", "resource": "4", "descendant": ["G"], "slack": 7, "critical": false, "ES": 10, "LS": 17, "EF": 12, "LF": 19, "OS": 14, "OF": 16, "FP": true, "BP": true}], "R_by_time": [0, 6, 6, 6, 1, 1, 5, 5, 5, 5, 5, 6, 6, 6, 6, 8, 8, 4, 4, 4, 6], "R2_by_time": [0, 36, 36, 36, 1, 1, 25, 25, 25, 25, 25, 36, 36, 36, 36, 64, 64, 16, 16, 16, 36], "optimal_total_R": 103, "optimal_total_R_square": 591}}'
const json_obj = JSON.parse(json_data);


const data = {
  data: [
  ],
  links: [
  ]
};


class OutputChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      chartData: {},
      reselectInputFile: false
    });

    this.handleFileReselection = this.handleFileReselection.bind(this);
    this.handleReselectBtn = this.handleReselectBtn.bind(this);

     }

  componentDidMount(){
    let estimatedData = json_obj.estimated;
    let estimatedRSquare = estimatedData.R2_by_time;
    let estimatedR = estimatedData.R_by_time;

    let formattedEstimatedDataForGanttChart = {data: [], links: []};
    estimatedData.node_matrix.map((data, index) => {
      
      let node = {};
      node['id'] = data.id;
      node['text'] = data.name;
      node['start_date'] = String(data.OS);
      node['duration'] = parseInt(data.duration);
      node['progress'] = 0.5;
      
      formattedEstimatedDataForGanttChart.data.push(node);
    });

    formattedEstimatedDataForGanttChart.data.sort((a, b) => (a.id > b.id) ? 1: -1);
    this.setState({
      estimatedChartData : formattedEstimatedDataForGanttChart

    });

    console.log({'49': formattedEstimatedDataForGanttChart});
  }

  

  handleFileReselection() {
    if (this.state.reselectInputFile === true) return <Redirect to='/input' />
  }

  handleReselectBtn() {
    this.setState({
      reselectInputFile: true
    
    });
  }

  render() {
    return (
      <Container fluid>
        {console.log({'json_obj': json_obj})}
        {this.handleFileReselection()}
        <Card bg="info" text="white">

          <Card.Header className="text-center" bg="info">
            <Row>
              <Col md={{ span: 7, offset: 1 }}><h3>Welcome to Chart of Resource Estimation</h3></Col>
              <Col md={{ span: 2, offset: 2 }}> <Button onClick={() => this.handleReselectBtn()}>Select File</Button> </Col>
            </Row>
          </Card.Header>

          <Card.Body style={{ margin: 20 }}>
            <Row className="justify-content-md-center" style={{ marginBottom: 20 }}>
              <Col md={{ span: 2 }}> <Button onClick={() => this.handleEstimatedChartBtn()}>Estimated</Button> </Col>
              <Col md={{ span: 2 }}> <Button onClick={() => this.handleBurgessOneChartBtn()}>Burgess 1</Button> </Col>
              <Col md={{ span: 2 }}> <Button onClick={() => this.handleBurgessTwoChartBtn()}>Burgess 2</Button> </Col>
            </Row>
            <Gantt tasks={this.state.estimatedChartData} />
          </Card.Body>
        </Card>
      </Container>
    );
  }

}

export default OutputChart;