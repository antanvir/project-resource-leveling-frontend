import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

export default class Gantt extends Component {

  componentDidMount() {
    const { tasks } = this.props;

    gantt.config.columns = [
      { name: "text", label: "Activity", align: "center" },
      { name: "descendants", label: "Descendants(s)", align: "center" },
      { name: "duration", label: "Duration", align: "center" },
      { name: "resource", label: "Resource", align: "center" }
    ];
    
    gantt.config.scales = [
      { unit: "day", step: 1, format: "%d" }
    ];











    
    gantt.config.autosize = 'y';
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  render() {
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}

