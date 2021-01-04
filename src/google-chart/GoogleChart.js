import React from 'react';
const { Chart } = require("react-google-charts");

export default class OutputChart extends React.Component{
    render(){
        return(
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
        );
    }
}