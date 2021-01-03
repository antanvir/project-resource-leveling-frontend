import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Redirect } from 'react-router-dom';
import httpService from '../services/http.service';

class UserInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToChart: false
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRedirectToChart = this.handleRedirectToChart.bind(this);
        this.handleSuccessInputSubmission = this.handleSuccessInputSubmission.bind(this);
        
        this.fileInput = React.createRef();
    }

    handleRedirectToChart() {
        if (this.state.redirectToChart === true) return <Redirect to='/chart' />
      }
    
    handleSuccessInputSubmission() {
        this.setState ({
            redirectToChart: true
        });
      }


    handleFormSubmit(event){
        event.preventDefault();
        
        let globalThis = this;
        let inputFileName = this.fileInput.current.files[0]? this.fileInput.current.files[0].name: undefined;
        console.log({'filename': inputFileName});

        httpService('http://localhost:8000/input', 'post', this.fileInput.current.files[0])
        .then(function (response) {
            console.log({'response': response.data});
            globalThis.handleSuccessInputSubmission();
        })
        .catch(function (error) {
            console.log(error);
            globalThis.handleSuccessInputSubmission();
            // alert('Can not process the input right now!');
        });
            
    }


    render() {
        return(
            <Container fluid>
                {this.handleRedirectToChart()}
                <Row className="justify-content-center" style={{ marginTop: 50 }}>
                    <Card bg="info" text="white">
            
                        <Card.Header className="text-center">
                            <h3>Welcome to Resource Estimation</h3>
                        </Card.Header>
                        
                        <Card.Body>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group as={Row}>
                                    <Form.Label column md={4}> Choose Input File </Form.Label>
                                    <Col md={8}>
                                        <input type="file" name='fileInput' ref={this.fileInput} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalSubmit">
                                    <Form.Label column md={4}> Continue </Form.Label>
                                    <Col md={8}>
                                        <Button variant="secondary" type="submit">Upload File</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}

export default UserInput;