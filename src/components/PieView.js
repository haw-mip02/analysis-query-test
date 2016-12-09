import { default as React, PropTypes } from 'react'

import { Chart } from 'react-google-charts'

const colors = ['#f5778a', '#ffa05f', '#7d91b4', '#a37fda', '#3da5f1', '#7fc344', '#e7b730'];

const PieView = ({clusters, popularWords, onPieSelection }) => {
    if (clusters === null || clusters.length <= 0) return null
    let dataTable = [['Word', 'Mentions']]
    dataTable = dataTable.concat(popularWords.map(word => [word[0], word[1]]))
    
    let chartEvents=[{
            eventName : 'select',
            callback  : function(Chart) {
                if(Chart.chart.getSelection().length > 0){
                    let index = Chart.chart.getSelection()[0].row
                    Chart.chart.setSelection([])
                    onPieSelection(index)
                }
            }
        }];
        
    return (
        <Chart
          chartType='PieChart'
          options={{
              legend: 'none',
              pieSliceText: 'label',
              colors: colors,
              chartArea: {width: '80%', height: '80%'}
          }}
          width='100%'
          data={dataTable.slice(0, colors.length + 1)}
          chartEvents={chartEvents}
        />
    )
}


PieView.propTypes = {
    clusters: PropTypes.array,
    popularWords: PropTypes.array,
}

export default PieView
