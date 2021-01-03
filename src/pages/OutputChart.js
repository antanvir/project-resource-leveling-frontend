import React from 'react';
import { Redirect } from 'react-router-dom';
import httpService from '../services/http.service';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const { Chart } = require("react-google-charts");

class OutputChart extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      
      reselectFile: false

    });

    this.handleFileReselection = this.handleFileReselection.bind(this);
    this.handleReselectBtn = this.handleReselectBtn.bind(this);
  }

  handleFileReselection(){
    if (this.state.reselectFile === true) return <Redirect to='/input' /> 
  }

  handleReselectBtn(){
    this.setState({

      reselectFile: true
    });
  }

  render() {
    return(
      <Container fluid>
        {this.handleFileReselection()}
        <Row className="justify-content-center" style={{ marginTop: 50 }}>
          <Card bg="info" text="white">
  
              <Card.Header className="text-center" bg="info">
                <Row>
                  <Col md={{ span: 7, offset: 1 }}><h3>Welcome to Chart of Resource Estimation</h3></Col>
                  <Col md={{ span: 2, offset: 2 }}> <Button onClick={() => this.handleReselectBtn()}>Select File</Button> </Col>
                </Row>
              </Card.Header>
              
              <Card.Body style={{ margin: 20 }}>
              <Row className="justify-content-md-center">
                <Col md={{ span: 2 }}> <Button onClick={() => this.handleReselectBtn()}>Estimated</Button> </Col>
                <Col md={{ span: 2 }}> <Button onClick={() => this.handleReselectBtn()}>Burgess 1</Button> </Col>
                <Col md={{ span: 2 }}> <Button onClick={() => this.handleReselectBtn()}>Burgess 2</Button> </Col>
              </Row>
              <Chart
                width={'1000px'}
                height={'450px'}
                chartType="Gantt"
                loader={<div>Expected Chart</div>}
                style = {{marginTop: 20}}
                
                data={[
                  [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Resource' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                    { type: 'number', label: 'Slack'} ,
                  ],
                  [
                    '2014Spring',
                    'Spring 2014',
                    'spring',
                    new Date(2014, 2, 22),
                    new Date(2014, 5, 20),
                    null,
                    100,
                    null,
                    10,
                  ],
                  [
                    '2014Summer',
                    'Summer 2014',
                    'summer',
                    new Date(2014, 5, 21),
                    new Date(2014, 8, 20),
                    null,
                    100,
                    null,
                    0,
                  ],
                  [
                    '2014Autumn',
                    'Autumn 2014',
                    'autumn',
                    new Date(2014, 8, 21),
                    new Date(2014, 11, 20),
                    null,
                    100,
                    null,
                    0,
                  ],
                  [
                    '2014Winter',
                    'Winter 2014',
                    'winter',
                    new Date(2014, 11, 21),
                    new Date(2015, 2, 21),
                    null,
                    100,
                    null,
                    0,
                  ],
                  [
                    '2015Spring',
                    'Spring 2015',
                    'spring',
                    new Date(2015, 2, 22),
                    new Date(2015, 5, 20),
                    null,
                    50,
                    null,
                    0,
                  ],
                  [
                    '2015Summer',
                    'Summer 2015',
                    'summer',
                    new Date(2015, 5, 21),
                    new Date(2015, 8, 20),
                    null,
                    0,
                    null,
                    0,
                  ],
                  [
                    '2015Autumn',
                    'Autumn 2015',
                    'autumn',
                    new Date(2015, 8, 21),
                    new Date(2015, 11, 20),
                    null,
                    0,
                    null,
                    0,
                  ],
                  [
                    '2015Winter',
                    'Winter 2015',
                    'winter',
                    new Date(2015, 11, 21),
                    new Date(2016, 2, 21),
                    null,
                    0,
                    null,
                    0,
                  ],
                  [
                    'Football',
                    'Football Season',
                    'sports',
                    new Date(2014, 8, 4),
                    new Date(2015, 1, 1),
                    null,
                    100,
                    null,
                    0,
                  ]
                ]}
                options={{
                  height: 450,
                  gantt: {
                    trackHeight: 40,
                  },
                }}
                rootProps={{ 'data-testid': '2' }}
              />
              </Card.Body>
          </Card>
      </Row>
  </Container>
            
    );
  }

}
export default OutputChart;


{/* <Chart
    width={'100%'}
    height={'400px'}
    chartType="Gantt"
    loader={<div>Expected Chart</div>}
    
    data={[
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
        { type: 'number', label: 'Slack'} ,
      ],
      [
        '2014Spring',
        'Spring 2014',
        'spring',
        new Date(2014, 2, 22),
        new Date(2014, 5, 20),
        null,
        100,
        null,
        10,
      ],
      [
        '2014Summer',
        'Summer 2014',
        'summer',
        new Date(2014, 5, 21),
        new Date(2014, 8, 20),
        null,
        100,
        null,
        0,
      ],
      [
        '2014Autumn',
        'Autumn 2014',
        'autumn',
        new Date(2014, 8, 21),
        new Date(2014, 11, 20),
        null,
        100,
        null,
        0,
      ],
      [
        '2014Winter',
        'Winter 2014',
        'winter',
        new Date(2014, 11, 21),
        new Date(2015, 2, 21),
        null,
        100,
        null,
        0,
      ],
      [
        '2015Spring',
        'Spring 2015',
        'spring',
        new Date(2015, 2, 22),
        new Date(2015, 5, 20),
        null,
        50,
        null,
        0,
      ],
      [
        '2015Summer',
        'Summer 2015',
        'summer',
        new Date(2015, 5, 21),
        new Date(2015, 8, 20),
        null,
        0,
        null,
        0,
      ],
      [
        '2015Autumn',
        'Autumn 2015',
        'autumn',
        new Date(2015, 8, 21),
        new Date(2015, 11, 20),
        null,
        0,
        null,
        0,
      ],
      [
        '2015Winter',
        'Winter 2015',
        'winter',
        new Date(2015, 11, 21),
        new Date(2016, 2, 21),
        null,
        0,
        null,
        0,
      ],
      [
        'Football',
        'Football Season',
        'sports',
        new Date(2014, 8, 4),
        new Date(2015, 1, 1),
        null,
        100,
        null,
        0,
      ]
    ]}
    options={{
      height: 400,
      gantt: {
        trackHeight: 30,
      },
    }}
    rootProps={{ 'data-testid': '2' }}
  /> */}
