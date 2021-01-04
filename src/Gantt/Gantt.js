import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
 
export default class Gantt extends Component {
    
    componentDidMount() {    
        const { tasks } = this.props;
        
        var next = new Date(0);
        console.log({'next': next});



        gantt.config.scales = [
            {unit: "day", step: 1, format: "%d"}
            
        ];

        gantt.config.columns = [
            {name:"text",       label:"Activity", align:"center"},
            {name:"descendants",label:"Descendants(s)", align:"center"},
            {name:"duration",   label:"Duration", align:"center"},
            {name:"resource",   label:"Resource", align:"center"}
        ];

        gantt.config.layout = {
            css: "gantt_container",
            cols: [
             {
               width:400,
               min_width: 300,
           
               // adding horizontal scrollbar to the grid via the scrollX attribute
               rows:[
                {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"}, 
                {view: "scrollbar", id: "gridScroll"}  
               ]
             },
             {resizer: true, width: 1},
             {
               rows:[
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollHor"}
               ]
             },
             {view: "scrollbar", id: "scrollVer"}
            ]
          };
          
        // gantt.config.autosize = 'x';
        
        // gantt.config.start_date.config.scales = [
        //     {unit: "day", step: 1, format: "%d"}
        // ];

        // gantt.config.start_date = new Date(1900, 1, 1);
        
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);
    }

    render() {
       return (
           <div
                ref={ (input) => { this.ganttContainer = input } }
                style={ { width: '100%', height: '100%' } }
            ></div>
       );
    }
}

