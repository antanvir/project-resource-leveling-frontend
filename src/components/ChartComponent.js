import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { post } from 'axios';
import GoogleChart from '../google-chart/GoogleChart';

// const jsonResponse = {"estimated": {"node_matrix": [{"id": 7, "name": "G", "predecessor": ["E", "F"], "duration": "1", "resource": "6", "descendant": [], "slack": 0, "critical": true, "ES": 19, "LS": 19, "EF": 20, "LF": 20, "OS": 19, "OF": 20, "FP": true, "BP": true}, {"id": 1, "name": "A", "predecessor": ["-"], "duration": "3", "resource": "6", "descendant": ["B"], "slack": 0, "critical": true, "ES": 0, "LS": 0, "EF": 3, "LF": 3, "OS": 0, "OF": 3, "FP": true, "BP": true}, {"id": 2, "name": "B", "predecessor": ["A"], "duration": "2", "resource": "1", "descendant": ["C", "D"], "slack": 0, "critical": true, "ES": 3, "LS": 3, "EF": 5, "LF": 5, "OS": 3, "OF": 5, "FP": true, "BP": true}, {"id": 3, "name": "C", "predecessor": ["B"], "duration": "5", "resource": "5", "descendant": ["E", "F"], "slack": 0, "critical": true, "ES": 5, "LS": 5, "EF": 10, "LF": 10, "OS": 5, "OF": 10, "FP": true, "BP": true}, {"id": 4, "name": "D", "predecessor": ["B"], "duration": "4", "resource": "2", "descendant": ["F"], "slack": 8, "critical": false, "ES": 5, "LS": 13, "EF": 9, "LF": 17, "OS": 10, "OF": 14, "FP": true, "BP": true}, {"id": 5, "name": "E", "predecessor": ["C"], "duration": "9", "resource": "4", "descendant": ["G"], "slack": 0, "critical": true, "ES": 10, "LS": 10, "EF": 19, "LF": 19, "OS": 10, "OF": 19, "FP": true, "BP": true}, {"id": 6, "name": "F", "predecessor": ["C", "D"], "duration": "2", "resource": "4", "descendant": ["G"], "slack": 7, "critical": false, "ES": 10, "LS": 17, "EF": 12, "LF": 19, "OS": 14, "OF": 16, "FP": true, "BP": true}], "R_by_time": [0, 6, 6, 6, 1, 1, 5, 5, 5, 5, 5, 6, 6, 6, 6, 8, 8, 4, 4, 4, 6], "R2_by_time": [0, 36, 36, 36, 1, 1, 25, 25, 25, 25, 25, 36, 36, 36, 36, 64, 64, 16, 16, 16, 36], "optimal_total_R": 103, "optimal_total_R_square": 591}}

