import './Gantt.css';
import moment from 'moment';
import { gantt } from 'dhtmlx-gantt';
import React, { Component } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {

  componentDidMount() {
    const { tasks } = this.props;

    console.log({'tasks': tasks});
    gantt.config.columns = [
      { name: "text", label: "Activity", align: "center" },
      { name: "descendants", label: "Descendants(s)", align: "center" },
      { name: "duration", label: "Duration", align: "center" },
      { name: "resource", label: "Resource", align: "center" }
    ];
    
    gantt.config.scales = [
      { unit: "day", step: 1, format: (date) =>{
          if(tasks.data.length == 0) return '';
          
          let currDate = date.toISOString().split('T')[0];
          let currDates = currDate.split('-');
          let finalCurrDate = currDates[2] +'-'+ currDates[1]+'-'+ currDates[0];

          const differenceInDates = moment(finalCurrDate).diff(moment(tasks.data[0].start_date), 'days');
          console.log({'current date': moment(finalCurrDate), 'start date': moment(tasks.data[0].start_date), 'diff': differenceInDates});
          
          return differenceInDates < 0 ? 'time' : ''+differenceInDates;
        }
      }
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

