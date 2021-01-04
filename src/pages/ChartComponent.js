import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Gantt from "../Gantt/Gantt";

import { Redirect } from 'react-router-dom';
import axios, { post } from 'axios'

import httpService from '../services/http.service';


const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};



class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            selectedChart: 0,
            ganttChartData: {},
            selectedFile: null,
            showGanttChart: false
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.uploadSelectedFile = this.uploadSelectedFile.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.processResponseData = this.processResponseData.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);

        this.changeChartOption = this.changeChartOption.bind(this);

       }

    processResponseData(data){

        let formattedEstimatedDataForGanttChart = {data: [], links: []};
        
        let estimatedData = data.estimated;
        let estimatedRSquare = estimatedData.R2_by_time;
        let estimatedR = estimatedData.R_by_time;

        estimatedData.node_matrix.map((data, index) => {

            let node = {};
            node['id'] = data.id;
            node['text'] = data.name;
            node['start_date'] = String(data.OS);
            node['duration'] = parseInt(data.duration);
            node['progress'] = 1.00;
            formattedEstimatedDataForGanttChart.data.push(node);
        });

        formattedEstimatedDataForGanttChart.data.sort((a, b) => (a.id > b.id) ? 1: -1);
        return formattedEstimatedDataForGanttChart;
    }

    handleSuccessfulResponse(data) {
        console.log({'response': data});
        const estimatedData = this.processResponseData(data);
        
        this.setState({
            showGanttChart: true,
            ganttChartData : estimatedData
        });

    }


    handleFormSubmit(event) {
        event.preventDefault();
        let outerScope = this;

        this.uploadSelectedFile(this.state.selectedFile)
            .then(function (response) {
                console.log({ 'response': response.data });
                outerScope.handleSuccessfulResponse(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert('Can not process the input right now!');
            });
    }

    uploadSelectedFile(selectedFile) {
        const formData = new FormData();
        const url = 'https:resource-smoothing-app.herokuapp.com/postDataset';
        const config = {headers: {'content-type': 'multipart/form-data' }}
        
        formData.append('file', selectedFile);
        return post(url, formData, config)
    }

    onFileChange(e) {
        
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    changeChartOption(chartID){
        this.setState({
            selectedChart: chartID
        });
    }



    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <Card bg="info">
                        <Card.Header className="text-center">
                            <h3>Welcome to Resource Estimation</h3>
                        </Card.Header>

                        <Card.Body>
                            <Form onSubmit={this.handleFormSubmit}>
                            <Row>
                            <Col md={{ span: 6, offset: 2 }}>
                                <label><b>Select Input File</b></label>
                                {' '}
                                <input type="file" onChange={this.onFileChange} />
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">Upload File</Button>
                            </Col>
                            </Row>
                            </Form>
                        
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{marginTop: 20, marginBottom: 20}}>
                    <Col md="auto">
                        <Button variant="secondary" onClick={() => this.changeChartOption(0)}>Estimated</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="warning" onClick={() => this.changeChartOption(1)}>Burgess 1</Button>                        
                    </Col>
                    <Col md="auto">
                        <Button variant="danger" onClick={() => this.changeChartOption(2)}>Burgess 2</Button> 
                    </Col>
                </Row>
                {this.state.showGanttChart && <Gantt tasks={this.state.ganttChartData} />}
                
            </Container>
        );
    }
}

export default ChartComponent;

 
            