class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            selectedChart: 0,
            ganttChartData: [],
            selectedFile: null,
            showGanttChart: false
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.uploadSelectedFile = this.uploadSelectedFile.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.processResponseData = this.processResponseData.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);

        this.showRValues = this.showRValues.bind(this);
        this.showOptimalRValues = this.showOptimalRValues.bind(this);
        this.changeChartOption = this.changeChartOption.bind(this);

        this.showChartOptions = this.showChartOptions.bind(this);
       }

    processResponseData(data){

        let estimatedData = data;
        let estimatedR = estimatedData.R_by_time;
        let estimatedRSquare = estimatedData.R2_by_time;
        let estimatedOptimalR = estimatedData.optimal_total_R;
        let estimatedOptimalRSq = estimatedData.optimal_total_R_square;

        let formattedEstimatedDataForGanttChart = {'es': [], 'os':[], 'of': []};

        // eslint-disable-next-line
        estimatedData.node_matrix.map((data, index) => {
            let nodeES = [parseInt(data.ES), data.name, '', '#33cccc', parseInt(data.ES)*1000, parseInt(data.OS)*1000];
            let nodeOS = [parseInt(data.ES), data.name, '', '#29a3a3', parseInt(data.OS)*1000, parseInt(data.OF)*1000];
            let nodeOF = [parseInt(data.ES), data.name, '', '#33cccc', parseInt(data.OF)*1000, parseInt(data.LF)*1000];
            
            if(parseInt(data.OS) - parseInt(data.ES) !== 0) formattedEstimatedDataForGanttChart.es.push(nodeES);
            formattedEstimatedDataForGanttChart.os.push(nodeOS);
            if(parseInt(data.LF) - parseInt(data.OF) !== 0) formattedEstimatedDataForGanttChart.of.push(nodeOF);
        });

        estimatedR.shift();
        estimatedRSquare.shift();

        formattedEstimatedDataForGanttChart.es.sort((a, b) => (a[0] > b[0]) ? 1: -1);
        formattedEstimatedDataForGanttChart.es.forEach(node => node.shift());

        formattedEstimatedDataForGanttChart.os.sort((a, b) => (a[0] > b[0]) ? 1: -1);
        formattedEstimatedDataForGanttChart.os.forEach(node => node.shift());

        formattedEstimatedDataForGanttChart.of.sort((a, b) => (a[0] > b[0]) ? 1: -1);
        formattedEstimatedDataForGanttChart.of.forEach(node => node.shift());
        
        let algoData = {'graph': formattedEstimatedDataForGanttChart, 'r': estimatedR, 'rSq': estimatedRSquare, 'optimalR': estimatedOptimalR, 'optimalRSq': estimatedOptimalRSq}
        return algoData;
    }

    handleSuccessfulResponse(data) {

        let estimated = this.processResponseData(data.estimated);
        let burgess1 = this.processResponseData(data.burgess1);
        let burgess2 = this.processResponseData(data.burgess2);

        this.setState({
            selectedChart: 0,
            showGanttChart: true,
            ganttChartData : [estimated, burgess1, burgess2]
        });
    
        console.log({'value log': this.state.ganttChartData[this.state.selectedChart] });
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
        const url = 'https:resource-smoothing-app.herokuapp.com/postDataset/';
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
        this.setState({selectedChart: chartID});
        this.forceUpdate();
    }

    createTableDataColumn(list){
        return list.map((data, index) => <td key={index}>{data}</td>);
    }

    showOptimalRValues(){
        return(
            <Table className='text-center'>
            <tbody>
            <tr> 
                <td><b>Optimal Total R: </b> {this.state.ganttChartData[this.state.selectedChart].optimalR}</td>
            </tr>
            <tr>
                <td><b>Optimal Total R<sup>2</sup> </b>: {this.state.ganttChartData[this.state.selectedChart].optimalRSq}</td>
            </tr>
            </tbody>
            </Table>
            
        );
    }

    showRValues(){
        return(
            <div>
                <Table bordered>
                <tbody>
                <tr> 
                    <td><b>R</b></td>
                    {this.createTableDataColumn(this.state.ganttChartData[this.state.selectedChart].r)}</tr>
                <tr>
                    <td><b>R<sup>2</sup></b></td> 
                    {this.createTableDataColumn(this.state.ganttChartData[this.state.selectedChart].rSq)}</tr>
                </tbody>
                </Table>
            </div>
        );
    }

    showChartOptions(){
        return (
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
        );
    }

    render() {
        return (
            <Container style={{marginTop: 50}}>
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
                {this.state.showGanttChart && this.showChartOptions()}
                {this.state.showGanttChart && this.state.selectedChart === 0 && <GoogleChart key={0} graph_id="estimated" chartID = {0} chartData = {this.state.ganttChartData } />}
                {this.state.showGanttChart && this.state.selectedChart === 1 && <GoogleChart key={1} graph_id="burgess 1" chartID = {1} chartData = {this.state.ganttChartData } />}
                {this.state.showGanttChart && this.state.selectedChart === 2 && <GoogleChart key={2} graph_id="burgess 2" chartID = {2} chartData = {this.state.ganttChartData } />}
                
                {this.state.showGanttChart && this.showOptimalRValues()}
                {this.state.showGanttChart && this.showRValues()}
                
            </Container>
        );
    }
}

export default ChartComponent;

 
            